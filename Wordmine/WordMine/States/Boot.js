var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (States) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = '#444448';
                this.game.state.start("preload", true, false);
            };
            return Boot;
        })(Phaser.State);
        States.Boot = Boot;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
