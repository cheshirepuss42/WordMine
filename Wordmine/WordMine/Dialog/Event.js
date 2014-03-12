var WM;
(function (WM) {
    (function (Dialog) {
        var Event = (function () {
            function Event(game, eventdata) {
                this.Done = false;
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
                if (nr < 0) {
                    this.CurrentPanel.Hide();
                    this.Done = true;
                    wm.Level.Dialog = null;
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
