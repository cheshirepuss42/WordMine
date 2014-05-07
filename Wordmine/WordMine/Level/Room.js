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

                console.log("new room");
                var handler = new WM.Level.RoomSectionsHandler(this);
                handler.FillRoom();
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
                                wm.Level.ShowDialog(target.Event, target);
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
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
