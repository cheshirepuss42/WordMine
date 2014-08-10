module WM.UI {
    export class SideBar {
        view: JQuery;
        controls: JQuery;
        stats: JQuery;
        constructor() {
            this.view = $("#ui");
            this.view.css("left", (G.MapWidth + 1) + "px");
            this.view.css("top", "0px");
            this.view.css("width", G.UIWidth + "px");
            this.view.css("height", G.UIHeight + "px");
            this.stats = $("<div id='stats'></div>");
            this.view.append(this.stats);
            this.setupControls();
            //this.update();
        }
        setupControls() {
            this.controls = $("<div id='controls'></div>");
            this.controls.append(new Button("up", function () { wm.handleInput("up"); }).view);
            this.controls.append(new Button("down", function () { wm.handleInput("down"); }).view);
            this.controls.append(new Button("left", function () { wm.handleInput("left"); }).view);
            this.controls.append(new Button("right", function () { wm.handleInput("right"); }).view);
            this.view.append(this.controls);
        }
        update() {
            this.stats.empty();
            this.stats.append(new Label("Resources:" + wm.player.Energy + "/" + wm.player.MaxEnergy).view);
            this.stats.append(new Label("Health:" + wm.player.Health + "/" + wm.player.MaxHealth).view);
            
        }
    }
} 