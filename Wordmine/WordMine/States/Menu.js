var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (States) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.create = function () {
                this.button = this.game.add.existing(new WM.UI.TextButton(this.game, "start game", 300, 100, this.Start));
                this.button.x = (this.game.width / 2) - (this.button.w / 2);
                this.button.y = (this.game.height / 2) - (this.button.h / 2);
                this.button.Show();
            };
            Menu.prototype.Start = function () {
                this.game.state.start("level", true, false);
            };
            return Menu;
        })(Phaser.State);
        States.Menu = Menu;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
