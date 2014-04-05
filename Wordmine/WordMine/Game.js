var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.call(this, 1024, 672, Phaser.CANVAS, "wordmine");
            this.Player = new WM.Player.Player();
            this.state.add("boot", WM.States.Boot);
            this.state.add("preload", WM.States.Preload);
            this.state.add("menu", WM.States.Menu);
            this.state.add("level", WM.States.Level);
            this.state.add("combat", WM.States.Combat);
            this.state.start("boot");
        }
        return Main;
    })(Phaser.Game);
    WM.Main = Main;
})(WM || (WM = {}));
var wm;
window.onload = function () {
    wm = new WM.Main();
};
