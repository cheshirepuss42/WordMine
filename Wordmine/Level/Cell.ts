module WM.Level {
    //this contains all the data for the cell, but none of the drawing routines. The drawing is done in the room
    export class Cell {
        TypeChar: string;
        Passable: boolean;
        MinedOut: number;
        Event: Event.RoomEvent; 
        RoomX: number;
        RoomY: number; 
        Exit: RoomExit;

        constructor(roomx: number, roomy: number, typechar: any) {
            this.RoomX = roomx;
            this.RoomY = roomy;
            this.TypeChar = typechar;
            this.Passable = true; 
            this.MinedOut = 0;
            this.Event = null;
            this.Exit = null;

        }
        getView(layer) {
            var id = "c_" + this.RoomX + "_" + this.RoomY + "_" + layer;
            if ($("#" + id).length) {
                $("#" + id).remove();
            }
            var index = this.GetTileIndex(G.layerTypes[layer]);
            var opacity = (G.layerTypes[layer] != "unmined" || this.MinedOut == 0) ? null : this.MinedOut;
            return $(wm.makeMapElement(this.RoomX, this.RoomY, index, layer, id, opacity));
        }
        draw() {
            for (var i = 0; i < G.layerTypes.length; i++) {
                wm.mapView.append(this.getView(i));
            }
        }
        //see if the url indicates whether to show the unminedlayer
        UnminedByQuery(): boolean {
            var querystring = window.location.href.split("?")
            var fromquery = (querystring.length > 1) ? querystring[1] : "";
            return (fromquery.indexOf("mined") > -1) ? true : false;
        }

        //has a some property which causes an event
        HasEvent(): boolean {
           // return this.Event != null || this.Exit != null;
            return this.Exit != null;
        }
        //get the tilesheetindex for the given layer
        GetTileIndex(layername: string): number {
            var index = 0;
            switch (layername) {
                case "floor": index = 39; break;
                case "wall": index = (this.Passable) ? index : 91;break;
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
                case "unmined": index = (this.MinedOut==1) ? index : 37; break;
            }
            return index;
        }
        layerView(layer) { return $("#c_" + this.RoomX + "_" + this.RoomY + "_" + layer); }
        toString():string {
            return this.TypeChar;
        }
    }

    export class CellBuilder {
        tileCharGroups: any = { empty: ".", creep: "cC", wall: "xX", treasure: "tT", dialog: "dD" };
        constructor() {
        }
        Build(xpos: number, ypos: number, tileChar: string): Level.Cell {
            //generate the randomized cell for the tilechar
            var cell = new Level.Cell(xpos, ypos, tileChar);
            var group = this.groupName(tileChar);
            switch (tileChar) {
                case "X": cell.Passable = false; break;
                case "t": cell.Event = new Event.Treasure(1); break;
                case "e": cell.Event = new Event.Dialog("first"); break;
                case "c": cell.Event = new Event.Creep("normal"); break;
            }

            return cell;
        }
        groupName(char): string {
            for (var k in this.tileCharGroups) {
                if (this.tileCharGroups[k].indexOf(char) != -1) {
                    return k;
                }
            }
            return "empty";
        }
    }
} 