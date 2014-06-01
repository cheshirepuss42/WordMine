/// <reference path="../_reference.ts" />

module WM.UI {
    export class Letter extends TextButton {
        constructor(game: Phaser.Game, text: string, callback?: Function) {
            super(game, text, 100, 100, callback);
            this.name = "letter";
        }
    }
} 