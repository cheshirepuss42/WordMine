module WM.Level {
    export class Player{
        View: JQuery;
        private _Cell: Level.Cell;
        get Cell() {
            return this._Cell;
        }
        set Cell(h: Level.Cell) {
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
        }
        Energy: number;
        MaxEnergy: number;
        MaxHealth: number;
        MiningCost: number;

        private _health: number;
        get Health() {
            return this._health;
        }
        set Health(h: number) {
            this._health = h;
            
        }
        name: string;

        constructor() {
            this.Health = 100;
            this.Energy = 250;
        }
        getView() {
            //var id = "c_" + this.Cell.RoomX + "_" + this.Cell.RoomY + "_" + layer;
            //if ($("#" + id).length) {
            //    $("#" + id).remove();
            //}
            //var index = this.GetTileIndex(G.layerTypes[layer]);
            //var opacity = (G.layerTypes[layer] != "unmined" || this.MinedOut == 0) ? null : this.MinedOut;
            return $(wm.makeMapElement(this.Cell.RoomX, this.Cell.RoomY, 1, G.layerTypes.length + 1, "player"));
        }
        draw() {
            $("#player").remove();
            wm.mapView.append(this.getView());
        }
        getViewIndex():number {
            return 1;
        }
        Has(item:string):boolean {
            return true;
        }
        AddItem(item:string) {
            
        }
        LoseItem(item: string) {
        }
        Move(dir: string) {
            //handle moving 

        }
    }
} 