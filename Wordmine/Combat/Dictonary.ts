/// <reference path="../_reference.ts" />
module WM.Combat {
    export class Dictionary {
        words:Array<string>;
        constructor(data:string) {
            this.words = data.split('\r\n');
        }
        contains(word: string): boolean {
            word = word.toLowerCase();
            for (var i = 0; i < this.words.length; i++) {
                if (this.words[i] == word) {
                    return true;
                }
            }
            return false;
        }
    
    }
} 