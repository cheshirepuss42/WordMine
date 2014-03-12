module WM.Player {
    export class Player {
        View: Phaser.Sprite;
        private _Cell: Level.Cell;
        get Cell() {
            return this._Cell;
        }
        set Cell(h: Level.Cell) {
            this._Cell = h;
            this.View.y = h.RoomX * G.CellSize;
            this.View.x= h.RoomY * G.CellSize;
        }
        //CurrentCell: Level.Cell;
        //CurrentRoom: Level.Room;
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