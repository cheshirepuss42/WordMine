module WM.Level {
    export class Room extends Util.Grid<Cell>{
        //Surface: Phaser.Group;
        Selected: Cell;
        Target: Cell;
        PosX: number;
        PosY: number;
        Exits: Array<RoomExit>;
        constructor(width:number, height:number,x:number,y:number,roomdata?:any) {
            super(width, height);
            this.PosX = x;
            this.PosY = y;
            this.Exits = new Array<RoomExit>();
            //console.log("building room", x, y);
            for (var i = 0; i < this.Height; i++) {
                this.Cells[i] = new Array<Cell>(this.Width);
                for (var j = 0; j < this.Width; j++) {
                    this.Cells[i][j] = new Cell(i, j, ".");
                    this.Cells[i][j].Passable = (i == this.Height - 1 || i == 0 || j == this.Width - 1 || j == 0) ? false : true; //set walls
                }
            }
            //console.log("applying sections\noisadjioasoidfa");
            for (var k = 0; k < 4; k++) {
                var nr = Math.floor(Math.random() * G.RoomSections.length);
                new RoomSection(G.RoomSections[nr].type, G.RoomSections[nr].grid).ApplyToRoom(this, k + 1);
            }
        }
        CellReachable(player: Player.Player, x: number, y: number):boolean {
            var px = player.Cell.RoomX;
            var py = player.Cell.RoomY;
            return this.Cells[x][y].MinedOut || (px + 1 == x && py == y) || (px - 1 == x && py == y) || (px  == x && py+ 1 == y) || (px  == x && py- 1 == y);
        }
        MoveToTile(player: Player.Player, x: number, y: number) {
            if (this.Inside(y, x)) {
                //if 
                var target = this.Cells[y][x];
                if (target.MinedOut) {
                    if (target.HasEvent()) {
                        if (target.Exit != null)
                            wm.Level.HandleExit(target.Exit);
                        if (target.Treasure != null) {
                            target.Treasure.Handle(player);
                            player.Cell = target;
                            new UI.TextSpark("+" + target.Treasure.Resources + " energy", player.View.x, player.View.y);
                            target.Treasure = null;
                            
                            
                        }
                        if (target.Event != "") {
                            wm.Level.ShowEvent(target.Event);
                        }
                    }
                    else {
                        if (target.Passable)
                            player.Cell = target;
                    }
                }
                else {
                    target.MinedOut = true;
                    player.Energy -= 10;
                    new UI.TextSpark("-10 energy", player.View.x, player.View.y);
                }
            }
        }
        Dump() {
            console.log( this.AsString());
        }

        AddExit(exit: RoomExit) {
            
            this.Exits.push(exit);
            var cell = this.GetExitCell(exit.ExitType);
            cell.Exit = exit;
            cell.Passable = true;
        }
        GetExitCell(exittype:string):Cell {
            var hw = Math.floor(this.Width / 2);
            var hh = Math.floor(this.Height / 2);
            switch (exittype) {
                case "left": return this.Cells[hh][0];
                case "bottom": return this.Cells[this.Height - 1][hw];
                case "right": return this.Cells[hh][this.Width - 1];
                case "top": return this.Cells[0][hw];
                default: return this.Cells[hh][hw];
            }
        }
        //HandleClick(pointer: Phaser.Pointer) {
        //    console.log(pointer.x, pointer.y);
        //}
      


    }
    export class RoomExit {
        TargetRoom: Room;
        ExitType: string;
        constructor(target: Room, type: string) {
            this.TargetRoom = target;
            this.ExitType = type;
        }
        EntranceCell() {
            var entrance: string = "";
            switch (this.ExitType) {
                case "top": entrance = "bottom"; break;
                case "bottom": entrance = "top";break;
                case "left": entrance = "right";break;
                case "right": entrance = "left";break;
                default: entrance = "middle";break;
            }
            return this.TargetRoom.GetExitCell(entrance);
        }
    }
    export class RoomSection {
        Type: string;        
        Grid: Array<string>;
        constructor(type:string,grid:any) {
            this.Type = type;
            this.Grid = <Array<string>>grid.slice();
        }
        Dump() {
            console.log(this.Grid.join("\n"));
        }
        Flip(type:string) {
            if (type == "horizontal") {
                for (var i = 0; i < this.Grid.length; i++) {
                    this.Grid[i] = this.Grid[i].split("").reverse().join("");
                }
            }
            if (type == "vertical") {
                for (var i = 0; i < (this.Grid.length / 2); i++) {
                    var temp = this.Grid[i];
                    var target = i + ((this.Grid.length - 1) - (i * 2));
                    this.Grid[i] = this.Grid[target];
                    this.Grid[target] = temp;
                }
            }
        }
        ApplyToRoom(room: Room, quadrant: number) {
            var posX = 1;
            var posY = 1;
            var newX = Math.floor((G.RoomHeight / 2) + 1);
            var newY = Math.floor((G.RoomWidth / 2) + 1);
            
            if (this.Type == "fourth") {
                switch (quadrant) {
                    case 2: this.Flip("horizontal"); posY = newY; break;
                    case 3: this.Flip("vertical"); posX = newX; break;
                    case 4: this.Flip("horizontal"); this.Flip("vertical"); posX = newX; posY = newY; break;
                }
            }
            if (this.Type == "horizontal") {
                if (quadrant == 2 || quadrant == 4) {
                    this.Flip("horizontal");
                    posY = newY;
                }
            }
            if (this.Type == "vertical") {
                if (quadrant == 3 || quadrant == 4) {
                    this.Flip("vertical");
                    posX = newX;
                }
            }
            for (var i = posX; i < posX + this.Grid.length; i++) {
                for (var j = posY; j < posY + this.Grid[0].length; j++) {
                    
                    if (room.Inside(i,j)) {
                        room.Cells[i][j] = new Cell(i, j, this.Grid[i - posX][j - posY]);
                    }
                }
            }

        }
    }
}  