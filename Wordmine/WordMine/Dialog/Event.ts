module WM.Dialog {
    export class Event {
        Panels: Array<EventPanel>;
        CurrentPanel: EventPanel;
        Cell: Level.Cell;
        constructor(game: Phaser.Game, eventdata: any, cell: Level.Cell) {
            this.Cell = cell;
            this.Panels = new Array<EventPanel>();
            for (var i = 0; i < eventdata.panels.length; i++) {
                var p = new EventPanel(game, eventdata.panels[i]);
                this.Panels.push(p);
            }
        }

        ShowPanel(nr: number= 0) {
            if (this.CurrentPanel == null) {//first panel
                this.CurrentPanel = this.Panels[nr];
                this.CurrentPanel.Show();
            }
            if (nr == -1) {//close panel, remove event
                this.CurrentPanel.Hide();
                this.Cell.Event = "";
                wm.Level.Dialog = null;
                wm.Level.DrawRoom();
            }
            else if (nr == -2) {//close panel, event stays
                this.CurrentPanel.Hide();
                wm.Level.Dialog = null;
                wm.Level.DrawRoom();
            }
            else {
                this.CurrentPanel.Hide();//close panel and show next
                this.CurrentPanel = this.Panels[nr];
                this.CurrentPanel.Show();
            }

        }
    }
} 
