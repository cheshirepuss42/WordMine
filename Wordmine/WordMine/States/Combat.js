var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (States) {
        var Combat = (function (_super) {
            __extends(Combat, _super);
            function Combat() {
                _super.call(this);
            }
            Combat.prototype.render = function () {
            };

            Combat.prototype.create = function () {
            };

            Combat.prototype.update = function () {
            };
            return Combat;
        })(Phaser.State);
        States.Combat = Combat;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
