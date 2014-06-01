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
            wm.Player.Energy += this.Resources;
            new UI.TextSpark("+" + this.Resources + " energy", wm.Player.View.x, wm.Player.View.y);
            this.Resolve(true,true);
           
        }
    }
    export class Item {
        Name: string;
    }
} 