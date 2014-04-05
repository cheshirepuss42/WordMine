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
            Cell.prototype.UnminedByQuery = function () {
                var querystring = window.location.href.split("?");
                var fromquery = (querystring.length > 1) ? querystring[1] : "";
                return (fromquery.indexOf("mined") > -1) ? true : false;
            };

            Cell.prototype.HasEvent = function () {
                return this.Event != "" || this.Creep != null || this.Treasure != null || this.Exit != null;
            };

            Cell.prototype.GetTileIndex = function (layername) {
                var index = 0;
                switch (layername) {
                    case "floor":
                        index = 39;
                        break;
                    case "walls":
                        index = (this.Passable) ? index : 91;
                        break;
                    case "events":
                        index = (this.Event == "") ? index : 19;
                        index = (this.Treasure == null) ? index : 9;
                        break;
                    case "unmined":
                        index = (this.MinedOut) ? index : 37;
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
