/// <reference path="../_reference.ts" />
module WM.States {
    export class Level extends Phaser.State {
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

        create() {
            //making this globally accessible, which makes handling some callbacks easier, might turn out to be a very bad idea
            wm.Level = this;

            //scaling the whole thing up, needs fixing
            //this.world.scale.x = 1.6;
            //this.world.scale.y = 1.6; 

            //build entire level
            this.Lvl = new WM.Level.LvlData(G.LevelWidth, G.LevelHeight);

            //currentroom is in the middle of 3x3
            this.Room = this.Lvl.Cells[1][1];

            //make tilemap and add tilesheet
            this.Map = this.game.add.tilemap();
            this.Map.addTilesetImage("tiles");

            //make floorlayer with tilemap.create
            this.FloorLayer = this.Map.create("floor", G.RoomWidth, G.RoomHeight, G.CellSize, G.CellSize);

            //make rest of layers with tilemap.createblanklayer
            this.EventsLayer = this.Map.createBlankLayer("events", G.RoomWidth, G.RoomHeight,G.CellSize,G.CellSize);
            this.WallsLayer = this.Map.createBlankLayer("walls", G.RoomWidth, G.RoomHeight, G.CellSize, G.CellSize);
            this.UnminedLayer = this.Map.createBlankLayer("unmined", G.RoomWidth, G.RoomHeight, G.CellSize, G.CellSize);

            //show a little of what is under the unminedlayer for debugging
            this.UnminedLayer.alpha = 0.95;

            //make the player, his view and his position
            this.Player = wm.Player;
            this.Player.View = this.add.sprite(0, 0, "player"); 
            this.Player.View.scale.setTo(0.9, 0.9);
            this.Player.Cell = this.Room.Middle();
            this.Player.Cell.MinedOut = true;

            //make the stats in the right, where more ui will come
            this.PlayerStats = this.game.add.text(G.MapWidth, 0, "Energy: ", { fill: "#fff", font: "20px" }); 
            
            //draw the room      
            this.DrawRoom();

            //setup the buttons to allow player movement without keyboard
            this.ButtonDown = this.game.add.existing(new UI.TextButton(this.game, "down",50, 50, function () { wm.Level.HandleInput("down"); }));
            this.ButtonUp = this.game.add.existing(new UI.TextButton(this.game, "up", 50, 50, function () { wm.Level.HandleInput("up"); }));
            this.ButtonLeft = this.game.add.existing(new UI.TextButton(this.game, "left", 50, 50, function () { wm.Level.HandleInput("left"); }));
            this.ButtonRight = this.game.add.existing(new UI.TextButton(this.game, "right", 50, 50, function () { wm.Level.HandleInput("right"); }));
            this.ButtonDown.x = G.MapWidth+25;
            this.ButtonDown.y = G.MapHeight;
            this.ButtonDown.Show();
            this.ButtonUp.x = G.MapWidth+25;
            this.ButtonUp.y = G.MapHeight-100;
            this.ButtonUp.Show();
            this.ButtonLeft.x = G.MapWidth;
            this.ButtonLeft.y = G.MapHeight-50;
            this.ButtonLeft.Show();
            this.ButtonRight.x = G.MapWidth+50;
            this.ButtonRight.y = G.MapHeight-50;
            this.ButtonRight.Show();

            //setup the keys allowing for player movement
            this.Cursors = this.input.keyboard.createCursorKeys();
            this.Cursors.down.onDown.add(function () {wm.Level.HandleInput("down");}, this);
            this.Cursors.up.onDown.add(function () { wm.Level.HandleInput("up"); }, this);
            this.Cursors.left.onDown.add(function () { wm.Level.HandleInput("left"); }, this);
            this.Cursors.right.onDown.add(function () { wm.Level.HandleInput("right"); }, this);

            //set the marker that indicates the tile last clicked
            this.Marker = this.add.graphics(0, 0);
            this.Marker.lineStyle(2, 0xff0000, 1);
            this.Marker.drawRect(0, 0, G.CellSize, G.CellSize);

            //added a handler for clicking the tile
            this.input.onDown.add(this.ClickTile, this);

        }

        //handles a click on a tile, only if there is no dialog running
        ClickTile(obj, pointer) {
            if (this.Dialog == null) {
                var px = Math.floor((pointer.layerX / G.CellSize) /this.world.scale.x);
                var py = Math.floor((pointer.layerY / G.CellSize) / this.world.scale.y);
                if (this.Room.Inside(py, px)) {
                    console.log(this.Room.Cells[py][px], px, py);
                    this.Marker.position.set(px * G.CellSize, py * G.CellSize);
                }
            }
        }
        //handles player interaction with tile in given direction. likely moves the player there too. updates the view of the entered cell
        HandleInput(dir: string) {
            if (this.Dialog == null) {
                var target = this.Room.GetNeighbour(dir, this.Player.Cell.RoomX, this.Player.Cell.RoomY);
                if (target != null) {
                    this.Room.MoveToTile(this.Player, target.RoomY, target.RoomX);
                    this.DrawCell(target.RoomX, target.RoomY, this.UnminedLayer);
                    this.DrawCell(target.RoomX, target.RoomY, this.FloorLayer);
                    this.DrawCell(target.RoomX, target.RoomY, this.EventsLayer);
                    this.DrawCell(target.RoomX, target.RoomY, this.WallsLayer);
                }
                this.PlayerStats.setText("Energy: " + this.Player.Energy);
            }
            else {
                this.Dialog.CurrentPanel.HandleInput(dir);                
            }
        }
        //show the dialog of the given event
        ShowDialog(event: string, cell: Level.Cell) {
            this.Dialog = new Dialog.Event(this.game, G.events[event],cell);
            this.Dialog.ShowPanel();
        }
        //moves player to entrance in new room corresponding to exit 
        HandleExit(exit: Level.RoomExit) {
            this.Room = exit.TargetRoom;
            this.Player.Cell = exit.EntranceCell();
            this.Player.Cell.MinedOut = true;
            this.DrawRoom();
        }
        //draw all layers of current room
        DrawRoom() {
            this.DrawLayer(this.FloorLayer);
            this.DrawLayer(this.WallsLayer);
            this.DrawLayer(this.EventsLayer);
            this.DrawLayer(this.UnminedLayer);
        }
        //draws each cell of a layer
        DrawLayer(layer: Phaser.TilemapLayer) {
            for (var i = 0; i < this.Room.Height; i++) {
                for (var j = 0; j < this.Room.Width; j++) {
                    this.DrawCell(i, j, layer);
                }
            }
        }
        //draws a cell in a layer, gets tilesheet-index for layer from Cell.gettileindex based on the layername 
        DrawCell(x, y, layer: Phaser.TilemapLayer) {        
            this.Map.putTile(this.Room.Cells[x][y].GetTileIndex(layer.layer["name"]), y, x, layer);
        }
        update() {

        }
        render() {
        }
    }
}

