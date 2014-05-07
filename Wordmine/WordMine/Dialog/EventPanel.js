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
                this.padding = 10;
                this.background = this.add(new Phaser.Image(game, 0, 0, WM.UI.FilledRect.getBMD(game, WM.G.MapWidth, WM.G.MapHeight, "#eee"), null));
                this.options = new Array();
                for (var j = 0; j < panel.options.length; j++) {
                    var option = panel.options[j];
                    if (WM.Dialog.Effect.Happens(option.conditions)) {
                        var effects = function () {
                            for (var i = 0; i < option.effects.length; i++) {
                                WM.Dialog.Effect.Call(option.effects[i])();
                            }
                        };
                        var eopt = new WM.Dialog.EventOption(game, option.text, WM.G.MapWidth, 70, effects);
                        this.add(eopt);
                        eopt.y += 200 + ((this.options.length - 1) * eopt.h);
                        this.options.push(eopt);
                    }
                }
                this.image = panel.img;
                this.text = this.add(new Phaser.Text(game, this.padding, this.padding, panel.text, WM.G.style));
                this.SelectedOption = 0;
                this.Hide();
            }
            EventPanel.prototype.HandleInput = function (dir) {
                this.options[this.SelectedOption].button.tint = 0xeeeeee;
                if (dir == "down") {
                    this.SelectedOption++;
                    this.SelectedOption = (this.SelectedOption > this.options.length - 1) ? 0 : this.SelectedOption;
                } else if (dir == "up") {
                    this.SelectedOption--;
                    this.SelectedOption = (this.SelectedOption < 0) ? this.options.length - 1 : this.SelectedOption;
                } else
                    this.options[this.SelectedOption].callback();
                this.options[this.SelectedOption].button.tint = 0xaaaaee;
            };
            EventPanel.prototype.Show = function () {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].Show();
                }
                this.text.exists = this.text.visible = true;
                this.background.exists = this.background.visible = true;
                this.visible = this.exists = true;
            };
            EventPanel.prototype.Hide = function () {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].Hide();
                }
                this.text.exists = this.text.visible = false;
                this.background.exists = this.background.visible = false;
                this.visible = this.exists = false;
            };
            return EventPanel;
        })(Phaser.Group);
        Dialog.EventPanel = EventPanel;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
