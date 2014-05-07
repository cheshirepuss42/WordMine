module WM.Level {
    export class Room extends Util.Grid<Cell>{
        Selected: Cell;
        Target: Cell;
        PosX: number;
        PosY: number;
        Exits: Array<RoomExit>;

        constructor(width:number, height:number,x:number,y:number,roomdata?:any) {
            super(width, height);
            //set position in lvlgrid
            this.PosX = x;
            this.PosY = y;
            //exits are filled and applied later at lvldata
            this.Exits = new Array<RoomExit>();
            //make all the cells in the room, note that width and height are reverse from their visual x-y
            for (var i = 0; i < this.Height; i++) {
                this.Cells[i] = new Array<Cell>(this.Width);
                for (var j = 0; j < this.Width; j++) {
                    this.Cells[i][j] = new Cell(i, j, ".");
                    //set surrounding walls, exits are set in lvldata
                    this.Cells[i][j].Passable = (i == this.Height - 1 || i == 0 || j == this.Width - 1 || j == 0) ? false : true; 
                }
            }
            //applying random roomsections as defined in g.roomsections, needs 1x2 and 2x1 sections
            //keep track of which sections are filled
            console.log("new room");
            var handler = new RoomSectionsHandler(this);
            handler.FillRoom();
            

        }


        //can the player reach the minedout cell
        CellReachable(player: Player.Player, x: number, y: number):boolean {
            var px = player.Cell.RoomX;
            var py = player.Cell.RoomY;
            return this.Cells[x][y].MinedOut || (px + 1 == x && py == y) || (px - 1 == x && py == y) || (px  == x && py+ 1 == y) || (px  == x && py- 1 == y);
        }
        //handle interaction between player and tile
        MoveToTile(player: Player.Player, x: number, y: number) {
            //is it in the map?
            if (this.Inside(y, x)) {
                var target = this.Cells[y][x];
                //is cell minedout?
                if (target.MinedOut) {
                    //if there is some type of event
                    if (target.HasEvent()) {
                        //if there is an exit, handle it
                        if (target.Exit != null)
                            wm.Level.HandleExit(target.Exit);
                        //if there is treasure, pick it up
                        if (target.Treasure != null) {
                            target.Treasure.Handle(player);
                            player.Cell = target;
                            new UI.TextSpark("+" + target.Treasure.Resources + " energy", player.View.x, player.View.y);
                            target.Treasure = null;                            
                        }
                        //if there is a dialog, show it
                        //console.log(target.Event);
                        if (target.Event != "") {
                            wm.Level.ShowDialog(target.Event,target);
                        }
                    }
                    //move player to cell
                    else {
                        if (target.Passable)
                            player.Cell = target;
                    }
                }
                //handle mining out cell
                else {
                    target.MinedOut = true;
                    player.Energy -= 10;
                    new UI.TextSpark("-10 energy", player.View.x, player.View.y);
                }
            }
        }
        //add the exit and make the cell an exit
        AddExit(exit: RoomExit) {            
            this.Exits.push(exit);
            var cell = this.GetExitCell(exit.ExitType);
            cell.Exit = exit;
            cell.Passable = true;
        }
        //find the cell based on the type of exit
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
    }
    //class for the exits, with the target and the type
    export class RoomExit {
        TargetRoom: Room;
        ExitType: string;
        constructor(target: Room, type: string) {
            this.TargetRoom = target;
            this.ExitType = type;
        }
        //find the cell where the player comes out when using the exit
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
   
    
}  