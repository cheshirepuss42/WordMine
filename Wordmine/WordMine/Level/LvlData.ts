/// <reference path="../_reference.ts" />
module WM.Level {
    export class LvlData extends Util.Grid<Room> {
        constructor( width: number, height: number) {
            super(width, height);
            //make all the rooms in the level (now just fills all, should be more cavelike)
            for (var i = 0; i < this.Height; i++) {
                this.Cells[i] = new Array<Room>();
                for (var j = 0; j < this.Width; j++) {
                    this.Cells[i][j] = new Room(G.RoomWidth,G.RoomHeight,i,j);
                }
            }
            //apply the exits in the rooms
            this.SetExits();
        }
        SetExits() {
            //walk through each room and make exits between them if they are adjacent
            for (var i = 0; i < this.Height; i++) {
                for (var j = 0; j < this.Width; j++) {
                    var here = this.Cells[i][j];    
                    //get the surrounding cells          
                    var above = (this.Inside(i, j - 1)) ? this.Cells[i][j - 1] : null;
                    var below = (this.Inside(i, j + 1)) ? this.Cells[i][j + 1] : null;
                    var left = (this.Inside(i - 1, j)) ? this.Cells[i - 1][j] : null;
                    var right = (this.Inside(i + 1, j)) ? this.Cells[i + 1][j] : null;
                    //add an exit to them if necessary
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