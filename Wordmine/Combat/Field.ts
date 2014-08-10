/// <reference path="../_reference.ts" />
module WM.Combat {
    export class Field {
        view: JQuery;
        word: LetterCollection;
        inventory: LetterCollection;
        confirmButton: UI.Button;
        fleeButton: UI.Button;
        creepData: Event.CreepData;
        constructor(crpdata:Event.CreepData) {
            this.view = wm.combatView;
            this.view.empty();
            this.creepData = crpdata;
            var self = this;
            //has all ui elements on it
            var f = function (a, b) {
                var letter = b.item.data().letter;
                var dropposition = b.item.index();
                //console.log(letter, dropposition);
            };
            this.inventory = new LetterCollection("inventory", ["inventory", "word"], f,50,50,4,4);
            this.inventory.addLetters([new Letter("P"), new Letter("G"), new Letter("E"), new Letter("R"), new Letter("O"), new Letter("U")]);
            this.word = new LetterCollection("word", ["inventory", "word"], f, 50, 250, 8, 1);
            this.confirmButton = new UI.Button("confirm", function () {
                console.log(self.word.getWord());
                var result = wm.dictionary.contains(self.word.getWord());
                console.log(result);
            });
            this.fleeButton = new UI.Button("flee", function () { wm.endCombat("flee"); });


            this.view.append(this.confirmButton.view);
            this.view.append(this.fleeButton.view);
            this.view.append(this.inventory.view);
            this.view.append(this.word.view);
                                  
            
        }
    }
} 