/// <reference path="../_reference.ts" />
module WM.Event {
    export class Dialog extends RoomEvent {
        EventData: any;
        Panels: Array<UI.DialogPanel>;
        CurrentPanel: any;

        constructor(event:string) {
            super("dialog");
            this.EventData = G.events[event];
            this.Panels = new Array<UI.DialogPanel>();
            this.CurrentPanel = null;
            for (var i = 0; i < this.EventData.panels.length; i++) {
                this.Panels.push(this.EventData.panels[i]);
            }
        }
        Handle() {
            //show first panel
            this.ShowPanel();
        }
        ShowPanel(nr: number= 0) {
            if (nr == -2) {//close panel, event stays
                wm.Level.Popup.Hide();
                this.Resolve(false, false);
            }
            else if (nr == -1) {//close panel, remove event
                wm.Level.Popup.Hide();
                wm.Level.Popup = null;
                this.Resolve(true, true);
            }
            else if (nr >= 0) {//first panel
                if (nr > 0)
                    wm.Level.Popup.Hide();//close panel and show next
                wm.Level.Popup = wm.Level.game.add.existing(new UI.DialogPanel(this.Panels[nr]));
                wm.Level.Popup.Show();
            }            

        }
    }
} 
