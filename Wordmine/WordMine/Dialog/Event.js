var WM;
(function (WM) {
    (function (Dialog) {
        var Event = (function () {
            function Event(game, eventdata, cell) {
                this.Cell = cell;
                this.Panels = new Array();
                for (var i = 0; i < eventdata.panels.length; i++) {
                    var p = new WM.Dialog.EventPanel(game, eventdata.panels[i]);
                    this.Panels.push(p);
                }
            }
            Event.prototype.ShowPanel = function (nr) {
                if (typeof nr === "undefined") { nr = 0; }
                if (this.CurrentPanel == null) {
                    this.CurrentPanel = this.Panels[nr];
                    this.CurrentPanel.Show();
                }
                if (nr == -1) {
                    this.CurrentPanel.Hide();
                    this.Cell.Event = "";
                    wm.Level.Dialog = null;
                    wm.Level.DrawRoom();
                } else if (nr == -2) {
                    this.CurrentPanel.Hide();
                    wm.Level.Dialog = null;
                    wm.Level.DrawRoom();
                } else {
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
