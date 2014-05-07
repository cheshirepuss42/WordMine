var WM;
(function (WM) {
    (function (Dialog) {
        var Event = (function () {
            function Event(game, eventdata, cell) {
                this.Cell = cell;
                this.Panels = new Array();
                this.CurrentPanel = null;
                for (var i = 0; i < eventdata.panels.length; i++) {
                    this.Panels.push(game.add.existing(new WM.Dialog.EventPanel(game, eventdata.panels[i])));
                }
            }
            Event.prototype.ShowPanel = function (nr) {
                if (typeof nr === "undefined") { nr = 0; }
                console.log("nr", nr, this);
                if (this.CurrentPanel == null) {
                    console.log("--first");
                    this.CurrentPanel = this.Panels[nr];
                    this.CurrentPanel.Show();
                } else if (nr == -1) {
                    console.log("--gone");
                    this.CurrentPanel.Hide();
                    this.Cell.Event = "";
                    wm.Level.Dialog = null;
                    wm.Level.DrawRoom();
                } else if (nr == -2) {
                    console.log("--stay");
                    this.CurrentPanel.Hide();
                    wm.Level.Dialog = null;
                    wm.Level.DrawRoom();
                } else {
                    console.log("--next");
                    this.CurrentPanel.Hide();
                    this.CurrentPanel = this.Panels[nr];
                    this.CurrentPanel.Show();
                }
            };
            return Event;
        })();
        Dialog.Event = Event;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
