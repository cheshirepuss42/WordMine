module WM.Dialog {
    export class Effect {
        static Happens(strs: Array<string>): boolean {
            
            for (var i = 0; i < strs.length; i++) {                              
                var result: boolean = false;
                var elems = strs[i].split(' ');
                if (elems[0] == "has") {
                    result = wm.Player.Has(elems[1]);
                }
                else {//is a direct call like wm.player.health
                    console.log("happens?", elems);
                    elems[0] = elems[0].substr(1, elems[0].length - 1);//remove star
                    var call = elems[0].split('.');
                    var mod = elems[1];
                    var am = elems[2];
                    var target = wm[call[0]][call[1]]; 
                    console.log(target,call[0],call[1]);                                
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
                f = function () { wm.Level.Dialog.ShowPanel(+str); }//activate next panel
            }
            else {
                var elems = str.split(' ');
                var call = elems[0];
                switch (call) {
                    case "add": f = function () { wm.Player.AddItem(elems[1]) }; break;
                    case "lose": f = function () { wm.Player.LoseItem(elems[1]) }; break;
                    case "fight": f = function () { wm.Level.Fight(); }; break;
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