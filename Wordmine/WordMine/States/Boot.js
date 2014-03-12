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
                _super.call(this);
            }
            Boot.prototype.render = function () {
            };

            Boot.prototype.create = function () {
                this.game.state.start("preload", true, false);
            };

            Boot.prototype.update = function () {
            };
            return Boot;
        })(Phaser.State);
        States.Boot = Boot;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
