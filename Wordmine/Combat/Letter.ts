/// <reference path="../_reference.ts" />
module WM.Combat {
    export class Letter {
        view: JQuery;
        char: string;
        position: number;
        constructor(chr:string) {
            this.char = chr;
            this.view = $("<div class='letter'>" + this.char + "</div>");
            this.view.css("width", G.CombatLetterWidth + "px");
            this.view.css("height", G.CombatLetterHeight + "px");
            this.view.css("border", "1px solid black");
            this.view.data({letter:this });
           

        }
    }
}  