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
                console.log("placing:", section, "in", quadrant);
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
