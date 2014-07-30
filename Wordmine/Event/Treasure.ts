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
                wm.player.Energy += self.Resources;
                self.Resolve(true);
            };
            console.log("handling treasure");
            var msg = "You found " + this.Resources + " resources.";
            var popup = new UI.Popup.MessagePopup(msg,"", effects);
            popup.Open();
          
        }
    }
    export class Item {
        Name: string;
    }
} 