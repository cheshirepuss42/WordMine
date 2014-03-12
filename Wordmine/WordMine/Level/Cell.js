var WM;
(function (WM) {
    (function (Level) {
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

            Cell.prototype.toString = function () {
                return this.TypeChar;
            };
            return Cell;
        })();
        Level.Cell = Cell;
    })(WM.Level || (WM.Level = {}));
    var Level = WM.Level;
})(WM || (WM = {}));
