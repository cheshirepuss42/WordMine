/// <reference path="../_reference.ts" />
module WM.UI {
    export class DialogOption extends TextButton{
        constructor(game: Phaser.Game, text: string, width: number, height: number, callback: Function, context?: Object) {
            super(game, text, width, height, callback, context, "#ddf");
        }
    }
}   