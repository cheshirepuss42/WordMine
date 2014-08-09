/// <reference path="../_reference.ts" />
module WM.UI {
    export class DialogOption {
        view: JQuery;
        onClick: Function;
        text: string;
        constructor(text: string, onclick: Function, cssclass: string = null) {
            this.text = text;
            this.onClick = onclick;
            var cl = (cssclass == null) ? "" : "class='" + cssclass + "'";
            this.view = $("<div " + cl + ">" + this.text + "</div>");
            var self = this;
            this.view.click(this.onClick);// () { console.log("clicking:"+self.text); self.onClick(); });
        }
    }
}   