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
            switch (this.TypeChar) {
                case "X": this.Passable = false; break;
                case "t": this.Treasure = new Treasure.Treasure(1); break;
                case "e": this.Event = "first";
            }
            //var querystring = window.location.href.split("?")
            //var fromquery = (querystring.length > 1) ? querystring[1] : "";
            //this.MinedOut = (fromquery.indexOf("mined") > -1) ? true : false;

        }
        HasEvent(): boolean {
            return this.Event != "" ||this.Creep != null ||this.Treasure != null ||this.Exit != null;
        }
        GetTileIndex(layername: any): number {
            var index = null;
            switch (layername) {
                case "floor": index= 40; break;
                case "walls": index=(this.Passable)?null:92;break;
                case "events": index = (this.Event == "") ? null : 20; index = (this.Treasure == null) ? null : 10; break;
                case "unmined": index = (this.MinedOut) ? null : 38; break;
            }
            return index;
        }
        //Enters() {
        //    //here are the real actions taken when a player moves onto a cell
        //    if (!this.MinedOut) {
        //        if (wm.Player.Energy > wm.Player.MiningCost) {
        //            //if not minedout and the player has enough energy, mine it out
        //            this.MinedOut = true;
        //            wm.Player.Energy -= wm.Player.MiningCost;
        //        }
        //    }
        //    else {
        //        if (this.Event != null) {
        //            //if there is a dialog, open it
        //            wm.Level.ShowEvent(this.Event);
        //            //make sure the gridbuttons dont get pressed
        //        }
        //        else if (this.Creep != null) {
        //            //if there is a creep, fight it
        //            wm.Level.Fight();
        //        }
        //    }
        //}
        toString():string {
            return this.TypeChar;
        }
        //Show() {
        //    if (this.MinedOut) {
        //       // this.Surface.loadTexture(UI.FilledRect.getBMD(this.game, G.CellSize, G.CellSize, "#bbb"), 0);
        //        //show floor
        //        if (this.Creep == null) {
        //            if (this.Treasure != null) {
        //                //show treasure
        //            }
        //        }
        //        else {
        //            //show creep
        //        }
        //    }
        //    else {
        //        //this.Surface.loadTexture(UI.FilledRect.getBMD(this.game, G.CellSize, G.CellSize, "#333"), 0);
        //        //show unmined state
        //    }        
        //}
    }
} 

////-----------------------------------------------------------------------------------------------------------------------------//
//function Cell(x, y, type) {
//    this.PosX = x;
//    this.PosY = y;
//    this.TypeChar = type;
//    this.MinedOut = false;
//    this.Passable = true;
//    this.Player = null;
//    this.Dialog = null;
//    this.Creep = null;
//    this.Exit = null;
//    this.Items = [];
//    this.Init();
//}
//Cell.prototype.CSSClass = function () {
//    if (this.Player != null) {
//        return "player";
//    }
//    if (this.Exit != null) {
//        return "exit";
//    }
//    if (this.MinedOut == true) {
//        if (this.Passable) {
//            if (this.Items.length > 0)
//                return "pickup";
//            if (this.Dialog != null) {
//                return "dialogcell";
//            }
//            if (this.Creep != null) {
//                return "creep";
//            }
//            return "empty";
//        }
//        else
//            return "wall";
//    }
//    return "dark";
//};
//Cell.prototype.Init = function () {

//    switch (this.TypeChar) {
//        case "X": this.Passable = false; break;
//        case "R": this.Items.push(GetRandomItem()); break;
//        case "D": var d = dialogs[Math.floor(dialogs.length * Math.random())]; this.Dialog = new Question(d.id, d.title, d.question, d.image, d.answers); break;
//        case "C": var c = creeps[Math.floor(creeps.length * Math.random())];
//            this.Creep = new Creep(c.health, c.attack, c.defense, c.effects);
//            break;
//    }
//    var querystring = window.location.href.split("?")
//    querystring = (querystring.length > 1) ? querystring[1] : "";
//    this.MinedOut = (querystring.indexOf("mined") > -1) ? true : false;
//};
//Cell.prototype.Html = function () {
//    return "<div class='minecell " + this.CSSClass() + "'>" + this.CSSClass() + "</div> "
//};
////----------------------------------------------------------------------------------------------------------------//
//function PickupItem(name, effects) {
//    this.Name = name;
//    this.Effects = effects;
//    this.Consume = function (player, level) {
//        for (var i = 0; i < this.Effects.length; i++) {
//            this.Effects[i].Apply(player, level);
//        }
//    }
//}
//function GetRandomItem() {
//    var item = items[Math.floor(items.length * Math.random())];
//    var fx = [];
//    for (var i = 0; i < item.effects.length; i++) {
//        fx.push(GetEffect(effects, item.effects[i]));
//    }
//    return new PickupItem(item.name, fx);
//}

////----------------------------------------------------------------------------------------------------------------//
//function Creep(health, attack, defense, effects) {
//    Creature.apply(this, arguments);
//    this.Effects = effects;
//}
//Creep.prototype = new Creature();
//Creep.prototype.Interact = function (player) {
//    var playerdmg = player.Attack - this.Defense;
//    var creepdmg = this.Attack - player.Defense;
//    player.Health -= (creepdmg >= 0) ? creepdmg : 0;
//    this.Health -= (playerdmg >= 0) ? playerdmg : 0;
//}
////----------------------------------------------------------------------------------------------------------------//
//function Creature(health, attack, defense) {
//    this.Health = health;
//    this.Attack = attack;
//    this.Defense = defense;
//}






