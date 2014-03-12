/// <reference path="../_reference.ts" />
module WM.States {
    export class Level extends Phaser.State {
        Letters: Array<Letter.Letter>;
        Dialog: Dialog.Event;
        Lvl: Level.LvlData;
        Room: Level.Room;
        Player: Player.Player;
        UnminedLayer: Phaser.TilemapLayer;
        FloorLayer: Phaser.TilemapLayer;
        WallsLayer: Phaser.TilemapLayer;
        EventsLayer: Phaser.TilemapLayer;
        Cursors: Phaser.CursorKeys;
        Marker: Phaser.Graphics;
        Map: Phaser.Tilemap;
        PlayerStats: Phaser.Text;
        ButtonUp: UI.TextButton;
        ButtonDown: UI.TextButton;
        ButtonLeft: UI.TextButton;
        ButtonRight: UI.TextButton;
        constructor() {
            super();
        }
        render() {
        }

        create() {
            wm.Level = this;
            //this.world.scale.x = 1.6;
            //this.world.scale.y = 1.6;

            this.Player = wm.Player;
            this.Lvl = new WM.Level.LvlData(G.LevelWidth, G.LevelHeight);
            this.Room = this.Lvl.Cells[1][1];
            this.Map = this.add.tilemap("map", "tiles");
            this.Map.addTilesetImage("TileA2", "tiles");
            this.FloorLayer = this.Map.createLayer("floor");
            this.EventsLayer = this.Map.createLayer("events");
            this.WallsLayer = this.Map.createLayer("walls");
            this.UnminedLayer = this.Map.createLayer("unmined");
            this.UnminedLayer.alpha = 0.95;
            this.Cursors = this.input.keyboard.createCursorKeys();
            var mapwidth = this.Room.Width * G.CellSize;
            var mapheight = this.Room.Height * G.CellSize;
            this.PlayerStats = this.game.add.text(mapwidth, 0, "Energy: ", { fill: "#fff", font: "20px"});


            var self = this;
            this.Cursors.down.onDown.add(function () { self.MovePlayer("down"); }, this);
            this.Cursors.up.onDown.add(function () { self.MovePlayer("up"); }, this);
            this.Cursors.left.onDown.add(function () { self.MovePlayer("left"); }, this);
            this.Cursors.right.onDown.add(function () { self.MovePlayer("right"); }, this);


            this.Player.View = this.add.sprite(0, 0, "player"); 
            //this.Player.View.anchor.setTo(0, 0); 
            this.Player.View.scale.setTo(0.9, 0.9);

            this.Player.Cell = this.Room.Middle();
            this.Player.Cell.MinedOut = true;
            
            this.Marker = this.add.graphics(0,0);
            this.Marker.lineStyle(2, 0xff0000, 1);
            this.Marker.drawRect(0, 0, G.CellSize, G.CellSize);
            this.DrawRoom();
            this.ButtonDown = this.game.add.existing(new UI.TextButton(this.game, "down",50, 50, function () { wm.Level.MovePlayer("down"); }));
            this.ButtonUp = this.game.add.existing(new UI.TextButton(this.game, "up", 50, 50, function () { wm.Level.MovePlayer("up"); }));
            this.ButtonLeft = this.game.add.existing(new UI.TextButton(this.game, "left", 50, 50, function () { wm.Level.MovePlayer("left"); }));
            this.ButtonRight = this.game.add.existing(new UI.TextButton(this.game, "right", 50, 50, function () { wm.Level.MovePlayer("right"); }));
            this.ButtonDown.x = mapwidth+25;
            this.ButtonDown.y = mapheight;
            this.ButtonDown.Show();
            this.ButtonUp.x = mapwidth+25;
            this.ButtonUp.y = mapheight-100;
            this.ButtonUp.Show();
            this.ButtonLeft.x = mapwidth;
            this.ButtonLeft.y = mapheight-50;
            this.ButtonLeft.Show();
            this.ButtonRight.x = mapwidth+50;
            this.ButtonRight.y = mapheight-50;
            this.ButtonRight.Show();
            this.input.onDown.add(this.ClickTile, this);
        }
        ClickTile(obj, pointer) {
            if (this.Dialog == null) {
                var px = Math.floor((pointer.layerX / G.CellSize) /this.world.scale.x);
                var py = Math.floor((pointer.layerY / G.CellSize) / this.world.scale.y)
                this.Marker.x = px * G.CellSize;
                this.Marker.y = py * G.CellSize;
                console.log(this.Room.Cells[py][px]);
                
                //this.Room.MoveToTile(this.Player, px, py);
                //this.DrawCell(py, px, this.UnminedLayer);
                //this.DrawCell(py, px, this.FloorLayer);
                //this.DrawCell(py, px, this.EventsLayer);
                //this.DrawCell(py, px, this.WallsLayer);
                //this.ShowEvent("first");
            }

        }
        MovePlayer(dir:string) {
            var target = this.Room.GetNeighbour(dir, this.Player.Cell.RoomX, this.Player.Cell.RoomY);
            if (target != null) {
                this.Room.MoveToTile(this.Player, target.RoomY, target.RoomX);
                this.DrawCell(target.RoomX, target.RoomY, this.UnminedLayer);
                this.DrawCell(target.RoomX, target.RoomY, this.FloorLayer);
                this.DrawCell(target.RoomX, target.RoomY, this.EventsLayer);
                this.DrawCell(target.RoomX, target.RoomY, this.WallsLayer);
            }
            this.PlayerStats.content = "Energy: " + this.Player.Energy;
        }
        ShowEvent(event: string) {
            this.Dialog = new Dialog.Event(this.game, G.events[event]);
            this.Dialog.ShowPanel();
        }
 
        HandleExit(exit: Level.RoomExit) {
            this.Room = exit.TargetRoom;
            this.Player.Cell = exit.EntranceCell();
            this.Player.Cell.MinedOut = true;
            this.DrawRoom();
        }
        Fight() {

            //initiate combat screen
        }
        DrawRoom() {
            this.DrawLayer(this.FloorLayer);
            this.DrawLayer(this.WallsLayer);
            this.DrawLayer(this.EventsLayer);
            this.DrawLayer(this.UnminedLayer);
            //this.Map.setCollisionBetween(156, 157, true, this.WallsLayer); 
        }
        DrawLayer(layer: Phaser.TilemapLayer) {
            for (var i = 0; i < this.Room.Height; i++) {
                for (var j = 0; j < this.Room.Width; j++) {
                    this.DrawCell(i, j, layer);
                }
            }
        }
        DrawCell(x, y, layer) {
            var index = this.Room.Cells[x][y].GetTileIndex(layer.layer["name"]);
            this.Map.putTile(index, y, x, layer);
        }
        update() {
            //this.game.debug.renderRectangle(this.ButtonDown);

            //this.game.debug.renderSpriteCorners(this.ButtonDown, true, true);

        }
    }
}

