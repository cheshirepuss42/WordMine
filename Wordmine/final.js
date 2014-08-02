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
        Object.defineProperty(G, "UIWidth", {
            get: function () {
                return this.GameWidth - this.MapWidth;
            },
            enumerable: true,
            configurable: true
        });
        Object.defineProperty(G, "UIHeight", {
            get: function () {
                return this.MapHeight;
            },
            enumerable: true,
            configurable: true
        });
        G.assets = ['t000.png'];
        G.layerTypes = ['floor', 'wall', 'event', 'unmined'];
        G.CellSize = 32;
        G.GameWidth = 800;
        G.GameHeight = 480;
        G.RoomWidth = 15;
        G.RoomHeight = 11;
        G.LevelWidth = 5;
        G.LevelHeight = 5;
        G.CombatLetterWidth = 40;
        G.CombatLetterHeight = 40;

        G.style = { font: "16px Arial" };

        G.RoomSections = [
            {
                "type": "fourth",
                "grid": [
                    "XXX.XX",
                    "X..te.",
                    "X..XXX",
                    "X..Xcc"]
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
        G.creeps = {
            "normal": {
                attack: 10,
                defense: 10,
                name: "",
                descr: ""
            }
        };
        G.events = {
            "first": {
                panels: [
                    {
                        text: "You meet a lonely traveler.\n His boots seem different than the rest of his clothes.",
                        img: "fdgfg",
                        options: [
                            { text: "Kill him for his boots", conditions: ["*player.Health > 5"], effects: ["*player.Health / 2", 1] }
                        ]
                    },
                    {
                        text: "You kill the traveler in a particulary brutal way.",
                        img: "fdgfg",
                        options: [
                            { text: "Get the boots.", conditions: ["*player.Health > 5"], effects: ["*player.Health - 2", -1] },
                            { text: "Eat the corpse. Then get the boots.", conditions: ["*player.Health > 1"], effects: ["*player.Health + 5", -1] }
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
var WM;
(function (WM) {
    var Main = (function () {
        function Main() {
            WM.G.CellSize = WM.G.GameHeight / WM.G.RoomHeight;
            setTimeout(function () {
                window.scrollTo(0, 1);
            }, 10);
            this.mapView = $("#map");
            this.popupView = $("#popup");
            this.sidebar = new WM.UI.SideBar();
            this.popupView.css("width", WM.G.MapWidth + "px");
            this.popupView.css("height", WM.G.MapHeight + "px");

            this.preload(WM.G.assets);
            this.popup = null;
        }
        Main.prototype.setPlayerPosition = function () {
        };
        Main.prototype.preload = function (images) {
            var loadedImages = 0;
            var totalImages = images.length;
            for (var i = 0; i < totalImages; i++) {
                var tempImage = new Image();
                var self = this;
                tempImage.addEventListener("load", function () {
                    loadedImages++;
                    if (loadedImages == totalImages) {
                        self.startGame();
                    }
                }, true);
                tempImage.src = '/img/' + images[i];
            }
        };
        Main.prototype.startGame = function () {
            console.log("images loaded, starting game");
            console.log(WM.G.creeps);
            this.currentLevel = new WM.Level.LvlData(WM.G.LevelWidth, WM.G.LevelHeight);
            this.currentRoom = this.currentLevel.Cells[1][1];
            this.player = new WM.Level.Player();
            this.player.Cell = this.currentRoom.Middle();
            this.player.Cell.MinedOut = 1;

            this.drawRoom();
            this.setupKeys();
        };
        Main.prototype.drawRoom = function () {
            this.mapView.empty();
            for (var i = 0; i < this.currentRoom.Width; i++) {
                for (var j = 0; j < this.currentRoom.Height; j++) {
                    this.currentRoom.Cells[j][i].draw();
                }
            }
            this.player.draw();
            this.sidebar.update();
        };

        Main.prototype.makeMapElement = function (x, y, index, layer, id, opacity) {
            if (typeof id === "undefined") { id = null; }
            if (typeof opacity === "undefined") { opacity = null; }
            var iX = (index % 16) * WM.G.CellSize;
            var iY = Math.floor(index / 16) * WM.G.CellSize;
            var idTag = "";
            var style = "";
            if (id != null) {
                idTag = "id='" + id + "'";
            }
            if (opacity != null) {
                style += "opacity:" + opacity + ";";
            }

            style += "z-index:" + layer + ";";
            style += "top:" + (x * WM.G.CellSize) + "px;";
            style += "left:" + (y * WM.G.CellSize) + "px;";
            style += "width:" + WM.G.CellSize + "px;";
            style += "height:" + WM.G.CellSize + "px;";
            style += "background-size:" + 1600 + "%;", style += "background-position: -" + iX + "px -" + iY + "px;";
            return "<div class='cell' " + idTag + " style='" + style + "'></div>";
        };

        Main.prototype.setupKeys = function () {
            var self = this;
            document.addEventListener('keydown', function (event) {
                switch (event.keyCode) {
                    case 37:
                        self.handleInput("left");
                        break;
                    case 38:
                        self.handleInput("up");
                        break;
                    case 39:
                        self.handleInput("right");
                        break;
                    case 40:
                        self.handleInput("down");
                        break;
                }
            });
        };
        Main.prototype.handleInput = function (dir) {
            if (this.popup == null) {
                var target = this.currentRoom.GetNeighbour(dir, this.player.Cell.RoomX, this.player.Cell.RoomY);
                if (target != null) {
                    this.currentRoom.MoveToTile(this.player, target.RoomY, target.RoomX);
                }
            } else {
                this.popup.HandleInput(dir);
            }
            this.sidebar.update();
        };
        Main.prototype.toCombat = function (creepData) {
        };
        Main.prototype.handleExit = function (exit) {
            this.currentRoom = exit.TargetRoom;
            this.player.Cell = exit.EntranceCell();
            this.player.Cell.MinedOut = 1;
            this.drawRoom();
        };
        return Main;
    })();
    WM.Main = Main;
})(WM || (WM = {}));
var wm;
window.onload = function () {
    console.log("initializing");
    wm = new WM.Main();
};
var WM;
(function (WM) {
    (function (UI) {
        var Label = (function () {
            function Label(text, cssclass) {
                if (typeof cssclass === "undefined") { cssclass = null; }
                var cl = (cssclass == null) ? "" : "class='" + cssclass + "'";
                this.view = $("<div " + cl + ">" + text + "</div>");
            }
            return Label;
        })();
        UI.Label = Label;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        var Button = (function () {
            function Button(text, onclick, cssclass) {
                if (typeof cssclass === "undefined") { cssclass = null; }
                var cl = (cssclass == null) ? "" : "class='" + cssclass + "'";
                var content = "<button " + cl + ">" + text + "</button>";
                this.view = $(content);
                this.view.click(onclick);
            }
            return Button;
        })();
        UI.Button = Button;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        (function (_Popup) {
            var Popup = (function () {
                function Popup(x, y, w, h, onClose, onCloseContext) {
                    if (typeof onClose === "undefined") { onClose = null; }
                    if (typeof onCloseContext === "undefined") { onCloseContext = null; }
                    this.OnClose = onClose;
                    this.OnCloseContext = onCloseContext;
                    this.x = x;
                    this.y = y;
                    this.width = w;
                    this.height = h;
                    this.view = wm.popupView;
                    this.view.hide();
                }
                Popup.prototype.Open = function () {
                    this.view.show();
                    wm.popup = this;
                };

                Popup.prototype.Close = function () {
                    this.view.empty();
                    this.view.hide();
                    if (this.OnClose != null)
                        this.OnClose.call(this.OnCloseContext);
                    wm.popup = null;
                };
                Popup.prototype.HandleInput = function (input) {
                };
                return Popup;
            })();
            _Popup.Popup = Popup;
        })(UI.Popup || (UI.Popup = {}));
        var Popup = UI.Popup;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var __extends = this.__extends || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    __.prototype = b.prototype;
    d.prototype = new __();
};
var WM;
(function (WM) {
    (function (UI) {
        (function (Popup) {
            var DialogPanel = (function (_super) {
                __extends(DialogPanel, _super);
                function DialogPanel(panel) {
                    _super.call(this, 0, 0, WM.G.MapWidth, WM.G.MapHeight);

                    this.padding = 10;
                    this.Options = new Array();
                    for (var j = 0; j < panel.options.length; j++) {
                        var option = panel.options[j];
                        if (WM.Event.Effect.Happens(option.conditions)) {
                            this.BuildOption(option);
                        }
                    }
                    this.image = panel.img;
                    this.text = panel.text;
                    this.SelectedOption = 0;
                }
                DialogPanel.prototype.BuildOption = function (option) {
                    var self = this;
                    var effects = function () {
                        for (var i = 0; i < option.effects.length; i++) {
                            WM.Event.Effect.Call(option.effects[i])();
                        }
                        self.Close();
                    };
                    var eopt = new UI.DialogOption(option.text, WM.G.MapWidth, 70, effects);
                    eopt.y += 200 + ((this.Options.length - 1) * eopt.h);
                    this.Options.push(eopt);

                    return eopt;
                };

                DialogPanel.prototype.HandleInput = function (dir) {
                    if (dir == "down") {
                        this.SelectedOption++;
                        this.SelectedOption = (this.SelectedOption > this.Options.length - 1) ? 0 : this.SelectedOption;
                    } else if (dir == "up") {
                        this.SelectedOption--;
                        this.SelectedOption = (this.SelectedOption < 0) ? this.Options.length - 1 : this.SelectedOption;
                    } else
                        this.Options[this.SelectedOption].onClick();
                };
                return DialogPanel;
            })(Popup.Popup);
            Popup.DialogPanel = DialogPanel;
        })(UI.Popup || (UI.Popup = {}));
        var Popup = UI.Popup;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        (function (Popup) {
            var MessagePopup = (function (_super) {
                __extends(MessagePopup, _super);
                function MessagePopup(message, img, onClose, onCloseContext) {
                    if (typeof img === "undefined") { img = null; }
                    if (typeof onClose === "undefined") { onClose = null; }
                    if (typeof onCloseContext === "undefined") { onCloseContext = null; }
                    _super.call(this, 0, 0, WM.G.MapWidth, WM.G.MapHeight, onClose, onCloseContext);
                    this.Padding = 10;
                    this.Image = img;
                    this.Message = message;
                }
                MessagePopup.prototype.Open = function () {
                    _super.prototype.Open.call(this);
                    var text = new UI.Label(this.Message, "popup_text");
                    var self = this;
                    var closeButton = new UI.Button("close", function () {
                        console.log("click close");
                        self.Close();
                    });
                    this.view.append(text.view);
                    this.view.append(closeButton.view);
                };

                MessagePopup.prototype.HandleInput = function (dir) {
                    this.Close();
                };
                return MessagePopup;
            })(Popup.Popup);
            Popup.MessagePopup = MessagePopup;
        })(UI.Popup || (UI.Popup = {}));
        var Popup = UI.Popup;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        var TextButton = (function () {
            function TextButton(text, width, height, callback, context, color) {
                if (typeof width === "undefined") { width = 100; }
                if (typeof height === "undefined") { height = 50; }
                if (typeof color === "undefined") { color = "#eee"; }
                this.onClick = callback;
                this.w = width;
                this.h = height;
                this.text = text;
                this.Hide();
            }
            TextButton.prototype.Hide = function () {
            };
            TextButton.prototype.Show = function () {
            };
            return TextButton;
        })();
        UI.TextButton = TextButton;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (UI) {
        var DialogOption = (function (_super) {
            __extends(DialogOption, _super);
            function DialogOption(text, width, height, callback, context) {
                _super.call(this, text, width, height, callback, context, "#ddf");
            }
            return DialogOption;
        })(UI.TextButton);
        UI.DialogOption = DialogOption;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Event) {
        var RoomEvent = (function () {
            function RoomEvent(type) {
                this.Type = type;
            }
            RoomEvent.prototype.Handle = function () {
            };
            RoomEvent.prototype.Resolve = function (clearEvent) {
                if (clearEvent) {
                    wm.targetCell.Event = null;
                    wm.player.Cell = wm.targetCell;
                }
            };
            return RoomEvent;
        })();
        Event.RoomEvent = RoomEvent;
    })(WM.Event || (WM.Event = {}));
    var Event = WM.Event;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Event) {
        var Treasure = (function (_super) {
            __extends(Treasure, _super);
            function Treasure(level) {
                _super.call(this, "treasure");
                this.Resources = 50 + (Math.floor(Math.random() * 50));
                this.Resources *= level;
            }
            Treasure.prototype.Handle = function () {
                var self = this;
                var effects = function () {
                    wm.player.Energy += self.Resources;
                    self.Resolve(true);
                };
                console.log("handling treasure");
                var msg = "You found " + this.Resources + " resources.";
                var popup = new WM.UI.Popup.MessagePopup(msg, "", effects);
                popup.Open();
            };
            return Treasure;
        })(Event.RoomEvent);
        Event.Treasure = Treasure;
        var Item = (function () {
            function Item() {
            }
            return Item;
        })();
        Event.Item = Item;
    })(WM.Event || (WM.Event = {}));
    var Event = WM.Event;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Event) {
        var Creep = (function (_super) {
            __extends(Creep, _super);
            function Creep(name) {
                _super.call(this, "creep");
                this.Data = new CreepData(WM.G.creeps[name]);
                this.ResultPanel = new WM.UI.Popup.MessagePopup("result", null, this.Resolve, this);
                this.InfoPanel = new WM.UI.Popup.MessagePopup("blaaa", null, this.ResultPanel.Open, this.ResultPanel);
            }
            Creep.prototype.Handle = function () {
                this.InfoPanel.Open();
            };
            Creep.prototype.Resolve = function () {
                _super.prototype.Resolve.call(this, true);
                wm.toCombat(this.Data);
            };
            return Creep;
        })(Event.RoomEvent);
        Event.Creep = Creep;
        var CreepData = (function () {
            function CreepData(data) {
                this.Name = data['name'];
                this.Description = data['descr'];
                this.Image = data['img'];
                this.Attack = data['a'];
                this.Defense = data['d'];
                this.Health = data['h'];
                this.Reward = new Event.Treasure(data['reward']);
            }
            return CreepData;
        })();
        Event.CreepData = CreepData;
    })(WM.Event || (WM.Event = {}));
    var Event = WM.Event;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Event) {
        var Dialog = (function (_super) {
            __extends(Dialog, _super);
            function Dialog(event) {
                _super.call(this, "dialog");
                this.EventData = WM.G.events[event];
                this.Panels = new Array();
                this.CurrentPanel = 0;
                for (var i = 0; i < this.EventData.panels.length; i++) {
                    this.Panels.push(new WM.UI.Popup.DialogPanel(this.EventData.panels[i]));
                }
            }
            Dialog.prototype.Handle = function () {
                this.ShowPanel();
            };
            Dialog.prototype.ShowPanel = function (nr) {
                if (typeof nr === "undefined") { nr = 0; }
                if (nr < 0) {
                    if (nr == -2) {
                        this.Panels[this.CurrentPanel].Close();
                        this.Resolve(false);
                    }
                    if (nr == -1) {
                        this.Panels[this.CurrentPanel].Close();
                        this.Resolve(true);
                    }
                } else {
                    if (nr > 0)
                        this.Panels[this.CurrentPanel].Close();
                    this.Panels[nr].Open();
                    this.CurrentPanel = nr;
                }
            };
            return Dialog;
        })(Event.RoomEvent);
        Event.Dialog = Dialog;
    })(WM.Event || (WM.Event = {}));
    var Event = WM.Event;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Event) {
        var Effect = (function () {
            function Effect() {
            }
            Effect.Happens = function (strs) {
                for (var i = 0; i < strs.length; i++) {
                    var result = false;
                    var elems = strs[i].split(' ');
                    if (elems[0] == "has") {
                        result = wm.player.Has(elems[1]);
                    } else {
                        elems[0] = elems[0].substr(1, elems[0].length - 1);
                        var call = elems[0].split('.');
                        var mod = elems[1];
                        var am = elems[2];
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
                        var event = wm.targetCell.Event;
                        event.ShowPanel(+str);
                    };
                } else {
                    var elems = str.split(' ');
                    var call = elems[0];
                    switch (call) {
                        case "add":
                            f = function () {
                                wm.player.AddItem(elems[1]);
                            };
                            break;
                        case "lose":
                            f = function () {
                                wm.player.LoseItem(elems[1]);
                            };
                            break;
                    }

                    var mod = elems[1];
                    var am = elems[2];
                    if (call.indexOf("*") < 0) {
                        f = function () {
                            wm[call](am);
                        };
                    } else {
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
        Event.Effect = Effect;
    })(WM.Event || (WM.Event = {}));
    var Event = WM.Event;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Level) {
        var RoomSectionsHandler = (function () {
            function RoomSectionsHandler(room) {
                this.SectionsFilled = [false, false, false, false];
                this.Room = room;
                this.Sections = new Array();
                for (var i = 0; i < WM.G.RoomSections.length; i++) {
                    this.Sections.push(new RoomSection(WM.G.RoomSections[i].type, WM.G.RoomSections[i].grid));
                }
            }
            RoomSectionsHandler.prototype.RoomFilled = function () {
                return this.SectionsFilled[0] && this.SectionsFilled[1] && this.SectionsFilled[2] && this.SectionsFilled[3];
            };
            RoomSectionsHandler.prototype.FillRoom = function () {
                while (!this.RoomFilled()) {
                    var sectionindex = Math.floor(Math.random() * this.Sections.length);
                    var quadrant = Math.floor(Math.random() * 4);
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

            RoomSectionsHandler.prototype.ApplyToRoom = function (sectionindex, quadrant) {
                var section = new RoomSection(this.Sections[sectionindex].Type, this.Sections[sectionindex].Grid.slice());
                var posX = 1;
                var posY = 1;
                var newX = Math.floor((WM.G.RoomHeight / 2) + 1);
                var newY = Math.floor((WM.G.RoomWidth / 2) + 1);
                this.SectionsFilled[quadrant] = true;

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
                        if (Math.random() > 0.5)
                            section.Flip("horizontal");
                        posX = newX;
                    } else {
                        this.SectionsFilled[0] = this.SectionsFilled[1] = true;
                    }
                }
                if (section.Type == "vertical") {
                    if (quadrant == 1 || quadrant == 3) {
                        this.SectionsFilled[1] = this.SectionsFilled[3] = true;
                        section.Flip("horizontal");
                        if (Math.random() > 0.5)
                            section.Flip("vertical");
                        posY = newY;
                    } else {
                        this.SectionsFilled[0] = this.SectionsFilled[2] = true;
                    }
                }

                var cellBuilder = new Level.CellBuilder();
                for (var i = posX; i < posX + section.Grid.length; i++) {
                    for (var j = posY; j < posY + section.Grid[0].length; j++) {
                        if (this.Room.Inside(i, j)) {
                            this.Room.Cells[i][j] = cellBuilder.Build(i, j, section.Grid[i - posX][j - posY]);
                        }
                    }
                }
            };
            return RoomSectionsHandler;
        })();
        Level.RoomSectionsHandler = RoomSectionsHandler;

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
            return RoomSection;
        })();
        Level.RoomSection = RoomSection;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Level) {
        var Cell = (function () {
            function Cell(roomx, roomy, typechar) {
                this.RoomX = roomx;
                this.RoomY = roomy;
                this.TypeChar = typechar;
                this.Passable = true;
                this.MinedOut = 0;
                this.Event = null;
                this.Exit = null;
            }
            Cell.prototype.getView = function (layer) {
                var id = "c_" + this.RoomX + "_" + this.RoomY + "_" + layer;
                if ($("#" + id).length) {
                    $("#" + id).remove();
                }
                var index = this.GetTileIndex(WM.G.layerTypes[layer]);
                var opacity = (WM.G.layerTypes[layer] != "unmined" || this.MinedOut == 0) ? null : this.MinedOut;
                return $(wm.makeMapElement(this.RoomX, this.RoomY, index, layer, id, opacity));
            };
            Cell.prototype.draw = function () {
                for (var i = 0; i < WM.G.layerTypes.length; i++) {
                    wm.mapView.append(this.getView(i));
                }
            };

            Cell.prototype.UnminedByQuery = function () {
                var querystring = window.location.href.split("?");
                var fromquery = (querystring.length > 1) ? querystring[1] : "";
                return (fromquery.indexOf("mined") > -1) ? true : false;
            };

            Cell.prototype.HasEvent = function () {
                return this.Exit != null;
            };

            Cell.prototype.GetTileIndex = function (layername) {
                var index = 0;
                switch (layername) {
                    case "floor":
                        index = 39;
                        break;
                    case "wall":
                        index = (this.Passable) ? index : 91;
                        break;
                    case "event":
                        if (this.Event != null) {
                            if (this.Event.Type == "dialog")
                                index = 25;
                            if (this.Event.Type == "treasure")
                                index = 9;
                            if (this.Event.Type == "creep")
                                index = 8;
                            break;
                        }
                        break;
                    case "unmined":
                        index = (this.MinedOut == 1) ? index : 37;
                        break;
                }
                return index;
            };
            Cell.prototype.layerView = function (layer) {
                return $("#c_" + this.RoomX + "_" + this.RoomY + "_" + layer);
            };
            Cell.prototype.toString = function () {
                return this.TypeChar;
            };
            return Cell;
        })();
        Level.Cell = Cell;

        var CellBuilder = (function () {
            function CellBuilder() {
                this.tileCharGroups = { empty: ".", creep: "cC", wall: "xX", treasure: "tT", dialog: "dD" };
            }
            CellBuilder.prototype.Build = function (xpos, ypos, tileChar) {
                var cell = new Level.Cell(xpos, ypos, tileChar);
                var group = this.groupName(tileChar);
                switch (tileChar) {
                    case "X":
                        cell.Passable = false;
                        break;
                    case "t":
                        cell.Event = new WM.Event.Treasure(1);
                        break;
                    case "e":
                        cell.Event = new WM.Event.Dialog("first");
                        break;
                    case "c":
                        cell.Event = new WM.Event.Creep("normal");
                        break;
                }

                return cell;
            };
            CellBuilder.prototype.groupName = function (char) {
                for (var k in this.tileCharGroups) {
                    if (this.tileCharGroups[k].indexOf(char) != -1) {
                        return k;
                    }
                }
                return "empty";
            };
            return CellBuilder;
        })();
        Level.CellBuilder = CellBuilder;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Level) {
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
        Level.Grid = Grid;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Level) {
        var LvlData = (function (_super) {
            __extends(LvlData, _super);
            function LvlData(width, height) {
                _super.call(this, width, height);

                for (var i = 0; i < this.Height; i++) {
                    this.Cells[i] = new Array();
                    for (var j = 0; j < this.Width; j++) {
                        this.Cells[i][j] = new Level.Room(WM.G.RoomWidth, WM.G.RoomHeight, i, j);
                    }
                }

                this.SetExits();
            }
            LvlData.prototype.SetExits = function () {
                for (var i = 0; i < this.Height; i++) {
                    for (var j = 0; j < this.Width; j++) {
                        var here = this.Cells[i][j];

                        var above = (this.Inside(i, j - 1)) ? this.Cells[i][j - 1] : null;
                        var below = (this.Inside(i, j + 1)) ? this.Cells[i][j + 1] : null;
                        var left = (this.Inside(i - 1, j)) ? this.Cells[i - 1][j] : null;
                        var right = (this.Inside(i + 1, j)) ? this.Cells[i + 1][j] : null;

                        if (above != null) {
                            this.Cells[i][j].AddExit(new Level.RoomExit(above, "top"));
                        }
                        if (below != null) {
                            this.Cells[i][j].AddExit(new Level.RoomExit(below, "bottom"));
                        }
                        if (left != null) {
                            this.Cells[i][j].AddExit(new Level.RoomExit(left, "left"));
                        }
                        if (right != null) {
                            this.Cells[i][j].AddExit(new Level.RoomExit(right, "right"));
                        }
                    }
                }
            };
            return LvlData;
        })(Level.Grid);
        Level.LvlData = LvlData;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
var WM;
(function (WM) {
    (function (Level) {
        var Player = (function () {
            function Player() {
                this.Health = this.MaxHealth = 100;
                this.Energy = this.MaxEnergy = 250;
            }
            Object.defineProperty(Player.prototype, "Cell", {
                get: function () {
                    return this._Cell;
                },
                set: function (h) {
                    this._Cell = h;
                    h.draw();
                    var dirs = ["up", "right", "down", "left"];
                    for (var i = 0; i < dirs.length; i++) {
                        var cell = wm.currentRoom.GetNeighbour(dirs[i], h.RoomX, h.RoomY);
                        if (cell != null && cell.MinedOut == 0) {
                            cell.MinedOut = 0.5;
                            cell.draw();
                        }
                    }
                    this.draw();
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Player.prototype, "Energy", {
                get: function () {
                    return this._Energy;
                },
                set: function (nrg) {
                    if (nrg < 0) {
                        this.Health += Math.floor(nrg / 10);
                        nrg = 0;
                    }
                    this._Energy = (nrg < this.MaxEnergy) ? nrg : this.MaxEnergy;
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

            Player.prototype.getView = function () {
                return $(wm.makeMapElement(this.Cell.RoomX, this.Cell.RoomY, 1, WM.G.layerTypes.length + 1, "player"));
            };
            Player.prototype.draw = function () {
                $("#player").remove();
                wm.mapView.append(this.getView());
            };
            Player.prototype.getViewIndex = function () {
                return 1;
            };
            Player.prototype.Has = function (item) {
                return true;
            };
            Player.prototype.AddItem = function (item) {
            };
            Player.prototype.LoseItem = function (item) {
            };
            Player.prototype.Move = function (dir) {
            };
            return Player;
        })();
        Level.Player = Player;
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

                this.PosX = x;
                this.PosY = y;

                this.Exits = new Array();

                for (var i = 0; i < this.Height; i++) {
                    this.Cells[i] = new Array(this.Width);
                    for (var j = 0; j < this.Width; j++) {
                        this.Cells[i][j] = new Level.Cell(i, j, ".");

                        this.Cells[i][j].Passable = (i == this.Height - 1 || i == 0 || j == this.Width - 1 || j == 0) ? false : true;
                    }
                }

                var handler = new Level.RoomSectionsHandler(this);
                handler.FillRoom();
            }
            Room.prototype.CellReachable = function (player, x, y) {
                var px = player.Cell.RoomX;
                var py = player.Cell.RoomY;
                return this.Cells[x][y].MinedOut == 1 || (px + 1 == x && py == y) || (px - 1 == x && py == y) || (px == x && py + 1 == y) || (px == x && py - 1 == y);
            };

            Room.prototype.MoveToTile = function (player, x, y) {
                if (this.Inside(y, x)) {
                    var target = this.Cells[y][x];
                    wm.targetCell = target;

                    if (target.MinedOut == 1) {
                        if (target.Event != null) {
                            target.Event.Handle();
                        } else if (target.Exit != null) {
                            wm.handleExit(target.Exit);
                        } else {
                            if (target.Passable) {
                                player.Cell = target;
                            }
                        }
                    } else {
                        target.MinedOut = 1;
                        player.Energy -= 10;
                        target.draw();
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
        })(Level.Grid);
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
var WM;
(function (WM) {
    (function (UI) {
        var SideBar = (function () {
            function SideBar() {
                this.view = $("#ui");
                this.view.css("left", (WM.G.MapWidth + 1) + "px");
                this.view.css("top", "0px");
                this.view.css("width", WM.G.UIWidth + "px");
                this.view.css("height", WM.G.UIHeight + "px");
                this.stats = $("<div id='stats'></div>");
                this.view.append(this.stats);
                this.setupControls();
            }
            SideBar.prototype.setupControls = function () {
                this.controls = $("<div id='controls'></div>");
                this.controls.append(new UI.Button("up", function () {
                    wm.handleInput("up");
                }).view);
                this.controls.append(new UI.Button("down", function () {
                    wm.handleInput("down");
                }).view);
                this.controls.append(new UI.Button("left", function () {
                    wm.handleInput("left");
                }).view);
                this.controls.append(new UI.Button("right", function () {
                    wm.handleInput("right");
                }).view);
                this.view.append(this.controls);
            };
            SideBar.prototype.update = function () {
                this.stats.empty();
                this.stats.append(new UI.Label("Energy:" + wm.player.Energy + "/" + wm.player.MaxEnergy).view);
                this.stats.append(new UI.Label("Health:" + wm.player.Health + "/" + wm.player.MaxHealth).view);
            };
            return SideBar;
        })();
        UI.SideBar = SideBar;
    })(WM.UI || (WM.UI = {}));
    var UI = WM.UI;
})(WM || (WM = {}));
