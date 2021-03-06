﻿module WM.Level {
    export class RoomSectionsHandler {
        Sections: Array<RoomSection>;
        Room: Room;
        SectionsFilled: Array<boolean>;

        constructor(room: Room) {
            this.SectionsFilled = [false, false, false, false];
            this.Room = room;
            this.Sections = new Array<RoomSection>();
            for (var i = 0; i < G.RoomSections.length; i++) {
                this.Sections.push(new RoomSection(G.RoomSections[i].type, G.RoomSections[i].grid));
            }
        }

        RoomFilled(): boolean {
            return this.SectionsFilled[0] && this.SectionsFilled[1] && this.SectionsFilled[2] && this.SectionsFilled[3];
        }
        FillRoom() {
            while (!this.RoomFilled()) {
                var sectionindex: number = Math.floor(Math.random() * this.Sections.length);
                var quadrant: number = Math.floor(Math.random() * 4);
                if (this.SectionFitsInRoom(sectionindex, quadrant)) {
                    this.ApplyToRoom(sectionindex, quadrant);
                }
            }
        }
        SectionFitsInRoom(sectionindex: number,quadr:number): boolean {
            var section = this.Sections[sectionindex];
            if (section.Type == "fourth") {
                return !this.SectionsFilled[quadr];
            }
            if (section.Type == "vertical") {
                if (quadr == 0 || quadr == 2) {
                    return !this.SectionsFilled[0] && !this.SectionsFilled[2];
                }
                else {
                    return !this.SectionsFilled[1] && !this.SectionsFilled[3];
                }
            }
            if (section.Type == "horizontal") {
                if (quadr == 0 || quadr == 1) {
                    return !this.SectionsFilled[0] && !this.SectionsFilled[1];
                }
                else {
                    return !this.SectionsFilled[2] && !this.SectionsFilled[3];
                }
            }
            return false;
        }


        //paste this section intto the room in the given quadrant 
        ApplyToRoom(sectionindex: number, quadrant: number) {
            var section = new RoomSection(this.Sections[sectionindex].Type,this.Sections[sectionindex].Grid.slice());            
            var posX = 1;
            var posY = 1;
            var newX = Math.floor((G.RoomHeight / 2) + 1);
            var newY = Math.floor((G.RoomWidth / 2) + 1);
            this.SectionsFilled[quadrant] = true;
            //if the grid is a fourth of the total, flip it so it will be mirrored to the right quadrant
            if (section.Type == "fourth") {               
                switch (quadrant) {
                    case 1: section.Flip("horizontal"); posY = newY; break;
                    case 2: section.Flip("vertical"); posX = newX; break;
                    case 3: section.Flip("horizontal"); section.Flip("vertical"); posX = newX; posY = newY; break;
                }
            }
            if (section.Type == "horizontal") {
                if (quadrant == 2 || quadrant == 3) {
                    this.SectionsFilled[2] = this.SectionsFilled[3] = true;
                    section.Flip("vertical");
                    if (Math.random() > 0.5)
                        section.Flip("horizontal");
                    posX = newX;
                }
                else {
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
                }
                else {
                    this.SectionsFilled[0] = this.SectionsFilled[2] = true;
                }
            }
            //actually apply the sections to the room
            var cellBuilder = new CellBuilder();
            for (var i = posX; i < posX + section.Grid.length; i++) {
                for (var j = posY; j < posY + section.Grid[0].length; j++) {
                    if (this.Room.Inside(i, j)) {
                        this.Room.Cells[i][j] = cellBuilder.Build(i, j, section.Grid[i - posX][j - posY]); 
                    }
                }
            }
        }

    }
    //class that describes a roomsection used for procedural generation,
     //based on stringarrays in G.roomsections
    export class RoomSection {
        Type: string;
        Grid: Array<string>;

        constructor(type: string, grid: any) {
            this.Type = type;
            //copy the grid from the data from G, so we can manipulate it
            this.Grid = <Array<string>>grid.slice();
        }
        Dump() {
            console.log(this.Grid.join("\n"));
        }
        
        //flips the section so it can be mirrored in the different quadrant
        Flip(type: string) {
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
    }
}