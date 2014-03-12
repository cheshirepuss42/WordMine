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
                _super.call(this);
            }
            Preload.prototype.preload = function () {
                this.game.load.image('player', '/Wordmine/Assets/player.png');

                this.game.load.tilemap('map', '/Wordmine/Assets/basemap.map', null, Phaser.Tilemap.TILED_JSON);

                this.game.load.spritesheet("tiles", "/Wordmine/Assets/t000.png", WM.G.CellSize, WM.G.CellSize);
            };

            Preload.prototype.create = function () {
                this.game.stage.backgroundColor = '#444448';
                this.preloadBar = new WM.UI.ProgressBar(this.game, 100, 50);
                this.counter = 0.1;
            };
            Preload.prototype.render = function () {
            };
            Preload.prototype.update = function () {
                this.counter -= this.game.time.elapsed / 1000;
                this.preloadBar.SetAmount(this.counter);
                if (this.counter < 0) {
                    this.preloadBar.destroy(true);
                    this.game.state.start("menu", true, false);
                }
            };
            return Preload;
        })(Phaser.State);
        States.Preload = Preload;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
