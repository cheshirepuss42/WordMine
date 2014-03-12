var WM;
(function (WM) {
    (function (UI) {
        var TextSpark = (function () {
            function TextSpark(txt, px, py, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                this.Text = wm.Level.game.add.text(px + (WM.G.CellSize / 2), py + (WM.G.CellSize / 2), txt, { fill: color });
                this.Text.anchor.setTo(0.5, 0.5);

                wm.Level.game.add.tween(this.Text).to({ y: py - 100, alpha: 0 }, 2000, Phaser.Easing.Cubic.Out, true).onComplete.add(this.Destroy, this);
            }
            TextSpark.prototype.Destroy = function () {
                this.Text.destroy();
            };
            return TextSpark;
        })();
        UI.TextSpark = TextSpark;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
