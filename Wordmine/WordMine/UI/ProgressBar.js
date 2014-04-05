var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (UI) {
        var ProgressBar = (function (_super) {
            __extends(ProgressBar, _super);
            function ProgressBar(game, width, height) {
                if (typeof width === "undefined") { width = 100; }
                if (typeof height === "undefined") { height = 50; }
                _super.call(this, game, null, "progressbar");
                this._filled = 0;
                this.padding = 5;
                this.dpadding = this.padding * 2;
                this.background = this.add(new WM.UI.FilledRect(game, width, height));
                this.bar = this.add(new WM.UI.FilledRect(game, width - this.dpadding, height - this.dpadding, "#000"));
                this.bar.x += this.padding * 3;
                this.bar.y += this.padding * 3;
                this.width = width;
                this.height = height;
            }
            Object.defineProperty(ProgressBar.prototype, "FilledAmount", {
                get: function () {
                    return this._filled;
                },
                set: function (percent) {
                    this._filled = percent;
                    this.SetAmount(percent);
                },
                enumerable: true,
                configurable: true
            });

            ProgressBar.prototype.SetAmount = function (percent) {
                if (percent >= 0 && percent <= 1) {
                    var w = (this.background.width - this.dpadding) * percent;
                    this.bar.width = w;
                }
            };
            return ProgressBar;
        })(Phaser.Group);
        UI.ProgressBar = ProgressBar;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
