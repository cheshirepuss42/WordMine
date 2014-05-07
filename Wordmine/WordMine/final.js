var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (States) {
        var Boot = (function (_super) {
            __extends(Boot, _super);
            function Boot() {
                _super.apply(this, arguments);
            }
            Boot.prototype.create = function () {
                this.game.stage.backgroundColor = '#444448';
                this.game.state.start("preload", true, false);
            };
            return Boot;
        })(Phaser.State);
        States.Boot = Boot;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (States) {
        var Combat = (function (_super) {
            __extends(Combat, _super);
            function Combat() {
                _super.call(this);
            }
            Combat.prototype.render = function () {
                //this.game.debug.renderInputInfo(16, 16);
            };

            Combat.prototype.create = function () {
            };

            Combat.prototype.update = function () {
                //this.game.physics.moveToPointer(this.button,300,this.game.input.activePointer);
            };
            return Combat;
        })(Phaser.State);
        States.Combat = Combat;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
var WM;
(function (WM) {
    /// <reference path="../_reference.ts" />
    (function (States) {
        var Level = (function (_super) {
            __extends(Level, _super);
            function Level() {
                _super.apply(this, arguments);
            }
            Level.prototype.create = function () {
                //making this globally accessible, which makes handling some callbacks easier, might turn out to be a very bad idea
                wm.Level = this;

                //scaling the whole thing up, needs fixing
                //this.world.scale.x = 1.6;
                //this.world.scale.y = 1.6;
                //build entire level
                this.Lvl = new WM.Level.LvlData(WM.G.LevelWidth, WM.G.LevelHeight);

                //currentroom is in the middle of 3x3
                this.Room = this.Lvl.Cells[1][1];

                //make tilemap and add tilesheet
                this.Map = this.game.add.tilemap();
                this.Map.addTilesetImage("tiles");

                //make floorlayer with tilemap.create
                this.FloorLayer = this.Map.create("floor", WM.G.RoomWidth, WM.G.RoomHeight, WM.G.CellSize, WM.G.CellSize);

                //make rest of layers with tilemap.createblanklayer
                this.EventsLayer = this.Map.createBlankLayer("events", WM.G.RoomWidth, WM.G.RoomHeight, WM.G.CellSize, WM.G.CellSize);
                this.WallsLayer = this.Map.createBlankLayer("walls", WM.G.RoomWidth, WM.G.RoomHeight, WM.G.CellSize, WM.G.CellSize);
                this.UnminedLayer = this.Map.createBlankLayer("unmined", WM.G.RoomWidth, WM.G.RoomHeight, WM.G.CellSize, WM.G.CellSize);

                //show a little of what is under the unminedlayer for debugging
                this.UnminedLayer.alpha = 0.50;

                //make the player, his view and his position
                this.Player = wm.Player;
                this.Player.View = this.add.sprite(0, 0, "player");
                this.Player.View.scale.setTo(0.9, 0.9);
                this.Player.Cell = this.Room.Middle();
                this.Player.Cell.MinedOut = true;

                //make the stats in the right, where more ui will come
                this.PlayerStats = this.game.add.text(WM.G.MapWidth, 0, "Energy: ", { fill: "#fff", font: "20px" });

                //draw the room
                this.DrawRoom();

                //setup the buttons to allow player movement without keyboard
                this.ButtonDown = this.game.add.existing(new WM.UI.TextButton(this.game, "down", 50, 50, function () {
                    wm.Level.HandleInput("down");
                }));
                this.ButtonUp = this.game.add.existing(new WM.UI.TextButton(this.game, "up", 50, 50, function () {
                    wm.Level.HandleInput("up");
                }));
                this.ButtonLeft = this.game.add.existing(new WM.UI.TextButton(this.game, "left", 50, 50, function () {
                    wm.Level.HandleInput("left");
                }));
                this.ButtonRight = this.game.add.existing(new WM.UI.TextButton(this.game, "right", 50, 50, function () {
                    wm.Level.HandleInput("right");
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

                //setup the keys allowing for player movement
                this.Cursors = this.input.keyboard.createCursorKeys();
                this.Cursors.down.onDown.add(function () {
                    wm.Level.HandleInput("down");
                }, this);
                this.Cursors.up.onDown.add(function () {
                    wm.Level.HandleInput("up");
                }, this);
                this.Cursors.left.onDown.add(function () {
                    wm.Level.HandleInput("left");
                }, this);
                this.Cursors.right.onDown.add(function () {
                    wm.Level.HandleInput("right");
                }, this);

                //set the marker that indicates the tile last clicked
                this.Marker = this.add.graphics(0, 0);
                this.Marker.lineStyle(2, 0xff0000, 1);
                this.Marker.drawRect(0, 0, WM.G.CellSize, WM.G.CellSize);

                //added a handler for clicking the tile
                this.input.onDown.add(this.ClickTile, this);
            };

            //handles a click on a tile, only if there is no dialog running
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

            //handles player interaction with tile in given direction. likely moves the player there too. updates the view of the entered cell
            Level.prototype.HandleInput = function (dir) {
                if (this.Dialog == null) {
                    var target = this.Room.GetNeighbour(dir, this.Player.Cell.RoomX, this.Player.Cell.RoomY);
                    if (target != null) {
                        this.Room.MoveToTile(this.Player, target.RoomY, target.RoomX);
                        this.DrawCell(target.RoomX, target.RoomY, this.UnminedLayer);
                        this.DrawCell(target.RoomX, target.RoomY, this.FloorLayer);
                        this.DrawCell(target.RoomX, target.RoomY, this.EventsLayer);
                        this.DrawCell(target.RoomX, target.RoomY, this.WallsLayer);
                    }
                    this.PlayerStats.setText("Energy: " + this.Player.Energy);
                } else {
                    this.Dialog.CurrentPanel.HandleInput(dir);
                }
            };

            //show the dialog of the given event
            Level.prototype.ShowDialog = function (event, cell) {
                this.Dialog = new WM.Dialog.Event(this.game, WM.G.events[event], cell);
                this.Dialog.ShowPanel();
            };

            //moves player to entrance in new room corresponding to exit
            Level.prototype.HandleExit = function (exit) {
                this.Room = exit.TargetRoom;
                this.Player.Cell = exit.EntranceCell();
                this.Player.Cell.MinedOut = true;
                this.DrawRoom();
            };

            //draw all layers of current room
            Level.prototype.DrawRoom = function () {
                this.DrawLayer(this.FloorLayer);
                this.DrawLayer(this.WallsLayer);
                this.DrawLayer(this.EventsLayer);
                this.DrawLayer(this.UnminedLayer);
            };

            //draws each cell of a layer
            Level.prototype.DrawLayer = function (layer) {
                for (var i = 0; i < this.Room.Height; i++) {
                    for (var j = 0; j < this.Room.Width; j++) {
                        this.DrawCell(i, j, layer);
                    }
                }
            };

            //draws a cell in a layer, gets tilesheet-index for layer from Cell.gettileindex based on the layername
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
var WM;
(function (WM) {
    (function (States) {
        var Menu = (function (_super) {
            __extends(Menu, _super);
            function Menu() {
                _super.apply(this, arguments);
            }
            Menu.prototype.create = function () {
                //show a button that starts the game when pressed
                this.button = this.game.add.existing(new WM.UI.TextButton(this.game, "start game", 300, 100, this.Start));
                this.button.x = (this.game.width / 2) - (this.button.w / 2);
                this.button.y = (this.game.height / 2) - (this.button.h / 2);
                this.button.Show();
            };
            Menu.prototype.Start = function () {
                this.game.state.start("level", true, false);
            };
            return Menu;
        })(Phaser.State);
        States.Menu = Menu;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (States) {
        var Preload = (function (_super) {
            __extends(Preload, _super);
            function Preload() {
                _super.apply(this, arguments);
            }
            Preload.prototype.preload = function () {
                //load the assets
                this.game.load.image('player', '/Wordmine/Assets/player.png');
                this.game.load.image('tiles', "/Wordmine/Assets/t000.png");
            };
            Preload.prototype.create = function () {
                //show a progressbar filling for 1 sec,then go to menu. bit useless for now
                this.preloadBar = new WM.UI.ProgressBar(this.game, 100, 50);
                var tween = this.add.tween(this.preloadBar).to({ FilledAmount: 1 }, 1000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startMainMenu, this);
            };
            Preload.prototype.startMainMenu = function () {
                this.game.state.start("menu", true, false);
            };
            return Preload;
        })(Phaser.State);
        States.Preload = Preload;
    })(WM.States || (WM.States = {}));
    var States = WM.States;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Util) {
        var Grid = (function () {
            function Grid(w, h) {
                this.Width = w;
                this.Height = h;
                this.Cells = new Array();
            }
            Grid.prototype.Set = function (x, y, content) {
                this.Cells[x][y] = content;
            };
            Grid.prototype.Get = function (x, y) {
                return this.Cells[x][y];
            };
            Grid.prototype.Inside = function (x, y) {
                return x >= 0 && x < this.Height && y >= 0 && y < this.Width;
            };
            Grid.prototype.AsString = function () {
                var str = "";
                for (var i = 0; i < this.Height; i++) {
                    for (var j = 0; j < this.Width; j++) {
                        str += this.Cells[i][j].toString();
                    }
                    str += "\n";
                }
                return str;
            };
            Grid.prototype.Dump = function () {
                console.log(this.AsString());
            };
            Grid.prototype.GetNeighbour = function (dir, x, y) {
                var nx = x, ny = y;
                switch (dir) {
                    case "up":
                        nx--;
                        break;
                    case "down":
                        nx++;
                        break;
                    case "left":
                        ny--;
                        break;
                    case "right":
                        ny++;
                        break;
                }
                if (this.Inside(nx, ny))
                    return this.Cells[nx][ny];
                else
                    return null;
            };
            Grid.prototype.Middle = function () {
                return this.Cells[Math.floor((this.Height - 1) / 2)][Math.floor((this.Width - 1) / 2)];
            };
            Grid.prototype.Flip = function (horizontal) {
                if (horizontal) {
                    for (var i = 0; i < this.Height; i++) {
                        for (var j = 0; j < this.Width / 2; j++) {
                            var target = j + ((this.Width - 1) - (j * 2));
                            var temp = this.Cells[j][i];
                            this.Cells[j][i] = this.Cells[target][i];
                            this.Cells[target][i] = temp;
                        }
                    }
                } else {
                    for (var i = 0; i < this.Width; i++) {
                        for (var j = 0; j < this.Height / 2; j++) {
                            var target = j + ((this.Height - 1) - (j * 2));
                            var temp = this.Cells[i][j];
                            this.Cells[i][j] = this.Cells[i][target];
                            this.Cells[i][target] = temp;
                        }
                    }
                }
            };
            return Grid;
        })();
        Util.Grid = Grid;
    })(WM.Util || (WM.Util = {}));
    var Util = WM.Util;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Level) {
        //this contains all the data for the cell, but none of the drawing routines. The drawing is done in the room
        var Cell = (function () {
            function Cell(roomx, roomy, typechar) {
                this.RoomX = roomx;
                this.RoomY = roomy;
                this.TypeChar = typechar;
                this.Passable = true;
                this.MinedOut = false;
                this.Event = "";
                this.Creep = null;
                this.Treasure = null;
                this.Exit = null;

                switch (this.TypeChar) {
                    case "X":
                        this.Passable = false;
                        break;
                    case "t":
                        this.Treasure = new WM.Treasure.Treasure(1);
                        break;
                    case "e":
                        this.Event = "first";
                }
            }
            //see if the url indicates whether to show the unminedlayer
            Cell.prototype.UnminedByQuery = function () {
                var querystring = window.location.href.split("?");
                var fromquery = (querystring.length > 1) ? querystring[1] : "";
                return (fromquery.indexOf("mined") > -1) ? true : false;
            };

            //has a some property which causes an event
            Cell.prototype.HasEvent = function () {
                return this.Event != "" || this.Creep != null || this.Treasure != null || this.Exit != null;
            };

            //get the tilesheetindex for the given layer
            Cell.prototype.GetTileIndex = function (layername) {
                var index = 0;
                switch (layername) {
                    case "floor":
                        index = 39;
                        break;
                    case "walls":
                        index = (this.Passable) ? index : 91;
                        break;
                    case "events":
                        if (this.Event != "") {
                            index = 25;
                        } else if (this.Treasure != null) {
                            index = 9;
                        }
                        break;
                    case "unmined":
                        index = (this.MinedOut) ? index : 37;
                        break;
                }
                return index;
            };
            Cell.prototype.toString = function () {
                return this.TypeChar;
            };
            return Cell;
        })();
        Level.Cell = Cell;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Level) {
        var Room = (function (_super) {
            __extends(Room, _super);
            function Room(width, height, x, y, roomdata) {
                _super.call(this, width, height);

                //set position in lvlgrid
                this.PosX = x;
                this.PosY = y;

                //exits are filled and applied later at lvldata
                this.Exits = new Array();

                for (var i = 0; i < this.Height; i++) {
                    this.Cells[i] = new Array(this.Width);
                    for (var j = 0; j < this.Width; j++) {
                        this.Cells[i][j] = new WM.Level.Cell(i, j, ".");

                        //set surrounding walls, exits are set in lvldata
                        this.Cells[i][j].Passable = (i == this.Height - 1 || i == 0 || j == this.Width - 1 || j == 0) ? false : true;
                    }
                }

                //applying random roomsections as defined in g.roomsections, needs 1x2 and 2x1 sections
                //keep track of which sections are filled
                console.log("new room");
                var handler = new WM.Level.RoomSectionsHandler(this);
                handler.FillRoom();
            }
            //can the player reach the minedout cell
            Room.prototype.CellReachable = function (player, x, y) {
                var px = player.Cell.RoomX;
                var py = player.Cell.RoomY;
                return this.Cells[x][y].MinedOut || (px + 1 == x && py == y) || (px - 1 == x && py == y) || (px == x && py + 1 == y) || (px == x && py - 1 == y);
            };

            //handle interaction between player and tile
            Room.prototype.MoveToTile = function (player, x, y) {
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
                                new WM.UI.TextSpark("+" + target.Treasure.Resources + " energy", player.View.x, player.View.y);
                                target.Treasure = null;
                            }

                            //if there is a dialog, show it
                            //console.log(target.Event);
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

            //add the exit and make the cell an exit
            Room.prototype.AddExit = function (exit) {
                this.Exits.push(exit);
                var cell = this.GetExitCell(exit.ExitType);
                cell.Exit = exit;
                cell.Passable = true;
            };

            //find the cell based on the type of exit
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

        //class for the exits, with the target and the type
        var RoomExit = (function () {
            function RoomExit(target, type) {
                this.TargetRoom = target;
                this.ExitType = type;
            }
            //find the cell where the player comes out when using the exit
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
var WM;
(function (WM) {
    /// <reference path="../_reference.ts" />
    (function (Level) {
        var LvlData = (function (_super) {
            __extends(LvlData, _super);
            function LvlData(width, height) {
                _super.call(this, width, height);

                for (var i = 0; i < this.Height; i++) {
                    this.Cells[i] = new Array();
                    for (var j = 0; j < this.Width; j++) {
                        this.Cells[i][j] = new WM.Level.Room(WM.G.RoomWidth, WM.G.RoomHeight, i, j);
                    }
                }

                //apply the exits in the rooms
                this.SetExits();
            }
            LvlData.prototype.SetExits = function () {
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
                            this.Cells[i][j].AddExit(new WM.Level.RoomExit(above, "top"));
                        }
                        if (below != null) {
                            this.Cells[i][j].AddExit(new WM.Level.RoomExit(below, "bottom"));
                        }
                        if (left != null) {
                            this.Cells[i][j].AddExit(new WM.Level.RoomExit(left, "left"));
                        }
                        if (right != null) {
                            this.Cells[i][j].AddExit(new WM.Level.RoomExit(right, "right"));
                        }
                    }
                }
            };
            return LvlData;
        })(WM.Util.Grid);
        Level.LvlData = LvlData;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        var FilledRect = (function (_super) {
            __extends(FilledRect, _super);
            function FilledRect(game, width, height, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                _super.call(this, game, width, height, FilledRect.getBMD(game, width, height, color));
                this.color = color;

                //this.loadTexture(, null);
                this.visible = true;
                this.exists = true;
                //this.
            }
            FilledRect.getBMD = function (game, width, height, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                var bmd = new Phaser.BitmapData(game, "", width, height);
                bmd.ctx.beginPath();
                bmd.ctx.rect(0, 0, width, height);
                bmd.ctx.fillStyle = color;
                bmd.ctx.fill();
                return bmd;
            };
            return FilledRect;
        })(Phaser.Sprite);
        UI.FilledRect = FilledRect;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        var ProgressBar = (function (_super) {
            __extends(ProgressBar, _super);
            function ProgressBar(game, width, height) {
                if (typeof width === "undefined") { width = 100; }
                if (typeof height === "undefined") { height = 50; }
                _super.call(this, game, null, "progressbar");
                this._filled = 0;
                this.padding = 5;
                this.dpadding = this.padding * 2;
                this.background = this.add(new WM.UI.FilledRect(game, width, height));
                this.bar = this.add(new WM.UI.FilledRect(game, width - this.dpadding, height - this.dpadding, "#000"));
                this.bar.x += this.padding * 3;
                this.bar.y += this.padding * 3;
                this.width = width;
                this.height = height;
            }
            Object.defineProperty(ProgressBar.prototype, "FilledAmount", {
                get: function () {
                    return this._filled;
                },
                set: function (percent) {
                    this._filled = percent;
                    this.SetAmount(percent);
                },
                enumerable: true,
                configurable: true
            });

            ProgressBar.prototype.SetAmount = function (percent) {
                if (percent >= 0 && percent <= 1) {
                    var w = (this.background.width - this.dpadding) * percent;
                    this.bar.width = w;
                }
            };
            return ProgressBar;
        })(Phaser.Group);
        UI.ProgressBar = ProgressBar;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        var TextButton = (function (_super) {
            __extends(TextButton, _super);
            function TextButton(game, text, width, height, callback, context, color) {
                if (typeof width === "undefined") { width = 100; }
                if (typeof height === "undefined") { height = 50; }
                if (typeof color === "undefined") { color = "#eee"; }
                _super.call(this, game, null, "button");
                this.callback = callback;
                this.w = width;
                this.h = height;
                this.button = this.add(new Phaser.Button(this.game, 0, 0, "", callback, context));
                this.button.loadTexture(WM.UI.FilledRect.getBMD(this.game, this.w, this.h, color), 0);
                this.text = this.add(new Phaser.Text(this.game, 0, 0, text, WM.G.style));
                this.text.anchor.set(0.5, 0.5);
                this.text.x = this.button.width / 2;
                this.text.y = this.button.height / 2;
                this.Hide();
            }
            TextButton.prototype.Hide = function () {
                this.exists = this.visible = false;
            };
            TextButton.prototype.Show = function () {
                this.exists = this.visible = true;
            };
            return TextButton;
        })(Phaser.Group);
        UI.TextButton = TextButton;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
/// <reference path="../_reference.ts" />
var WM;
(function (WM) {
    (function (_Letter) {
        var Letter = (function (_super) {
            __extends(Letter, _super);
            function Letter(game, text, callback) {
                _super.call(this, game, text, 100, 100, callback);
                this.name = "letter";
            }
            return Letter;
        })(WM.UI.TextButton);
        _Letter.Letter = Letter;
    })(WM.Letter || (WM.Letter = {}));
    var Letter = WM.Letter;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (_Player) {
        var Player = (function () {
            function Player() {
                this.Health = 100;
                this.Energy = 250;
            }
            Object.defineProperty(Player.prototype, "Cell", {
                get: function () {
                    return this._Cell;
                },
                set: function (h) {
                    this._Cell = h;
                    this.View.y = h.RoomX * WM.G.CellSize;
                    this.View.x = h.RoomY * WM.G.CellSize;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Player.prototype, "Health", {
                get: function () {
                    return this._health;
                },
                set: function (h) {
                    this._health = h;
                },
                enumerable: true,
                configurable: true
            });

            Player.prototype.Has = function (item) {
                return true;
            };
            Player.prototype.AddItem = function (item) {
            };
            Player.prototype.LoseItem = function (item) {
            };
            Player.prototype.Move = function (dir) {
                //handle moving
            };
            return Player;
        })();
        _Player.Player = Player;
    })(WM.Player || (WM.Player = {}));
    var Player = WM.Player;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Dialog) {
        var EventPanel = (function (_super) {
            __extends(EventPanel, _super);
            function EventPanel(game, panel) {
                _super.call(this, game, null, "panel", false);
                this.padding = 10;
                this.background = this.add(new Phaser.Image(game, 0, 0, WM.UI.FilledRect.getBMD(game, WM.G.MapWidth, WM.G.MapHeight, "#eee"), null));
                this.options = new Array();
                for (var j = 0; j < panel.options.length; j++) {
                    var option = panel.options[j];
                    if (WM.Dialog.Effect.Happens(option.conditions)) {
                        var effects = function () {
                            for (var i = 0; i < option.effects.length; i++) {
                                WM.Dialog.Effect.Call(option.effects[i])();
                            }
                        };
                        var eopt = new WM.Dialog.EventOption(game, option.text, WM.G.MapWidth, 70, effects);
                        this.add(eopt);
                        eopt.y += 200 + ((this.options.length - 1) * eopt.h);
                        this.options.push(eopt);
                    }
                }
                this.image = panel.img;
                this.text = this.add(new Phaser.Text(game, this.padding, this.padding, panel.text, WM.G.style));
                this.SelectedOption = 0;
                this.Hide();
            }
            EventPanel.prototype.HandleInput = function (dir) {
                this.options[this.SelectedOption].button.tint = 0xeeeeee;
                if (dir == "down") {
                    this.SelectedOption++;
                    this.SelectedOption = (this.SelectedOption > this.options.length - 1) ? 0 : this.SelectedOption;
                } else if (dir == "up") {
                    this.SelectedOption--;
                    this.SelectedOption = (this.SelectedOption < 0) ? this.options.length - 1 : this.SelectedOption;
                } else
                    this.options[this.SelectedOption].callback();
                this.options[this.SelectedOption].button.tint = 0xaaaaee;
            };
            EventPanel.prototype.Show = function () {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].Show();
                }
                this.text.exists = this.text.visible = true;
                this.background.exists = this.background.visible = true;
                this.visible = this.exists = true;
            };
            EventPanel.prototype.Hide = function () {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].Hide();
                }
                this.text.exists = this.text.visible = false;
                this.background.exists = this.background.visible = false;
                this.visible = this.exists = false;
            };
            return EventPanel;
        })(Phaser.Group);
        Dialog.EventPanel = EventPanel;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
var WM;
(function (WM) {
    /// <reference path="../_reference.ts" />
    (function (Dialog) {
        var EventOption = (function (_super) {
            __extends(EventOption, _super);
            function EventOption(game, text, width, height, callback, context) {
                _super.call(this, game, text, width, height, callback, context, "#ddf");
            }
            return EventOption;
        })(WM.UI.TextButton);
        Dialog.EventOption = EventOption;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Dialog) {
        var Event = (function () {
            function Event(game, eventdata, cell) {
                this.Cell = cell;
                this.Panels = new Array();
                this.CurrentPanel = null;
                for (var i = 0; i < eventdata.panels.length; i++) {
                    this.Panels.push(game.add.existing(new WM.Dialog.EventPanel(game, eventdata.panels[i])));
                }
            }
            Event.prototype.ShowPanel = function (nr) {
                if (typeof nr === "undefined") { nr = 0; }
                console.log("nr", nr, this);
                if (this.CurrentPanel == null) {
                    console.log("--first");
                    this.CurrentPanel = this.Panels[nr];
                    this.CurrentPanel.Show();
                } else if (nr == -1) {
                    console.log("--gone");
                    this.CurrentPanel.Hide();
                    this.Cell.Event = "";
                    wm.Level.Dialog = null;
                    wm.Level.DrawRoom();
                } else if (nr == -2) {
                    console.log("--stay");
                    this.CurrentPanel.Hide();
                    wm.Level.Dialog = null;
                    wm.Level.DrawRoom();
                } else {
                    console.log("--next");
                    this.CurrentPanel.Hide(); //close panel and show next
                    this.CurrentPanel = this.Panels[nr];
                    this.CurrentPanel.Show();
                }
            };
            return Event;
        })();
        Dialog.Event = Event;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Dialog) {
        var Effect = (function () {
            function Effect() {
            }
            Effect.Happens = function (strs) {
                for (var i = 0; i < strs.length; i++) {
                    var result = false;
                    var elems = strs[i].split(' ');
                    if (elems[0] == "has") {
                        result = wm.Player.Has(elems[1]);
                    } else {
                        elems[0] = elems[0].substr(1, elems[0].length - 1); //remove star
                        var call = elems[0].split('.');
                        var mod = elems[1];
                        var am = elems[2];
                        var target = wm[call[0]][call[1]];
                        switch (mod) {
                            case "true":
                                result = target == true;
                                break;
                            case "false":
                                result = target == false;
                                break;
                            case "=":
                                result = am == target;
                                break;
                            case ">":
                                result = am < target;
                                break;
                            case "<":
                                result = am > target;
                                break;
                        }
                    }
                    if (!result)
                        return false;
                }
                return true;
            };
            Effect.Call = function (str) {
                var f;
                if (!isNaN(parseFloat(str))) {
                    f = function () {
                        wm.Level.Dialog.ShowPanel(+str);
                    };
                } else {
                    var elems = str.split(' ');
                    var call = elems[0];
                    switch (call) {
                        case "add":
                            f = function () {
                                wm.Player.AddItem(elems[1]);
                            };
                            break;
                        case "lose":
                            f = function () {
                                wm.Player.LoseItem(elems[1]);
                            };
                            break;
                    }

                    var mod = elems[1];
                    var am = elems[2];
                    if (call.indexOf("*") < 0) {
                        //special function
                        f = function () {
                            wm[call](am);
                        };
                    } else {
                        //
                        call = call.replace("*", "");
                        var elems = call.split('.');
                        var context = wm[elems[0]];
                        f = function () {
                            switch (mod) {
                                case "+":
                                    context[elems[1]] += +am;
                                    break;
                                case "-":
                                    context[elems[1]] -= +am;
                                    break;
                                case "*":
                                    context[elems[1]] *= +am;
                                    break;
                                case "/":
                                    context[elems[1]] /= +am;
                                    break;
                                case "=":
                                    context[elems[1]] = +am;
                                    break;
                            }
                        };
                    }
                }
                return f;
            };
            return Effect;
        })();
        Dialog.Effect = Effect;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
/// <reference path="states/boot.ts" />
/// <reference path="states/combat.ts" />
/// <reference path="states/level.ts" />
/// <reference path="states/menu.ts" />
/// <reference path="states/preload.ts" />
/// <reference path="util/grid.ts" />
/// <reference path="level/cell.ts" />
/// <reference path="level/room.ts" />
/// <reference path="level/lvldata.ts" />
/// <reference path="ui/filledrect.ts" />
/// <reference path="ui/progressbar.ts" />
/// <reference path="ui/textbutton.ts" />
/// <reference path="letter/letter.ts" />
/// <reference path="player/player.ts" />
/// <reference path="letter/letter.ts" />
/// <reference path="dialog/eventpanel.ts" />
/// <reference path="dialog/eventoption.ts" />
/// <reference path="dialog/event.ts" />
/// <reference path="dialog/effect.ts" />
var WM;
(function (WM) {
    (function (_Combat) {
        var Combat = (function () {
            function Combat() {
            }
            return Combat;
        })();
        _Combat.Combat = Combat;
    })(WM.Combat || (WM.Combat = {}));
    var Combat = WM.Combat;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (_Creep) {
        var Creep = (function () {
            function Creep() {
            }
            return Creep;
        })();
        _Creep.Creep = Creep;
    })(WM.Creep || (WM.Creep = {}));
    var Creep = WM.Creep;
})(WM || (WM = {}));
var WM;
(function (WM) {
    var G = (function () {
        function G() {
        }
        Object.defineProperty(G, "MapWidth", {
            get: function () {
                return this.CellSize * this.RoomWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(G, "MapHeight", {
            get: function () {
                return this.CellSize * this.RoomHeight;
            },
            enumerable: true,
            configurable: true
        });
        G.CellSize = 32;
        G.GameWidth = 1024;
        G.GameHeight = 672;
        G.RoomWidth = 15;
        G.RoomHeight = 11;
        G.LevelWidth = 3;
        G.LevelHeight = 3;

        G.style = { font: "16px Arial" };

        G.RoomSections = [
            {
                "type": "fourth",
                "grid": [
                    "XXX.XX",
                    "X.....",
                    "X..XXX",
                    "X..Xtt"]
            },
            {
                "type": "fourth",
                "grid": [
                    ".....X",
                    "ttt..X",
                    ".....X",
                    "X.XXXX"]
            },
            {
                "type": "fourth",
                "grid": [
                    "XXX...",
                    "XX....",
                    ".X..tt",
                    ".X...."]
            },
            {
                "type": "fourth",
                "grid": [
                    "X..XXX",
                    ".X.tt.",
                    "..X.X.",
                    "....X."]
            },
            {
                "type": "fourth",
                "grid": [
                    "XXXXXX",
                    "XXX.X.",
                    "XX.tt.",
                    "XXXXXX"]
            },
            {
                "type": "fourth",
                "grid": [
                    "X..XXX",
                    ".X..tt",
                    "..X.X.",
                    "....X."]
            },
            {
                "type": "fourth",
                "grid": [
                    ".tt...",
                    "...X..",
                    "...X..",
                    "..tt.."]
            },
            {
                "type": "fourth",
                "grid": [
                    "XXXXXX",
                    "X...X.",
                    "X.ttte",
                    "XXXXXX"]
            },
            {
                "type": "fourth",
                "grid": [
                    "tX.t.X",
                    "eX.X.X",
                    ".X.X.X",
                    "...X.."]
            },
            {
                "type": "vertical",
                "grid": [
                    ".....X",
                    "XX....",
                    ".....X",
                    "XX..X.",
                    ".....X",
                    ".....X",
                    "XX..X.",
                    "...X..",
                    "XX.XXX"]
            },
            {
                "type": "horizontal",
                "grid": [
                    ".............",
                    ".XXXXXXXX.X..",
                    ".X...........",
                    "XX.XXXXXXXXXX"]
            }
        ];
        G.events = {
            "first": {
                panels: [
                    {
                        text: "You meet a lonely traveler.\n His boots seem different than the rest of his clothes.",
                        img: "fdgfg",
                        options: [
                            { text: "Kill him for his boots", conditions: ["*Player.Health > 5"], effects: ["*Player.Health / 2", 1] }
                        ]
                    },
                    {
                        text: "You kill the traveler in a particulary brutal way.",
                        img: "fdgfg",
                        options: [
                            { text: "Get the boots.", conditions: ["*Player.Health > 5"], effects: ["*Player.Health - 2", -1] },
                            { text: "Eat the corpse. Then get the boots.", conditions: ["*Player.Health > 1"], effects: ["*Player.Health + 5", -1] }
                        ]
                    }
                ]
            },
            "second": {
                panels: [
                    {
                        text: "The beast before you grumbles. \nIt's getting ready to fight.",
                        img: "fdgfg",
                        options: [
                            { text: "Try to calm it with your BeastCharm", conditions: ["has BeastCharm"], effects: ["lose BeastCharm", 1] },
                            { text: "Fight.", conditions: [], effects: ["fight", -1] }
                        ]
                    },
                    {
                        text: "The beast is charmed.\nIt hugs you and crushes the charm.\nThen it runs away.",
                        img: "fdgfg",
                        options: [
                            { text: "Ok.", conditions: [], effects: [-1] }
                        ]
                    }
                ]
            }
        };
        return G;
    })();
    WM.G = G;
})(WM || (WM = {}));
/*/// <reference path="_reference.ts"/>*/
var WM;
(function (WM) {
    var Main = (function (_super) {
        __extends(Main, _super);
        function Main() {
            _super.call(this, WM.G.GameWidth, WM.G.GameHeight, Phaser.CANVAS, "wordmine");
            this.Player = new WM.Player.Player();
            this.state.add("boot", WM.States.Boot);
            this.state.add("preload", WM.States.Preload);
            this.state.add("menu", WM.States.Menu);
            this.state.add("level", WM.States.Level);
            this.state.add("combat", WM.States.Combat);
            this.state.start("boot");
        }
        return Main;
    })(Phaser.Game);
    WM.Main = Main;
})(WM || (WM = {}));
var wm;
window.onload = function () {
    wm = new WM.Main();
};
var WM;
(function (WM) {
    (function (Level) {
        var RoomSectionsHandler = (function () {
            function RoomSectionsHandler(room) {
                this.Locations = [[[0, 1], [0, 2]], [[0, 1], [1, 3]], [[2, 3], [0, 2]], [[2, 3], [1, 3]]];
                this.SectionsFilled = [false, false, false, false];
                this.Room = room;
                this.Sections = new Array();
                for (var i = 0; i < WM.G.RoomSections.length; i++) {
                    this.Sections.push(new RoomSection(WM.G.RoomSections[i].type, WM.G.RoomSections[i].grid));
                }
            }
            //FillRoom() {
            //    for (var k = 0; k < 4; k++) {
            //        var nr = Math.floor(Math.random() * G.RoomSections.length);
            //        var section = new RoomSection(G.RoomSections[nr].type, G.RoomSections[nr].grid);
            //        if (this.CanBePlaced(section,k)) {
            //            this.ApplyToRoom(section, k);
            //            console.log(this.SectionsFilled);
            //        }
            //        else {
            //            if (!this.RoomFilled()) {
            //                k--;
            //            }
            //        }
            //    }
            //}
            //RoomFilled(): boolean {
            //    return this.SectionsFilled[0] == this.SectionsFilled[1] == this.SectionsFilled[2] == this.SectionsFilled[3] == true;
            //}
            //CanBePlaced(section: RoomSection, quadrant: number): boolean {
            //    if (section.Type == "fourth") {
            //        return this.SectionsFilled[quadrant];
            //    }
            //    else {
            //        var type = section.Type == "horizontal" ? 0 : 1;
            //        var locations = this.Locations[quadrant][type];
            //        return !this.SectionsFilled[locations[0]] && !this.SectionsFilled[locations[1]];
            //    }
            //}
            RoomSectionsHandler.prototype.RoomFilled = function () {
                return this.SectionsFilled[0] && this.SectionsFilled[1] && this.SectionsFilled[2] && this.SectionsFilled[3];
            };
            RoomSectionsHandler.prototype.FillRoom = function () {
                while (!this.RoomFilled()) {
                    var sectionindex = Math.floor(Math.random() * this.Sections.length);
                    var quadrant = Math.floor(Math.random() * 4);

                    //console.log(sectionindex, quadrant, this.SectionsFilled);
                    if (this.SectionFitsInRoom(sectionindex, quadrant)) {
                        this.ApplyToRoom(sectionindex, quadrant);
                    }
                }
            };
            RoomSectionsHandler.prototype.SectionFitsInRoom = function (sectionindex, quadr) {
                var section = this.Sections[sectionindex];
                if (section.Type == "fourth") {
                    return !this.SectionsFilled[quadr];
                }
                if (section.Type == "vertical") {
                    if (quadr == 0 || quadr == 2) {
                        return !this.SectionsFilled[0] && !this.SectionsFilled[2];
                    } else {
                        return !this.SectionsFilled[1] && !this.SectionsFilled[3];
                    }
                }
                if (section.Type == "horizontal") {
                    if (quadr == 0 || quadr == 1) {
                        return !this.SectionsFilled[0] && !this.SectionsFilled[1];
                    } else {
                        return !this.SectionsFilled[2] && !this.SectionsFilled[3];
                    }
                }
                return false;
            };

            //paste this section intto the room in the given quadrant
            RoomSectionsHandler.prototype.ApplyToRoom = function (sectionindex, quadrant) {
                var section = new RoomSection(this.Sections[sectionindex].Type, this.Sections[sectionindex].Grid.slice());
                console.log("placing:", section, "in", quadrant);
                var posX = 1;
                var posY = 1;
                var newX = Math.floor((WM.G.RoomHeight / 2) + 1);
                var newY = Math.floor((WM.G.RoomWidth / 2) + 1);
                this.SectionsFilled[quadrant] = true;

                //if the grid is a fourth of the total, flip it so it will be mirrored to the right quadrant
                if (section.Type == "fourth") {
                    switch (quadrant) {
                        case 1:
                            section.Flip("horizontal");
                            posY = newY;
                            break;
                        case 2:
                            section.Flip("vertical");
                            posX = newX;
                            break;
                        case 3:
                            section.Flip("horizontal");
                            section.Flip("vertical");
                            posX = newX;
                            posY = newY;
                            break;
                    }
                }
                if (section.Type == "horizontal") {
                    if (quadrant == 2 || quadrant == 3) {
                        this.SectionsFilled[2] = this.SectionsFilled[3] = true;
                        section.Flip("vertical");
                        posX = newX;
                    } else {
                        this.SectionsFilled[0] = this.SectionsFilled[1] = true;
                    }
                }
                if (section.Type == "vertical") {
                    if (quadrant == 1 || quadrant == 3) {
                        this.SectionsFilled[1] = this.SectionsFilled[3] = true;
                        section.Flip("horizontal");
                        posY = newY;
                    } else {
                        this.SectionsFilled[0] = this.SectionsFilled[2] = true;
                    }
                }

                for (var i = posX; i < posX + section.Grid.length; i++) {
                    for (var j = posY; j < posY + section.Grid[0].length; j++) {
                        if (this.Room.Inside(i, j)) {
                            this.Room.Cells[i][j] = new WM.Level.Cell(i, j, section.Grid[i - posX][j - posY]);
                        }
                    }
                }
            };
            return RoomSectionsHandler;
        })();
        Level.RoomSectionsHandler = RoomSectionsHandler;

        //class that describes a roomsection used for procedural generation,
        //now still a fourth, which can be flipped to fit in any quadrant
        //based on stringarrays in G.roomsections
        var RoomSection = (function () {
            function RoomSection(type, grid) {
                this.Type = type;

                //copy the grid from the data from G, so we can manipulate it
                this.Grid = grid.slice();
            }
            RoomSection.prototype.Dump = function () {
                console.log(this.Grid.join("\n"));
            };

            //flips the section so it can be mirrored in the different quadrant
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
            return RoomSection;
        })();
        Level.RoomSection = RoomSection;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Treasure) {
        var Item = (function () {
            function Item() {
            }
            return Item;
        })();
        Treasure.Item = Item;
    })(WM.Treasure || (WM.Treasure = {}));
    var Treasure = WM.Treasure;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (_Treasure) {
        var Treasure = (function () {
            function Treasure(level) {
                this.Resources = 50 + (Math.floor(Math.random() * 50));
                this.Resources *= level;
            }
            Treasure.prototype.Handle = function (player) {
                player.Energy += this.Resources;
            };
            return Treasure;
        })();
        _Treasure.Treasure = Treasure;
    })(WM.Treasure || (WM.Treasure = {}));
    var Treasure = WM.Treasure;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        //this shows a tet popup and fade away at a location
        var TextSpark = (function () {
            function TextSpark(txt, px, py, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                this.Text = wm.Level.game.add.text(px + (WM.G.CellSize / 2), py + (WM.G.CellSize / 2), txt, { fill: color });
                this.Text.anchor.set(0.5, 0.5);
                wm.Level.game.add.tween(this.Text).to({ y: py - 100, alpha: 0 }, 2000, Phaser.Easing.Cubic.Out, true).onComplete.add(this.Destroy, this);
            }
            TextSpark.prototype.Destroy = function () {
                this.Text.destroy();
            };
            return TextSpark;
        })();
        UI.TextSpark = TextSpark;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
