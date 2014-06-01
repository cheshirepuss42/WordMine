/*/// <reference path="_reference.ts"/>*/
module WM {
    export class Main extends Phaser.Game {
        Player: Level.Player;
        Level: States.Level;
        constructor() {            
            super(G.GameWidth, G.GameHeight, Phaser.CANVAS, "wordmine");
            this.Player = new Level.Player();
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




