module WM.Event {
    export class Treasure extends RoomEvent {
        Resources: number;
        Items: Array<Item>;
        constructor(level: number) {
            super("treasure");
            this.Resources = 50 + (Math.floor(Math.random() * 50));
            this.Resources *= level;
        }
        Handle() {
            var self = this;
            var effects = function () {
                wm.Player.Energy += self.Resources;
                wm.Level.Popup.Hide();
                wm.Level.Popup = null;
                console.log("handling treasure", wm.Player.Energy);
                self.Resolve(true, true);
            };
            var msg = "You found "+this.Resources+" resources.";
            wm.Level.Popup = wm.Level.game.add.existing(new UI.MessagePopup(msg,effects));
            //new UI.TextSpark("+" + this.Resources + " energy", wm.Player.View.x, wm.Player.View.y);
            
           
        }
    }
    export class Item {
        Name: string;
    }
} 