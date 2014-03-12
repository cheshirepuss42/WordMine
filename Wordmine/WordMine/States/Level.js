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
                _super.call(this);
            }
            Level.prototype.render = function () {
            };

            Level.prototype.create = function () {
                wm.Level = this;

                this.Player = wm.Player;
                this.Lvl = new WM.Level.LvlData(WM.G.LevelWidth, WM.G.LevelHeight);
                this.Room = this.Lvl.Cells[1][1];
                this.Map = this.add.tilemap("map", "tiles");
                this.Map.addTilesetImage("TileA2", "tiles");
                this.FloorLayer = this.Map.createLayer("floor");
                this.EventsLayer = this.Map.createLayer("events");
                this.WallsLayer = this.Map.createLayer("walls");
                this.UnminedLayer = this.Map.createLayer("unmined");
                this.UnminedLayer.alpha = 0.95;
                this.Cursors = this.input.keyboard.createCursorKeys();
                var mapwidth = this.Room.Width * WM.G.CellSize;
                var mapheight = this.Room.Height * WM.G.CellSize;
                this.PlayerStats = this.game.add.text(mapwidth, 0, "Energy: ", { fill: "#fff", font: "20px" });

                var self = this;
                this.Cursors.down.onDown.add(function () {
                    self.MovePlayer("down");
                }, this);
                this.Cursors.up.onDown.add(function () {
                    self.MovePlayer("up");
                }, this);
                this.Cursors.left.onDown.add(function () {
                    self.MovePlayer("left");
                }, this);
                this.Cursors.right.onDown.add(function () {
                    self.MovePlayer("right");
                }, this);

                this.Player.View = this.add.sprite(0, 0, "player");

                this.Player.View.scale.setTo(0.9, 0.9);

                this.Player.Cell = this.Room.Middle();
                this.Player.Cell.MinedOut = true;

                this.Marker = this.add.graphics(0, 0);
                this.Marker.lineStyle(2, 0xff0000, 1);
                this.Marker.drawRect(0, 0, WM.G.CellSize, WM.G.CellSize);
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
                this.ButtonDown.x = mapwidth + 25;
                this.ButtonDown.y = mapheight;
                this.ButtonDown.Show();
                this.ButtonUp.x = mapwidth + 25;
                this.ButtonUp.y = mapheight - 100;
                this.ButtonUp.Show();
                this.ButtonLeft.x = mapwidth;
                this.ButtonLeft.y = mapheight - 50;
                this.ButtonLeft.Show();
                this.ButtonRight.x = mapwidth + 50;
                this.ButtonRight.y = mapheight - 50;
                this.ButtonRight.Show();
                this.input.onDown.add(this.ClickTile, this);
            };
            Level.prototype.ClickTile = function (obj, pointer) {
                if (this.Dialog == null) {
                    var px = Math.floor((pointer.layerX / WM.G.CellSize) / this.world.scale.x);
                    var py = Math.floor((pointer.layerY / WM.G.CellSize) / this.world.scale.y);
                    this.Marker.x = px * WM.G.CellSize;
                    this.Marker.y = py * WM.G.CellSize;
                    console.log(this.Room.Cells[py][px]);
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
                this.PlayerStats.content = "Energy: " + this.Player.Energy;
            };
            Level.prototype.ShowEvent = function (event) {
                this.Dialog = new WM.Dialog.Event(this.game, WM.G.events[event]);
                this.Dialog.ShowPanel();
            };

            Level.prototype.HandleExit = function (exit) {
                this.Room = exit.TargetRoom;
                this.Player.Cell = exit.EntranceCell();
                this.Player.Cell.MinedOut = true;
                this.DrawRoom();
            };
            Level.prototype.Fight = function () {
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
                var index = this.Room.Cells[x][y].GetTileIndex(layer.layer["name"]);
                this.Map.putTile(index, y, x, layer);
            };
            Level.prototype.update = function () {
            };
            return Level;
        })(Phaser.State);
        States.Level = Level;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
