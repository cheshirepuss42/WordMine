/// <reference path="../_reference.ts" />
module WM.Dialog {
    export class EventOption extends UI.TextButton{
        constructor(game: Phaser.Game, text: string, width: number, height: number, callback: Function, context?: Object) {
            super(game, text, width, height, callback, context, "#ddf");
        }
    }
}   