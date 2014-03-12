/*/// <reference path="_reference.ts"/>*/
module WM {
    export class Main extends Phaser.Game {
        Player: Player.Player;
        Level: States.Level;
        constructor() {
            
            super(1024, 672, Phaser.CANVAS, "wordmine");
            this.Player = new Player.Player();
            this.Player.name = "zzzzzzzzzzzzz";
            this.state.add("boot", States.Boot);
            this.state.add("preload", States.Preload);
            this.state.add("menu", States.Menu);
            this.state.add("level", States.Level);
            this.state.add("combat", States.Combat);
            this.state.start("boot");

            //hhjhghj

        }
    }
}
var wm:WM.Main;


window.onload = () => {
    wm = new WM.Main();
 
};
//function getContextFromString(str: string) {
//    var elems = str.split('.');
//    elems.pop();
//    return getFunctionFromString(elems.join('.'));
//}
//function getFunctionFromString(str: string) {
//    var scope = window;
//    var scopeSplit = str.split('.');
//    for (var i = 0; i < scopeSplit.length - 1; i++) {
//        scope = scope[scopeSplit[i]];
//        if (scope == undefined) return;
//    }
//    return scope[scopeSplit[scopeSplit.length - 1]];
//}




