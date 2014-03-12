var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (Dialog) {
        var EventOption = (function (_super) {
            __extends(EventOption, _super);
            function EventOption(game, text, callback, context) {
                _super.call(this, game, text, 400, 70, callback, context, "#ddf");
            }
            return EventOption;
        })(WM.UI.TextButton);
        Dialog.EventOption = EventOption;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
