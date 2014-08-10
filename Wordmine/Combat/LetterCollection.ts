/// <reference path="../_reference.ts" />
module WM.Combat {
    export class LetterCollection {
        view: JQuery;
        letters: Array<Letter>;
        targets: Array<LetterCollection>;
        constructor(id:string,targets:Array<string>,onDrop:Function,x:number,y:number,w:number,h:number) {
            this.view = $("<div id='" + id + "' class='lettercollection "+id+"' ></div>");
            this.view.css("width", (2+G.CombatLetterWidth) * w + "px");
            this.view.css("height", (2+G.CombatLetterHeight) * h + "px");
            this.view.css("left", x + "px");
            this.view.css("top", y + "px");
            var connects = targets.join(", #");
            connects = "#" + connects;
            this.view.sortable({ connectWith: connects });
            var self = this;
            this.view.on("sortreceive", function (a, b) { onDrop(a,b); });
            this.letters = new Array < Letter>();            
        }
        addLetters(letters: Array<Letter>) {
            for (var i = 0; i < letters.length; i++) {
                this.view.append(letters[i].view);
            }
        }
        getLetters(): Array<Letter> {
            var letters = new Array<Letter>();
            $('.letter', this.view).each(function (i, elem) { letters.push($(elem).data().letter); });
            return letters;
        }
    }
} 