var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (_Letter) {
        var Letter = (function (_super) {
            __extends(Letter, _super);
            function Letter(game, text, callback) {
                _super.call(this, game, text, 100, 100, callback);
                this.name = "letter";
            }
            return Letter;
        })(WM.UI.TextButton);
        _Letter.Letter = Letter;
    })(WM.Letter || (WM.Letter = {}));
    var Letter = WM.Letter;
})(WM || (WM = {}));
