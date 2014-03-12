/// <reference path="../_reference.ts" />

module WM.Letter {
    export class Letter extends WM.UI.TextButton {
        constructor(game: Phaser.Game, text: string, callback?: Function) {
            super(game, text, 100, 100, callback);
            this.name = "letter";
        }
    }
} 