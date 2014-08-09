/// <reference path="../_reference.ts" />
module WM.Event {
    export class Effect {
        static Happens(strs: Array<string>): boolean {
            
            for (var i = 0; i < strs.length; i++) {                              
                var result: boolean = false;
                var elems = strs[i].split(' ');
                if (elems[0] == "has") {
                    result = wm.player.Has(elems[1]);
                }
                else {//is a direct call like wm.player.health
                    elems[0] = elems[0].substr(1, elems[0].length - 1);//remove star
                    var call = elems[0].split('.');
                    var mod = elems[1];
                    var am = elems[2];
                    var target = wm[call[0]][call[1]];                         
                    switch (mod) {
                        case "true": result = target == true;break;
                        case "false": result = target == false;break;
                        case "=": result = am == target;break;
                        case ">": result = am < target;break;
                        case "<": result = am > target;break;
                    }
                }
                if (!result)
                    return false;
            }
            return true;
        }
        static Call(str:string): Function {
            var f: Function;
            if (!isNaN(parseFloat(str))) {
                f = function () { console.log("call:" + str);var event = <Event.Dialog>wm.targetCell.Event; event.ShowPanel(+str); }//activate next panel
            }
            else {
                var elems = str.split(' ');
                var call = elems[0];
                switch (call) {
                    case "add": f = function () { wm.player.AddItem(elems[1]) }; break;
                    case "lose": f = function () { wm.player.LoseItem(elems[1]) }; break;
                    //case "fight": f = function () { wm.Level.Fight(); }; break;
                }
                
                var mod = elems[1];
                var am = elems[2];
                if (call.indexOf("*")<0) {
                    //special function
                    f = function () { wm[call](am);  }                
                }
                else {
                    //
                    call = call.replace("*", "");
                    var elems = call.split('.');
                    var context = wm[elems[0]];                                  
                    f = function () {
                        switch (mod) {
                            case "+": context[elems[1]] += +am; break;
                            case "-": context[elems[1]] -= +am; break;
                            case "*": context[elems[1]] *= +am; break;
                            case "/": context[elems[1]] /= +am; break;
                            case "=": context[elems[1]] = +am; break;
                        }
                    };
                }
            }
            return f;
        }
    }
} 