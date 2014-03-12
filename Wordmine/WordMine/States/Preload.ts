module WM.States {
    export class Preload extends Phaser.State {
        preloadBar: UI.ProgressBar;
        counter: number;
        constructor() {
            super();
            
        }        
        preload() {


            //  Set-up our preloader sprite

            //this.load.setPreloadSprite(this.preloadBar);

            //  Load our actual games assets
            //this.load.image('titlepage', 'assets/titlepage.jpg');
            //this.load.image('logo', 'assets/logo.png');
            //this.load.audio('music', 'assets/title.mp3', true);
            //this.load.spritesheet('simon', 'assets/simon.png', 58, 96, 5);
            //this.load.image('level1', 'assets/level1.png');

            this.game.load.image('player', '/Wordmine/Assets/player.png');

            this.game.load.tilemap('map', '/Wordmine/Assets/basemap.map', null, Phaser.Tilemap.TILED_JSON);

            this.game.load.spritesheet("tiles", "/Wordmine/Assets/t000.png", G.CellSize,G.CellSize);// ti .tileset('tiles', '/Wordmine/Assets/tiles.png', 32, 32,0,0, 1);
            //this.game.load.tilemap("tiles2", null, "0,0,0,0,0\n1,1,0,0,1\n1,0,0,0,1\n");
            //this.load.image('car', 'assets/sprites/car90.png');


        }

        create() {
            this.game.stage.backgroundColor = '#444448';
            this.preloadBar = new UI.ProgressBar(this.game, 100, 50);
            this.counter = 0.1;
            //this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            //this.game.stage.scale.setShowAll();
            //this.game.stage.scale.pageAlignHorizontally = true;
            //this.game.stage.scale.pageAlignVertically = true;
            //this.game.stage.scale.refresh();
            //var tween = this.add.tween(this.preloadBar).to({ alpha: 0 }, 1000, Phaser.Easing.Linear.None, true);
            //tween.onComplete.add(this.startMainMenu, this);

        }
        render() {
            //this.game.debug.renderInputInfo(16, 16);
        }
        update() {
            this.counter -= this.game.time.elapsed /1000;
            this.preloadBar.SetAmount(this.counter);
            if (this.counter < 0) {
                this.preloadBar.destroy(true);
                this.game.state.start("menu",true,false);
            }
            //this.game.physics.moveToPointer(this.button,300,this.game.input.activePointer);

        }
    }
} 