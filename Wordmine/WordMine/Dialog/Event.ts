module WM.Dialog {
    export class Event {
        Panels: Array<EventPanel>;
        CurrentPanel: EventPanel;
        Done: boolean;
        constructor(game: Phaser.Game, eventdata: any) {
            this.Done = false;
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
            if (nr < 0) {//close panel, end event
                this.CurrentPanel.Hide();                                
                this.Done = true;
                wm.Level.Dialog = null;
            }
            else {
                this.CurrentPanel.Hide();
                this.CurrentPanel = this.Panels[nr];
                this.CurrentPanel.Show();
            }

        }
    }
} 

