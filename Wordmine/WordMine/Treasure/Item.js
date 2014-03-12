var WM;
(function (WM) {
    (function (Treasure) {
        var Item = (function () {
            function Item() {
            }
            return Item;
        })();
        Treasure.Item = Item;
    })(WM.Treasure || (WM.Treasure = {}));
    var Treasure = WM.Treasure;
})(WM || (WM = {}));
