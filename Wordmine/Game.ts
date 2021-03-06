/// <reference path="_reference.ts"/>
module WM {
    export class Main {
        mapView: JQuery;
        popupView: JQuery;
        combatView: JQuery;
        sidebar: UI.SideBar;
        dictionary: Combat.Dictionary;
        currentLevel: Level.LvlData;
        currentRoom: Level.Room;
        player: Level.Player;
        targetCell: Level.Cell;
        popup: UI.Popup.Popup;
        constructor() {    
            G.CellSize = G.GameHeight / G.RoomHeight;   
            setTimeout(function () { window.scrollTo(0, 1); }, 10);      
            this.mapView = $("#map");
            this.popupView = $("#popup");
            this.combatView = $("#combat");
            this.sidebar = new UI.SideBar();           
            this.popupView.css("width", G.MapWidth + "px");
            this.popupView.css("height", G.MapHeight + "px");
            this.popup = null;
            var self = this;
            this.mapView.click(function (e) {
                var mX = Math.floor((e.pageX - $(this).position().left) / G.CellSize);
                var mY = Math.floor((e.pageY - $(this).position().top) / G.CellSize);
                var cell = self.currentRoom.Cells[mY][mX]; 
            });
            this.preload();             
        }
        loadImages(onFinished:Function) {
            var self = this;
            var loadImage = function () {
                loadedImages++;
                if (loadedImages == totalImages) {
                    onFinished();
                }
            };
            var loadedImages = 0;
            var totalImages = G.images.length;
            for (var i = 0; i < totalImages; i++) {
                var tempImage = new Image();
                tempImage.addEventListener("load", loadImage, true);
                tempImage.src = '/img/' + G.images[i];
            }
        }
        loadDictionary(onFinished:Function) {
            $.get('dictionary.txt', function (data) {
                wm.dictionary = new Combat.Dictionary(data);
                onFinished();
            });
        }
        preload() {
            var self = this;
            this.loadDictionary(function () {
                self.loadImages(function () {
                    self.startGame();
                });
            });
        }
        startGame() {
            console.log("images loaded, starting game");
            console.log(G.creeps);
            this.currentLevel = new Level.LvlData(G.LevelWidth, G.LevelHeight);
            this.currentRoom = this.currentLevel.Cells[1][1];
            this.player = new Level.Player();
            this.player.Cell = this.currentRoom.Middle();
            this.player.Cell.MinedOut = 1;
            //this.currentRoom.Dump();
            this.drawRoom();
            this.setupKeys();
        }
        drawRoom() {
            this.mapView.empty();
            for (var i = 0; i < this.currentRoom.Width; i++) {
                for (var j = 0; j < this.currentRoom.Height; j++) {
                    this.currentRoom.Cells[j][i].draw();
                }
            }
            this.player.draw();
            this.sidebar.update();
        }

        makeMapElement(x, y, index, layer,id=null,opacity=null) {            
            var iX = (index % 16) * G.CellSize;
            var iY = Math.floor(index / 16) * G.CellSize;
            var idTag = "";
            var style = "";
            if (id != null) {
                idTag = "id='"+id+"'";
            }
            if (opacity != null) {
                style += "opacity:"+opacity+";";
            }
            
            style += "z-index:" + layer + ";";
            style += "top:" + (x * G.CellSize) + "px;";
            style += "left:" + (y * G.CellSize) + "px;";
            style += "width:" + G.CellSize + "px;";
            style += "height:" + G.CellSize + "px;";
            style += "background-size:"+1600+"%;",
            style += "background-position: -" + iX + "px -" + iY + "px;";
            return "<div class='cell' " + idTag + " style='" + style + "'></div>";
        }

        setupKeys() {
            var self = this;
            document.addEventListener('keydown', function (event) {
                switch (event.keyCode) {
                    case 37: self.handleInput("left");break;
                    case 38: self.handleInput("up");break;
                    case 39: self.handleInput("right");break;
                    case 40: self.handleInput("down");break;
                }
            });
        }
        handleInput(dir: string) {
            if (this.popup == null) {
                var target = this.currentRoom.GetNeighbour(dir, this.player.Cell.RoomX, this.player.Cell.RoomY);
                if (target != null) {
                    this.currentRoom.MoveToTile(this.player, target.RoomY, target.RoomX);
                }
            }
            else {
                this.popup.HandleInput(dir);
            }
            this.sidebar.update();
        }
        toCombat(creepData: Event.CreepData) {
            this.mapView.hide();
            var field = new Combat.Field(creepData);
            this.combatView.show();

            
        }
        endCombat(result: any) {
            this.combatView.hide();
            this.mapView.show();
        }
        handleExit(exit: Level.RoomExit) {
            this.currentRoom = exit.TargetRoom;
            this.player.Cell = exit.EntranceCell();
            this.player.Cell.MinedOut = 1;
            this.drawRoom();
        }

    }
}
var wm:WM.Main;
window.onload = () => { console.log("initializing");  wm = new WM.Main(); };




