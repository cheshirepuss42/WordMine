/// <reference path="../_reference.ts" />
module WM.UI {
    export class DialogOption extends TextButton{
        constructor(text: string, width: number, height: number, callback: Function, context?: Object) {
            super(text, width, height, callback, context, "#ddf");
        }
    }
}   