var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (Dialog) {
        var EventPanel = (function (_super) {
            __extends(EventPanel, _super);
            function EventPanel(game, panel) {
                _super.call(this, game, null, "panel", false);
                this.x = game.width / 4;
                this.y = 100;
                this.padding = 10;
                this.background = this.add(new WM.UI.FilledRect(game, game.width / 2, game.height / 1.5, "#eeeeee"));
                this.options = new Array();
                for (var j = 0; j < panel.options.length; j++) {
                    var option = panel.options[j];
                    if (WM.Dialog.Effect.Happens(option.conditions)) {
                        var effects = function () {
                            for (var i = 0; i < option.effects.length; i++) {
                                WM.Dialog.Effect.Call(option.effects[i])();
                            }
                        };
                        var eopt = new WM.Dialog.EventOption(game, option.text, effects);
                        this.add(eopt);
                        eopt.y += 200 + ((this.options.length - 1) * eopt.h);
                        this.options.push(eopt);
                    }
                }
                this.image = panel.img;
                this.text = this.add(new Phaser.Text(game, this.padding, this.padding, panel.text, WM.G.style));

                this.Hide();
            }
            EventPanel.prototype.Show = function () {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].Show();
                }
                this.text.exists = true;
                this.background.exists = true;
            };
            EventPanel.prototype.Hide = function () {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].Hide();
                }
                this.text.exists = false;
                this.background.exists = false;
            };
            return EventPanel;
        })(Phaser.Group);
        Dialog.EventPanel = EventPanel;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
