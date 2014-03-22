module WM.States {
    export class Preload extends Phaser.State {
        preloadBar: UI.ProgressBar;
        //counter: number;
        constructor() {
            super();
            
        }        
        preload() {
            this.game.load.image('player', '/Wordmine/Assets/player.png');
            this.game.load.tilemap('map', '/Wordmine/Assets/basemap.map', null, Phaser.Tilemap.TILED_JSON);
            this.game.load.image('tiles', "/Wordmine/Assets/t000.png");

        }

        create() {
            this.game.stage.backgroundColor = '#444448';
            this.preloadBar = new UI.ProgressBar(this.game, 100, 50);
            //this.counter = 0.1;
            //this.game.stage.scaleMode = Phaser.StageScaleMode.SHOW_ALL;
            //this.game.stage.scale.setShowAll();
            //this.game.stage.scale.pageAlignHorizontally = true;
            //this.game.stage.scale.pageAlignVertically = true;
            //this.game.stage.scale.refresh();
            var tween = this.add.tween(this.preloadBar).to({ FilledAmount: 1 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);

        }
        startMainMenu() {
            this.game.state.start("menu",true,false);
        }
        render() {
            //this.game.debug.renderInputInfo(16, 16);
        }
        update() {
            //this.counter -= this.game.time.elapsed /1000;
            //this.preloadBar.SetAmount(this.counter);
            //if (this.counter < 0) {
            //    this.preloadBar.destroy(true);
                
            //}
            //this.game.physics.moveToPointer(this.button,300,this.game.input.activePointer);

        }
    }
} 