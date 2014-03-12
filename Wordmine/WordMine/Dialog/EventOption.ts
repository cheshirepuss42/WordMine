/// <reference path="../_reference.ts" />
module WM.Dialog {
    export class EventOption extends UI.TextButton{
        constructor(game: Phaser.Game, text: string, callback: Function,context?:Object) {
            super(game, text, 400, 70, callback, context, "#ddf");
        }
    }
}   