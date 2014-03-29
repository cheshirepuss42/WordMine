/*/// <reference path="_reference.ts"/>*/
module WM {
    export class Main extends Phaser.Game {
        Player: Player.Player;
        Level: States.Level;
        constructor() {            
            super(1024, 672, Phaser.CANVAS, "wordmine");
            this.Player = new Player.Player();
            this.state.add("boot", States.Boot);
            this.state.add("preload", States.Preload);
            this.state.add("menu", States.Menu);
            this.state.add("level", States.Level);
            this.state.add("combat", States.Combat);
            this.state.start("boot");
        }
    }
}
var wm:WM.Main;
window.onload = () => {    wm = new WM.Main(); };




