module WM.Dialog {
    export class Event {
        Panels: Array<EventPanel>;
        CurrentPanel: EventPanel;
        Cell: Level.Cell;
        constructor(game: Phaser.Game, eventdata: any, cell: Level.Cell) {
            this.Cell = cell;
            this.Panels = new Array<EventPanel>();
            this.CurrentPanel = null;
            for (var i = 0; i < eventdata.panels.length; i++) {
                this.Panels.push(game.add.existing(new EventPanel(game, eventdata.panels[i])));
            }
        }

        ShowPanel(nr: number= 0) {
            console.log("nr",nr,this);
            if (this.CurrentPanel == null) {//first panel
                console.log("--first");
                this.CurrentPanel = this.Panels[nr];
                this.CurrentPanel.Show();
            }
            else if (nr == -1) {//close panel, remove event
                console.log("--gone");
                this.CurrentPanel.Hide();
                this.Cell.Event = "";
                wm.Level.Dialog = null;
                wm.Level.DrawRoom();
            }
            else if (nr == -2) {//close panel, event stays
                console.log("--stay");
                this.CurrentPanel.Hide();
                wm.Level.Dialog = null;
                wm.Level.DrawRoom();
            }
            else {
                console.log("--next");
                this.CurrentPanel.Hide();//close panel and show next
                this.CurrentPanel = this.Panels[nr];
                this.CurrentPanel.Show();
            }

        }
    }
} 
