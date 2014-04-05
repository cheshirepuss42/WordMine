var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (UI) {
        var FilledRect = (function (_super) {
            __extends(FilledRect, _super);
            function FilledRect(game, width, height, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                _super.call(this, game, width, height);
                this.color = color;
                this.loadTexture(FilledRect.getBMD(game, width, height, color), null);
            }
            FilledRect.getBMD = function (game, width, height, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                var bmd = new Phaser.BitmapData(game, "bla", width, height);
                bmd.context.fillStyle = color;
                bmd.context.rect(0, 0, width, height);
                bmd.context.fill();
                return bmd;
            };
            return FilledRect;
        })(Phaser.Sprite);
        UI.FilledRect = FilledRect;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
