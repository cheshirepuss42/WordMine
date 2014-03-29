module WM.Level {
    //this contains all the data for the cell, but none of the drawing routines. The drawing is done in the room
    export class Cell{
        TypeChar: string;
        Passable: boolean;
        MinedOut: boolean;
        Event: string;
        Creep: Creep.Creep;
        Treasure: Treasure.Treasure;   
        RoomX: number;
        RoomY: number; 
        TileIndex: number;
        Exit: RoomExit;

        constructor(roomx: number, roomy: number, typechar: any) {
            this.RoomX = roomx;
            this.RoomY = roomy;
            this.TypeChar = typechar;
            this.Passable = true; 
            this.MinedOut = false;
            this.Event = "";
            this.Creep = null;
            this.Treasure = null;
            this.Exit = null;
            //make setting based on typechar (used for easy mapmaking)
            switch (this.TypeChar) {
                case "X": this.Passable = false; break;
                case "t": this.Treasure = new Treasure.Treasure(1); break;
                case "e": this.Event = "first";
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
            return this.Event != "" ||this.Creep != null ||this.Treasure != null ||this.Exit != null;
        }
        //get the tilesheetindex for the given layer
        GetTileIndex(layername: string): number {
            var index = 0;
            switch (layername) {
                case "floor": index = 39; break;
                case "walls": index = (this.Passable) ? index : 91;break;
                case "events": index = (this.Event == "") ? index : 19; index = (this.Treasure == null) ? index : 9; break;
                case "unmined": index = (this.MinedOut) ? index : 37; break;
            }
            return index;
        }
        toString():string {
            return this.TypeChar;
        }
    }
} 