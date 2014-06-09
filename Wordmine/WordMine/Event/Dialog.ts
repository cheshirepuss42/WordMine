/// <reference path="../_reference.ts" />
module WM.Event {
    export class Dialog extends RoomEvent {
        EventData: any;
        Panels: Array<UI.Popup.DialogPanel>;
        CurrentPanel: number;


        constructor(event:string) {
            super("dialog");
            this.EventData = G.events[event];
            this.Panels = new Array<UI.Popup.DialogPanel>();
            this.CurrentPanel = 0;
            for (var i = 0; i < this.EventData.panels.length; i++) {
                this.Panels.push(new UI.Popup.DialogPanel(this.EventData.panels[i]));
            }
        }
        Handle() {
            //show first panel
            this.ShowPanel();
        }
        ShowPanel(nr: number= 0) {         
            if (nr < 0) {
                if (nr == -2) {//close panel, event stays
                    this.Panels[this.CurrentPanel].Close();
                    this.Resolve(false, false);
                }
                if (nr == -1) {//close panel, remove event
                    this.Panels[this.CurrentPanel].Close();
                    this.Resolve(true, true);
                }
            }
            else{//first panel
                if (nr > 0)
                    this.Panels[this.CurrentPanel].Close();         
                this.Panels[nr].Open();
                this.CurrentPanel = nr;
            }            

        }
    }
} 
