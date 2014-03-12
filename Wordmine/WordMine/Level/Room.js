var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (Level) {
        var Room = (function (_super) {
            __extends(Room, _super);
            function Room(width, height, x, y, roomdata) {
                _super.call(this, width, height);
                this.PosX = x;
                this.PosY = y;
                this.Exits = new Array();

                for (var i = 0; i < this.Height; i++) {
                    this.Cells[i] = new Array(this.Width);
                    for (var j = 0; j < this.Width; j++) {
                        this.Cells[i][j] = new WM.Level.Cell(i, j, ".");
                        this.Cells[i][j].Passable = (i == this.Height - 1 || i == 0 || j == this.Width - 1 || j == 0) ? false : true;
                    }
                }

                for (var k = 0; k < 4; k++) {
                    var nr = Math.floor(Math.random() * WM.G.RoomSections.length);
                    new RoomSection(WM.G.RoomSections[nr].type, WM.G.RoomSections[nr].grid).ApplyToRoom(this, k + 1);
                }
            }
            Room.prototype.CellReachable = function (player, x, y) {
                var px = player.Cell.RoomX;
                var py = player.Cell.RoomY;
                return this.Cells[x][y].MinedOut || (px + 1 == x && py == y) || (px - 1 == x && py == y) || (px == x && py + 1 == y) || (px == x && py - 1 == y);
            };
            Room.prototype.MoveToTile = function (player, x, y) {
                if (this.Inside(y, x)) {
                    var target = this.Cells[y][x];
                    if (target.MinedOut) {
                        if (target.HasEvent()) {
                            if (target.Exit != null)
                                wm.Level.HandleExit(target.Exit);
                            if (target.Treasure != null) {
                                target.Treasure.Handle(player);
                                player.Cell = target;
                                new WM.UI.TextSpark("+" + target.Treasure.Resources + " energy", player.View.x, player.View.y);
                                target.Treasure = null;
                            }
                            if (target.Event != "") {
                                wm.Level.ShowEvent(target.Event);
                            }
                        } else {
                            if (target.Passable)
                                player.Cell = target;
                        }
                    } else {
                        target.MinedOut = true;
                        player.Energy -= 10;
                        new WM.UI.TextSpark("-10 energy", player.View.x, player.View.y);
                    }
                }
            };
            Room.prototype.Dump = function () {
                console.log(this.AsString());
            };

            Room.prototype.AddExit = function (exit) {
                this.Exits.push(exit);
                var cell = this.GetExitCell(exit.ExitType);
                cell.Exit = exit;
                cell.Passable = true;
            };
            Room.prototype.GetExitCell = function (exittype) {
                var hw = Math.floor(this.Width / 2);
                var hh = Math.floor(this.Height / 2);
                switch (exittype) {
                    case "left":
                        return this.Cells[hh][0];
                    case "bottom":
                        return this.Cells[this.Height - 1][hw];
                    case "right":
                        return this.Cells[hh][this.Width - 1];
                    case "top":
                        return this.Cells[0][hw];
                    default:
                        return this.Cells[hh][hw];
                }
            };
            return Room;
        })(WM.Util.Grid);
        Level.Room = Room;
        var RoomExit = (function () {
            function RoomExit(target, type) {
                this.TargetRoom = target;
                this.ExitType = type;
            }
            RoomExit.prototype.EntranceCell = function () {
                var entrance = "";
                switch (this.ExitType) {
                    case "top":
                        entrance = "bottom";
                        break;
                    case "bottom":
                        entrance = "top";
                        break;
                    case "left":
                        entrance = "right";
                        break;
                    case "right":
                        entrance = "left";
                        break;
                    default:
                        entrance = "middle";
                        break;
                }
                return this.TargetRoom.GetExitCell(entrance);
            };
            return RoomExit;
        })();
        Level.RoomExit = RoomExit;
        var RoomSection = (function () {
            function RoomSection(type, grid) {
                this.Type = type;
                this.Grid = grid.slice();
            }
            RoomSection.prototype.Dump = function () {
                console.log(this.Grid.join("\n"));
            };
            RoomSection.prototype.Flip = function (type) {
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
            };
            RoomSection.prototype.ApplyToRoom = function (room, quadrant) {
                var posX = 1;
                var posY = 1;
                var newX = Math.floor((WM.G.RoomHeight / 2) + 1);
                var newY = Math.floor((WM.G.RoomWidth / 2) + 1);

                if (this.Type == "fourth") {
                    switch (quadrant) {
                        case 2:
                            this.Flip("horizontal");
                            posY = newY;
                            break;
                        case 3:
                            this.Flip("vertical");
                            posX = newX;
                            break;
                        case 4:
                            this.Flip("horizontal");
                            this.Flip("vertical");
                            posX = newX;
                            posY = newY;
                            break;
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
                        if (room.Inside(i, j)) {
                            room.Cells[i][j] = new WM.Level.Cell(i, j, this.Grid[i - posX][j - posY]);
                        }
                    }
                }
            };
            return RoomSection;
        })();
        Level.RoomSection = RoomSection;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
