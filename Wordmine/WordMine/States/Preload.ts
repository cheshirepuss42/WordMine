module WM.States {
    export class Preload extends Phaser.State {
        preloadBar: UI.ProgressBar;      
        preload() {
            //load the assets
            this.game.load.image('player', '/Wordmine/Assets/player.png');
            this.game.load.image('tiles', "/Wordmine/Assets/t000.png");
        }
        create() {
            //show a progressbar filling for 1 sec,then go to menu. bit useless for now            
            this.preloadBar = new UI.ProgressBar(this.game, 100, 50);
            var tween = this.add.tween(this.preloadBar).to({ FilledAmount: 1 }, 1000, Phaser.Easing.Linear.None, true);
            tween.onComplete.add(this.startMainMenu, this);
        }
        startMainMenu() {
            this.game.state.start("menu",true,false);
        }
    }
} 