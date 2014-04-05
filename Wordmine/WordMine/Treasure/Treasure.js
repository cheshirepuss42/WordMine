var WM;
(function (WM) {
    (function (_Treasure) {
        var Treasure = (function () {
            function Treasure(level) {
                this.Resources = 50 + (Math.floor(Math.random() * 50));
                this.Resources *= level;
            }
            Treasure.prototype.Handle = function (player) {
                player.Energy += this.Resources;
            };
            return Treasure;
        })();
        _Treasure.Treasure = Treasure;
    })(WM.Treasure || (WM.Treasure = {}));
    var Treasure = WM.Treasure;
})(WM || (WM = {}));
