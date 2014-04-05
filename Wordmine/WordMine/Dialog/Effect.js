var WM;
(function (WM) {
    (function (Dialog) {
        var Effect = (function () {
            function Effect() {
            }
            Effect.Happens = function (strs) {
                for (var i = 0; i < strs.length; i++) {
                    var result = false;
                    var elems = strs[i].split(' ');
                    if (elems[0] == "has") {
                        result = wm.Player.Has(elems[1]);
                    } else {
                        elems[0] = elems[0].substr(1, elems[0].length - 1);
                        var call = elems[0].split('.');
                        var mod = elems[1];
                        var am = elems[2];
                        var target = wm[call[0]][call[1]];
                        switch (mod) {
                            case "true":
                                result = target == true;
                                break;
                            case "false":
                                result = target == false;
                                break;
                            case "=":
                                result = am == target;
                                break;
                            case ">":
                                result = am < target;
                                break;
                            case "<":
                                result = am > target;
                                break;
                        }
                    }
                    if (!result)
                        return false;
                }
                return true;
            };
            Effect.Call = function (str) {
                var f;
                if (!isNaN(parseFloat(str))) {
                    f = function () {
                        wm.Level.Dialog.ShowPanel(+str);
                    };
                } else {
                    var elems = str.split(' ');
                    var call = elems[0];
                    switch (call) {
                        case "add":
                            f = function () {
                                wm.Player.AddItem(elems[1]);
                            };
                            break;
                        case "lose":
                            f = function () {
                                wm.Player.LoseItem(elems[1]);
                            };
                            break;
                    }

                    var mod = elems[1];
                    var am = elems[2];
                    if (call.indexOf("*") < 0) {
                        f = function () {
                            wm[call](am);
                        };
                    } else {
                        call = call.replace("*", "");
                        var elems = call.split('.');
                        var context = wm[elems[0]];
                        f = function () {
                            switch (mod) {
                                case "+":
                                    context[elems[1]] += +am;
                                    break;
                                case "-":
                                    context[elems[1]] -= +am;
                                    break;
                                case "*":
                                    context[elems[1]] *= +am;
                                    break;
                                case "/":
                                    context[elems[1]] /= +am;
                                    break;
                                case "=":
                                    context[elems[1]] = +am;
                                    break;
                            }
                        };
                    }
                }
                return f;
            };
            return Effect;
        })();
        Dialog.Effect = Effect;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
