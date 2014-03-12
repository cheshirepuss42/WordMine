var WM;
(function (WM) {
    (function (_Player) {
        var Player = (function () {
            function Player() {
                this.Health = 100;
                this.Energy = 250;
            }
            Object.defineProperty(Player.prototype, "Cell", {
                get: function () {
                    return this._Cell;
                },
                set: function (h) {
                    this._Cell = h;
                    this.View.y = h.RoomX * WM.G.CellSize;
                    this.View.x = h.RoomY * WM.G.CellSize;
                },
                enumerable: true,
                configurable: true
            });

            Object.defineProperty(Player.prototype, "Health", {
                get: function () {
                    return this._health;
                },
                set: function (h) {
                    this._health = h;
                },
                enumerable: true,
                configurable: true
            });

            Player.prototype.Has = function (item) {
                return true;
            };
            Player.prototype.AddItem = function (item) {
            };
            Player.prototype.LoseItem = function (item) {
            };
            Player.prototype.Move = function (dir) {
            };
            return Player;
        })();
        _Player.Player = Player;
    })(WM.Player || (WM.Player = {}));
    var Player = WM.Player;
})(WM || (WM = {}));
