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
        _Energy: number;
        set Energy(nrg: number) {            
            if (nrg < 0) {
                this.Health += Math.floor(nrg / 10);
                nrg = 0;
            }
            this._Energy = (nrg < this.MaxEnergy) ? nrg : this.MaxEnergy;
        }
        get Energy(): number {
            return this._Energy;
        }
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
            this.Health = this.MaxHealth= 100;
            this.Energy = this.MaxEnergy = 250;
        }
        getView() {
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