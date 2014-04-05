var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (UI) {
        var TextButton = (function (_super) {
            __extends(TextButton, _super);
            function TextButton(game, text, width, height, callback, context, color) {
                if (typeof width === "undefined") { width = 100; }
                if (typeof height === "undefined") { height = 50; }
                if (typeof color === "undefined") { color = "#eee"; }
                _super.call(this, game, null, "button");
                this.w = width;
                this.h = height;
                this.button = this.add(new Phaser.Button(this.game, 0, 0, "", callback, context));
                this.button.loadTexture(WM.UI.FilledRect.getBMD(this.game, this.w, this.h, color), 0);
                this.text = this.add(new Phaser.Text(this.game, 0, 0, text, WM.G.style));
                this.text.anchor.set(0.5, 0.5);
                this.text.x = this.button.width / 2;
                this.text.y = this.button.height / 2;
                this.Hide();
            }
            TextButton.prototype.Hide = function () {
                this.exists = false;
            };
            TextButton.prototype.Show = function () {
                this.exists = true;
            };
            return TextButton;
        })(Phaser.Group);
        UI.TextButton = TextButton;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
