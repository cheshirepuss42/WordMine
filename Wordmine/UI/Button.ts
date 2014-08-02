module WM.UI {
    export class Button {
        view: JQuery;
        constructor(text: string, onclick: Function, cssclass: string= null) {
            var cl = (cssclass == null) ? "" : "class='"+cssclass+"'";
            var content="<button "+cl+">" + text + "</button>"
            this.view = $(content);
            this.view.click(onclick);
        }

    }
} 