module WM.UI {
    export class Label {
        view: JQuery;
        constructor(text: string, cssclass: string= null) {
            var cl = (cssclass == null) ? "" : "class='" + cssclass + "'";
            this.view = $("<div " + cl + ">" + text + "</div>");
        }

    }
}  