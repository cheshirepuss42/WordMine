/// <reference path="../_reference.ts" />
module WM.Level {
    export class LvlData extends Util.Grid<Room> {
        //Current: Room;
        constructor( width: number, height: number) {
            //console.log("building level");
            super(width,height);
            for (var i = 0; i < this.Height; i++) {
                this.Cells[i] = new Array<Room>();
                for (var j = 0; j < this.Width; j++) {
                    this.Cells[i][j] = new Room(G.RoomWidth,G.RoomHeight,i,j);
                }
            }
            this.SetExits();
            //console.log("made exits");
        }
        SetExits() {
            //walk through each room and make exits between them if they are adjacent
            //console.log("setting exits");
            for (var i = 0; i < this.Height; i++) {
                for (var j = 0; j < this.Width; j++) {
                    var here = this.Cells[i][j];  
                    //here.Dump();                  
                    var above = (this.Inside(i, j - 1)) ? this.Cells[i][j - 1] : null;
                    var below = (this.Inside(i, j + 1)) ? this.Cells[i][j + 1] : null;
                    var left = (this.Inside(i - 1, j)) ? this.Cells[i - 1][j] : null;
                    var right = (this.Inside(i + 1, j)) ? this.Cells[i + 1][j] : null;
                    //console.log(above, right, below, left);
                    if (above != null) {
                        this.Cells[i][j].AddExit(new RoomExit(above, "top"));
                    }
                    if (below != null) {
                        this.Cells[i][j].AddExit(new RoomExit(below, "bottom"));
                    }
                    if (left != null) {
                        this.Cells[i][j].AddExit(new RoomExit(left, "left"));
                    }
                    if (right != null) {
                        this.Cells[i][j].AddExit(new RoomExit(right, "right"));
                    }
                }
            }
        }
    }
}

////-----------------------------------------------------------------------------------------------------------------------------//
//function Level(player) {
//    Grid.apply(this, arguments);
//    this.Width = settings.LevelWidth;
//    this.Height = settings.LevelHeight;
//    this.Cells = new Array(this.Height);
//    for (var i = 0; i < this.Height; i++) {
//        this.Cells[i] = new Array(this.Width);
//        for (var j = 0; j < this.Width; j++) {
//            this.Cells[i][j] = new Room(settings.RoomWidth, settings.RoomHeight, i, j);
//        }
//    }
//    this.SetExits();
//}
//Level.prototype = new Grid();
//Level.prototype.Show = function () {
//    var result = "";
//    for (var i = 0; i < this.Height; i++) {
//        for (var j = 0; j < this.Width; j++) {
//            result += this.Cells[i][j].Html();
//        }
//        result += "<div style='clear:both;'></div>";
//    }
//    return $("#gamecontainer").html(result);
//};
//Level.prototype.SetExits = function () {
//    for (var i = 0; i < this.Width; i++) {
//        for (var j = 0; j < this.Height; j++) {
//            var here = this.Cells[i][j];
//            var above = (this.Inside(i, j - 1)) ? this.Cells[i][j - 1] : null;
//            var below = (this.Inside(i, j + 1)) ? this.Cells[i][j + 1] : null;
//            var left = (this.Inside(i - 1, j)) ? this.Cells[i - 1][j] : null;
//            var right = (this.Inside(i + 1, j)) ? this.Cells[i + 1][j] : null;
//            if (above != null) {
//                this.Cells[i][j].AddExit(new RoomExit(above, "top"));
//            }
//            if (below != null) {
//                this.Cells[i][j].AddExit(new RoomExit(below, "bottom"));
//            }
//            if (left != null) {
//                this.Cells[i][j].AddExit(new RoomExit(left, "left"));
//            }
//            if (right != null) {
//                this.Cells[i][j].AddExit(new RoomExit(right, "right"));
//            }
//        }
//    }
//};
