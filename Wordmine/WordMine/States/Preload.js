var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (States) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
                this.game.load.image('player', '/Wordmine/Assets/player.png');
                this.game.load.image('tiles', "/Wordmine/Assets/t000.png");
            };
            Preload.prototype.create = function () {
                this.preloadBar = new WM.UI.ProgressBar(this.game, 100, 50);
                var tween = this.add.tween(this.preloadBar).to({ FilledAmount: 1 }, 1000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startMainMenu, this);
            };
            Preload.prototype.startMainMenu = function () {
                this.game.state.start("menu", true, false);
            };
            return Preload;
        })(Phaser.State);
        States.Preload = Preload;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
