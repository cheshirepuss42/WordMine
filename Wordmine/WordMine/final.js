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
                        console.log("happens?", elems);
                        elems[0] = elems[0].substr(1, elems[0].length - 1); //remove star
                        var call = elems[0].split('.');
                        var mod = elems[1];
                        var am = elems[2];
                        var target = wm[call[0]][call[1]];
                        console.log(target, call[0], call[1]);
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
                        case "fight":
                            f = function () {
                                wm.Level.Fight();
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
var WM;
(function (WM) {
    (function (Dialog) {
        var Event = (function () {
            function Event(game, eventdata, cell) {
                this.Cell = cell;
                this.Panels = new Array();
                for (var i = 0; i < eventdata.panels.length; i++) {
                    var p = new WM.Dialog.EventPanel(game, eventdata.panels[i]);
                    this.Panels.push(p);
                }
            }
            Event.prototype.ShowPanel = function (nr) {
                if (typeof nr === "undefined") { nr = 0; }
                if (this.CurrentPanel == null) {
                    this.CurrentPanel = this.Panels[nr];
                    this.CurrentPanel.Show();
                }
                if (nr == -1) {
                    this.CurrentPanel.Hide();
                    this.Cell.Event = "";
                    wm.Level.Dialog = null;
                    wm.Level.DrawRoom();
                } else if (nr == -2) {
                    this.CurrentPanel.Hide();
                    wm.Level.Dialog = null;
                    wm.Level.DrawRoom();
                } else {
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
                _super.call(this);
            }
            Boot.prototype.render = function () {
            };

            Boot.prototype.create = function () {
                //this.game.stage.scale.startFullScreen(true);
                //this.game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT; //resize your window to see the stage resize too
                //this.game.stage.scale.setShowAll();
                //this.game.stage.scale.refresh();
                this.game.state.start("preload", true, false);
            };

            Boot.prototype.update = function () {
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
                _super.call(this);
            }
            Level.prototype.render = function () {
            };

            Level.prototype.create = function () {
                wm.Level = this;

                //  Creates a blank tilemap
                this.Map = this.game.add.tilemap();

                //  Creates a layer and sets-up the map dimensions.
                //  In this case the map is 30x30 tiles in size and the tiles are 32x32 pixels in size.
                var layer = this.Map.create('level1', 30, 30, 32, 32);

                //  Add a Tileset image to the map
                this.Map.addTilesetImage('tiles');

                //this.world.scale.x = 1.6;
                //this.world.scale.y = 1.6;
                this.Player = wm.Player;
                this.Lvl = new WM.Level.LvlData(WM.G.LevelWidth, WM.G.LevelHeight);
                this.Room = this.Lvl.Cells[1][1];
                this.Map = this.game.add.tilemap();

                //this.Map = this.add.tilemap("map");
                //this.Map.addTilesetImage("TileA2", "tiles");
                this.FloorLayer = this.Map.create("floor", WM.G.RoomWidth, WM.G.RoomHeight, 32, 32);
                this.Map.addTilesetImage("tiles");

                //this.Map.create(, G.RoomWidth, G.RoomHeight, G.CellSize, G.CellSize);
                //this.Map.addTilesetImage("tiles");
                //this.FloorLayer = this.Map.createLayer("floor");
                console.log("hgghhg" + this.FloorLayer.name, "________" + this.FloorLayer.layer["name"]);
                this.EventsLayer = this.Map.createLayer("events");
                this.WallsLayer = this.Map.createLayer("walls");
                this.UnminedLayer = this.Map.createLayer("unmined");
                this.UnminedLayer.alpha = 0.95;
                this.FloorLayer.resizeWorld();
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

                //this.Player.View.anchor.setTo(0, 0);
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
                    this.Marker.world.x = px * WM.G.CellSize;
                    this.Marker.world.y = py * WM.G.CellSize;
                    console.log(this.Room.Cells[py][px]);
                    //this.Room.MoveToTile(this.Player, px, py);
                    //this.DrawCell(py, px, this.UnminedLayer);
                    //this.DrawCell(py, px, this.FloorLayer);
                    //this.DrawCell(py, px, this.EventsLayer);
                    //this.DrawCell(py, px, this.WallsLayer);
                    //this.ShowEvent("first");
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
            Level.prototype.ShowEvent = function (event, cell) {
                this.Dialog = new WM.Dialog.Event(this.game, WM.G.events[event], cell);
                this.Dialog.ShowPanel();
            };

            Level.prototype.HandleExit = function (exit) {
                this.Room = exit.TargetRoom;
                this.Player.Cell = exit.EntranceCell();
                this.Player.Cell.MinedOut = true;
                this.DrawRoom();
            };
            Level.prototype.Fight = function () {
                //initiate combat screen
            };
            Level.prototype.DrawRoom = function () {
                this.DrawLayer(this.FloorLayer);
                this.DrawLayer(this.WallsLayer);
                this.DrawLayer(this.EventsLayer);
                this.DrawLayer(this.UnminedLayer);
                //this.Map.setCollisionBetween(156, 157, true, this.WallsLayer);
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

                //index = (index == null) ? 1 : index;
                console.log(index, x, y, layer.layer["name"]);
                this.Map.putTile(index, y, x, layer);
                console.log(this.Map.getTile(y, x, layer));
            };
            Level.prototype.update = function () {
                //this.game.debug.renderRectangle(this.ButtonDown);
                //this.game.debug.renderSpriteCorners(this.ButtonDown, true, true);
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
                _super.call(this);
            }
            Menu.prototype.render = function () {
                //this.game.debug.renderInputInfo(16, 16);
            };

            Menu.prototype.create = function () {
                this.game.stage.backgroundColor = "337799";
                this.button = this.game.add.existing(new WM.UI.TextButton(this.game, "start game", 300, 100, this.bla));
                this.button.x = (this.game.width / 2) - (this.button.w / 2);
                this.button.y = (this.game.height / 2) - (this.button.h / 2);
                this.button.Show();
            };
            Menu.prototype.bla = function () {
                this.game.state.start("level", true, false);
            };

            Menu.prototype.update = function () {
                //this.game.physics.moveToPointer(this.button,300,this.game.input.activePointer);
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
            //counter: number;
            function Preload() {
                _super.call(this);
            }
            Preload.prototype.preload = function () {
                this.game.load.image('player', '/Wordmine/Assets/player.png');
                this.game.load.tilemap('map', '/Wordmine/Assets/basemap.map', null, Phaser.Tilemap.TILED_JSON);
                this.game.load.image('tiles', "/Wordmine/Assets/t000.png");
            };

            Preload.prototype.create = function () {
                this.game.stage.backgroundColor = '#444448';
                this.preloadBar = new WM.UI.ProgressBar(this.game, 100, 50);

                //this.counter = 0.1;
                //this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
                //this.game.stage.scale.setShowAll();
                //this.game.stage.scale.pageAlignHorizontally = true;
                //this.game.stage.scale.pageAlignVertically = true;
                //this.game.stage.scale.refresh();
                var tween = this.add.tween(this.preloadBar).to({ FilledAmount: 1 }, 1000, Phaser.Easing.Linear.None, true);
                tween.onComplete.add(this.startMainMenu, this);
            };
            Preload.prototype.startMainMenu = function () {
                this.game.state.start("menu", true, false);
            };
            Preload.prototype.render = function () {
                //this.game.debug.renderInputInfo(16, 16);
            };
            Preload.prototype.update = function () {
                //this.counter -= this.game.time.elapsed /1000;
                //this.preloadBar.SetAmount(this.counter);
                //if (this.counter < 0) {
                //    this.preloadBar.destroy(true);
                //}
                //this.game.physics.moveToPointer(this.button,300,this.game.input.activePointer);
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
                //var querystring = window.location.href.split("?")
                //var fromquery = (querystring.length > 1) ? querystring[1] : "";
                //this.MinedOut = (fromquery.indexOf("mined") > -1) ? true : false;
            }
            Cell.prototype.HasEvent = function () {
                return this.Event != "" || this.Creep != null || this.Treasure != null || this.Exit != null;
            };
            Cell.prototype.GetTileIndex = function (layername) {
                var index = null;
                switch (layername) {
                    case "floor":
                        index = 40;
                        break;
                    case "walls":
                        index = (this.Passable) ? null : 92;
                        break;
                    case "events":
                        index = (this.Event == "") ? null : 20;
                        index = (this.Treasure == null) ? null : 10;
                        break;
                    case "unmined":
                        index = (this.MinedOut) ? null : 38;
                        break;
                }
                return index;
            };

            //Enters() {
            //    //here are the real actions taken when a player moves onto a cell
            //    if (!this.MinedOut) {
            //        if (wm.Player.Energy > wm.Player.MiningCost) {
            //            //if not minedout and the player has enough energy, mine it out
            //            this.MinedOut = true;
            //            wm.Player.Energy -= wm.Player.MiningCost;
            //        }
            //    }
            //    else {
            //        if (this.Event != null) {
            //            //if there is a dialog, open it
            //            wm.Level.ShowEvent(this.Event);
            //            //make sure the gridbuttons dont get pressed
            //        }
            //        else if (this.Creep != null) {
            //            //if there is a creep, fight it
            //            wm.Level.Fight();
            //        }
            //    }
            //}
            Cell.prototype.toString = function () {
                return this.TypeChar;
            };
            return Cell;
        })();
        Level.Cell = Cell;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
////-----------------------------------------------------------------------------------------------------------------------------//
//function Cell(x, y, type) {
//    this.PosX = x;
//    this.PosY = y;
//    this.TypeChar = type;
//    this.MinedOut = false;
//    this.Passable = true;
//    this.Player = null;
//    this.Dialog = null;
//    this.Creep = null;
//    this.Exit = null;
//    this.Items = [];
//    this.Init();
//}
//Cell.prototype.CSSClass = function () {
//    if (this.Player != null) {
//        return "player";
//    }
//    if (this.Exit != null) {
//        return "exit";
//    }
//    if (this.MinedOut == true) {
//        if (this.Passable) {
//            if (this.Items.length > 0)
//                return "pickup";
//            if (this.Dialog != null) {
//                return "dialogcell";
//            }
//            if (this.Creep != null) {
//                return "creep";
//            }
//            return "empty";
//        }
//        else
//            return "wall";
//    }
//    return "dark";
//};
//Cell.prototype.Init = function () {
//    switch (this.TypeChar) {
//        case "X": this.Passable = false; break;
//        case "R": this.Items.push(GetRandomItem()); break;
//        case "D": var d = dialogs[Math.floor(dialogs.length * Math.random())]; this.Dialog = new Question(d.id, d.title, d.question, d.image, d.answers); break;
//        case "C": var c = creeps[Math.floor(creeps.length * Math.random())];
//            this.Creep = new Creep(c.health, c.attack, c.defense, c.effects);
//            break;
//    }
//    var querystring = window.location.href.split("?")
//    querystring = (querystring.length > 1) ? querystring[1] : "";
//    this.MinedOut = (querystring.indexOf("mined") > -1) ? true : false;
//};
//Cell.prototype.Html = function () {
//    return "<div class='minecell " + this.CSSClass() + "'>" + this.CSSClass() + "</div> "
//};
////----------------------------------------------------------------------------------------------------------------//
//function PickupItem(name, effects) {
//    this.Name = name;
//    this.Effects = effects;
//    this.Consume = function (player, level) {
//        for (var i = 0; i < this.Effects.length; i++) {
//            this.Effects[i].Apply(player, level);
//        }
//    }
//}
//function GetRandomItem() {
//    var item = items[Math.floor(items.length * Math.random())];
//    var fx = [];
//    for (var i = 0; i < item.effects.length; i++) {
//        fx.push(GetEffect(effects, item.effects[i]));
//    }
//    return new PickupItem(item.name, fx);
//}
////----------------------------------------------------------------------------------------------------------------//
//function Creep(health, attack, defense, effects) {
//    Creature.apply(this, arguments);
//    this.Effects = effects;
//}
//Creep.prototype = new Creature();
//Creep.prototype.Interact = function (player) {
//    var playerdmg = player.Attack - this.Defense;
//    var creepdmg = this.Attack - player.Defense;
//    player.Health -= (creepdmg >= 0) ? creepdmg : 0;
//    this.Health -= (playerdmg >= 0) ? playerdmg : 0;
//}
////----------------------------------------------------------------------------------------------------------------//
//function Creature(health, attack, defense) {
//    this.Health = health;
//    this.Attack = attack;
//    this.Defense = defense;
//}
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
                        this.Cells[i][j].Passable = (i == this.Height - 1 || i == 0 || j == this.Width - 1 || j == 0) ? false : true; //set walls
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
                    //if
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
                                wm.Level.ShowEvent(target.Event, target);
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
var WM;
(function (WM) {
    /// <reference path="../_reference.ts" />
    (function (Level) {
        var LvlData = (function (_super) {
            __extends(LvlData, _super);
            //Current: Room;
            function LvlData(width, height) {
                //console.log("building level");
                _super.call(this, width, height);
                for (var i = 0; i < this.Height; i++) {
                    this.Cells[i] = new Array();
                    for (var j = 0; j < this.Width; j++) {
                        this.Cells[i][j] = new WM.Level.Room(WM.G.RoomWidth, WM.G.RoomHeight, i, j);
                    }
                }
                this.SetExits();
                //console.log("made exits");
            }
            LvlData.prototype.SetExits = function () {
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
var WM;
(function (WM) {
    (function (UI) {
        var FilledRect = (function (_super) {
            __extends(FilledRect, _super);
            function FilledRect(game, width, height, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                _super.call(this, game, width, height);
                this.color = color;
                this.loadTexture(FilledRect.getBMD(game, width, height, color), null);
            }
            FilledRect.getBMD = function (game, width, height, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                var bmd = new Phaser.BitmapData(game, "bla", width, height);
                bmd.context.fillStyle = color; // beginFill(color);
                bmd.context.rect(0, 0, width, height);
                bmd.context.fill();
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
                this.exists = false;
            };
            TextButton.prototype.Show = function () {
                this.exists = true;
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
                this.x = game.width / 4;
                this.y = 100;
                this.padding = 10;
                this.background = this.add(new WM.UI.FilledRect(game, game.width / 2, game.height / 1.5, "#eeeeee"));

                this.options = new Array();

                for (var j = 0; j < panel.options.length; j++) {
                    var option = panel.options[j];
                    console.log(option);
                    if (WM.Dialog.Effect.Happens(option.conditions)) {
                        var effects = function () {
                            for (var i = 0; i < option.effects.length; i++) {
                                WM.Dialog.Effect.Call(option.effects[i])();
                            }
                        };
                        var eopt = new WM.Dialog.EventOption(game, option.text, effects);
                        console.log(eopt);
                        this.add(eopt);
                        eopt.y += 200 + ((this.options.length - 1) * eopt.h);
                        this.options.push(eopt);
                    }
                }
                this.image = panel.img;
                this.text = this.add(new Phaser.Text(game, this.padding, this.padding, panel.text, WM.G.style));

                this.Hide();
            }
            EventPanel.prototype.Show = function () {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].Show();
                }
                this.text.exists = true;
                this.background.exists = true;
            };
            EventPanel.prototype.Hide = function () {
                for (var i = 0; i < this.options.length; i++) {
                    this.options[i].Hide();
                }
                this.text.exists = false;
                this.background.exists = false;
            };
            return EventPanel;
        })(Phaser.Group);
        Dialog.EventPanel = EventPanel;
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
    /// <reference path="../_reference.ts" />
    (function (Dialog) {
        var EventOption = (function (_super) {
            __extends(EventOption, _super);
            function EventOption(game, text, callback, context) {
                _super.call(this, game, text, 400, 70, callback, context, "#ddf");
            }
            return EventOption;
        })(WM.UI.TextButton);
        Dialog.EventOption = EventOption;
    })(WM.Dialog || (WM.Dialog = {}));
    var Dialog = WM.Dialog;
})(WM || (WM = {}));
var WM;
(function (WM) {
    var G = (function () {
        function G() {
        }
        G.CellSize = 32;
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
                    "X.ttt.",
                    "XXXXXX"]
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
            _super.call(this, 1024, 672, Phaser.CANVAS, "wordmine");
            this.Player = new WM.Player.Player();
            this.Player.name = "zzzzzzzzzzzzz";
            this.state.add("boot", WM.States.Boot);
            this.state.add("preload", WM.States.Preload);
            this.state.add("menu", WM.States.Menu);
            this.state.add("level", WM.States.Level);
            this.state.add("combat", WM.States.Combat);
            this.state.start("boot");
            //hhjhghj
        }
        return Main;
    })(Phaser.Game);
    WM.Main = Main;
})(WM || (WM = {}));
var wm;

window.onload = function () {
    wm = new WM.Main();
};
//function getContextFromString(str: string) {
//    var elems = str.split('.');
//    elems.pop();
//    return getFunctionFromString(elems.join('.'));
//}
//function getFunctionFromString(str: string) {
//    var scope = window;
//    var scopeSplit = str.split('.');
//    for (var i = 0; i < scopeSplit.length - 1; i++) {
//        scope = scope[scopeSplit[i]];
//        if (scope == undefined) return;
//    }
//    return scope[scopeSplit[scopeSplit.length - 1]];
//}
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
                console.log(player.Energy);
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
        var TextSpark = (function () {
            function TextSpark(txt, px, py, color) {
                if (typeof color === "undefined") { color = "#fff"; }
                this.Text = wm.Level.game.add.text(px + (WM.G.CellSize / 2), py + (WM.G.CellSize / 2), txt, { fill: color });
                this.Text.anchor.set(0.5, 0.5);

                //var game.add.tween(this.Text);
                //this.Text.style.fill = color;
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
