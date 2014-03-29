module WM.Treasure {
    export class Treasure {
        Resources: number;
        Items: Array<Item>;
        constructor(level: number) {
            this.Resources = 50 + (Math.floor(Math.random() * 50));
            this.Resources *= level;
        }
        Handle(player: Player.Player) {
            player.Energy += this.Resources;
           
        }
    }
} 