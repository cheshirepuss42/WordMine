module WM.Util {
    export class Grid<T> {
        constructor(w: number, h: number) {
            this.Width = w;
            this.Height = h;
            this.Cells = new Array<Array<T>>();
        }
        Cells: Array<Array<T>>;
        Width: number;
        Height: number;
        Set(x: number, y: number, content: T) { this.Cells[x][y] = content; }
        Get(x: number, y: number): T { return this.Cells[x][y]; }
        Inside(x: number, y: number): Boolean { return x >= 0 && x < this.Height && y >= 0 && y < this.Width; }
        AsString():string {
            var str: string = "";
            for (var i = 0; i < this.Height; i++) {
                for (var j = 0; j < this.Width; j++) {
                    str += this.Cells[i][j].toString();
                }
                str += "\n";
            }
            return str;
        }
        Dump() { console.log(this.AsString()); }
        GetNeighbour(dir: string, x: number, y: number): T {
            var nx = x, ny = y;
            switch (dir) {
                case "up": nx--; break;
                case "down": nx++; break;
                case "left": ny--; break;
                case "right": ny++; break;
            }
            if (this.Inside(nx, ny))
                return this.Cells[nx][ny];
            else return null;
        }
        Middle(): T {
            return this.Cells[Math.floor((this.Height-1) / 2)][Math.floor((this.Width-1) / 2)];
        }
        Flip(horizontal: Boolean) {
            if (horizontal) {
                for (var i = 0; i < this.Height; i++) {
                    for (var j = 0; j < this.Width / 2; j++) {
                        var target = j + ((this.Width - 1) - (j * 2));
                        var temp = this.Cells[j][i];
                        this.Cells[j][i] = this.Cells[target][i];
                        this.Cells[target][i] = temp;
                    }
                }
            }
            else {
                for (var i = 0; i < this.Width; i++) {
                    for (var j = 0; j < this.Height / 2; j++) {
                        var target = j + ((this.Height - 1) - (j * 2));
                        var temp = this.Cells[i][j];
                        this.Cells[i][j] = this.Cells[i][target];
                        this.Cells[i][target] = temp;
                    }
                }
            }
        }
    }
} 