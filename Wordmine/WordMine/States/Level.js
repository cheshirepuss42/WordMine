var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (States) {
        var Level = (function (_super) {
            __extends(Level, _super);
            function Level() {
                _super.apply(this, arguments);
            }
            Level.prototype.create = function () {
                wm.Level = this;

                this.world.scale.x = 1.6;
                this.world.scale.y = 1.6;

                this.Lvl = new WM.Level.LvlData(WM.G.LevelWidth, WM.G.LevelHeight);

                this.Room = this.Lvl.Cells[1][1];

                this.Map = this.game.add.tilemap();
                this.Map.addTilesetImage("tiles");

                this.FloorLayer = this.Map.create("floor", WM.G.RoomWidth, WM.G.RoomHeight, WM.G.CellSize, WM.G.CellSize);

                this.EventsLayer = this.Map.createBlankLayer("events", WM.G.RoomWidth, WM.G.RoomHeight, WM.G.CellSize, WM.G.CellSize);
                this.WallsLayer = this.Map.createBlankLayer("walls", WM.G.RoomWidth, WM.G.RoomHeight, WM.G.CellSize, WM.G.CellSize);
                this.UnminedLayer = this.Map.createBlankLayer("unmined", WM.G.RoomWidth, WM.G.RoomHeight, WM.G.CellSize, WM.G.CellSize);

                this.UnminedLayer.alpha = 0.95;

                this.Player = wm.Player;
                this.Player.View = this.add.sprite(0, 0, "player");
                this.Player.View.scale.setTo(0.9, 0.9);
                this.Player.Cell = this.Room.Middle();
                this.Player.Cell.MinedOut = true;

                this.PlayerStats = this.game.add.text(WM.G.MapWidth, 0, "Energy: ", { fill: "#fff", font: "20px" });

                this.DrawRoom();

                this.ButtonDown = this.game.add.existing(new WM.UI.TextButton(this.game, "down", 50, 50, function () {
                    wm.Level.MovePlayer("down");
                }));
                this.ButtonUp = this.game.add.existing(new WM.UI.TextButton(this.game, "up", 50, 50, function () {
                    wm.Level.MovePlayer("up");
                }));
                this.ButtonLeft = this.game.add.existing(new WM.UI.TextButton(this.game, "left", 50, 50, function () {
                    wm.Level.MovePlayer("left");
                }));
                this.ButtonRight = this.game.add.existing(new WM.UI.TextButton(this.game, "right", 50, 50, function () {
                    wm.Level.MovePlayer("right");
                }));
                this.ButtonDown.x = WM.G.MapWidth + 25;
                this.ButtonDown.y = WM.G.MapHeight;
                this.ButtonDown.Show();
                this.ButtonUp.x = WM.G.MapWidth + 25;
                this.ButtonUp.y = WM.G.MapHeight - 100;
                this.ButtonUp.Show();
                this.ButtonLeft.x = WM.G.MapWidth;
                this.ButtonLeft.y = WM.G.MapHeight - 50;
                this.ButtonLeft.Show();
                this.ButtonRight.x = WM.G.MapWidth + 50;
                this.ButtonRight.y = WM.G.MapHeight - 50;
                this.ButtonRight.Show();

                this.Cursors = this.input.keyboard.createCursorKeys();
                this.Cursors.down.onDown.add(function () {
                    wm.Level.MovePlayer("down");
                }, this);
                this.Cursors.up.onDown.add(function () {
                    wm.Level.MovePlayer("up");
                }, this);
                this.Cursors.left.onDown.add(function () {
                    wm.Level.MovePlayer("left");
                }, this);
                this.Cursors.right.onDown.add(function () {
                    wm.Level.MovePlayer("right");
                }, this);

                this.Marker = this.add.graphics(0, 0);
                this.Marker.lineStyle(2, 0xff0000, 1);
                this.Marker.drawRect(0, 0, WM.G.CellSize, WM.G.CellSize);

                this.input.onDown.add(this.ClickTile, this);
            };

            Level.prototype.ClickTile = function (obj, pointer) {
                if (this.Dialog == null) {
                    var px = Math.floor((pointer.layerX / WM.G.CellSize) / this.world.scale.x);
                    var py = Math.floor((pointer.layerY / WM.G.CellSize) / this.world.scale.y);
                    if (this.Room.Inside(py, px)) {
                        console.log(this.Room.Cells[py][px], px, py);
                        this.Marker.position.set(px * WM.G.CellSize, py * WM.G.CellSize);
                    }
                }
            };

            Level.prototype.MovePlayer = function (dir) {
                var target = this.Room.GetNeighbour(dir, this.Player.Cell.RoomX, this.Player.Cell.RoomY);
                if (target != null) {
                    this.Room.MoveToTile(this.Player, target.RoomY, target.RoomX);
                    this.DrawCell(target.RoomX, target.RoomY, this.UnminedLayer);
                    this.DrawCell(target.RoomX, target.RoomY, this.FloorLayer);
                    this.DrawCell(target.RoomX, target.RoomY, this.EventsLayer);
                    this.DrawCell(target.RoomX, target.RoomY, this.WallsLayer);
                }
                this.PlayerStats.setText("Energy: " + this.Player.Energy);
            };

            Level.prototype.ShowDialog = function (event, cell) {
                this.Dialog = new WM.Dialog.Event(this.game, WM.G.events[event], cell);
                this.Dialog.ShowPanel();
            };

            Level.prototype.HandleExit = function (exit) {
                this.Room = exit.TargetRoom;
                this.Player.Cell = exit.EntranceCell();
                this.Player.Cell.MinedOut = true;
                this.DrawRoom();
            };

            Level.prototype.DrawRoom = function () {
                this.DrawLayer(this.FloorLayer);
                this.DrawLayer(this.WallsLayer);
                this.DrawLayer(this.EventsLayer);
                this.DrawLayer(this.UnminedLayer);
            };

            Level.prototype.DrawLayer = function (layer) {
                for (var i = 0; i < this.Room.Height; i++) {
                    for (var j = 0; j < this.Room.Width; j++) {
                        this.DrawCell(i, j, layer);
                    }
                }
            };

            Level.prototype.DrawCell = function (x, y, layer) {
                this.Map.putTile(this.Room.Cells[x][y].GetTileIndex(layer.layer["name"]), y, x, layer);
            };
            Level.prototype.update = function () {
            };
            Level.prototype.render = function () {
            };
            return Level;
        })(Phaser.State);
        States.Level = Level;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
