module WM.States {
    export class Boot extends Phaser.State {
        constructor() {
            super();
        }
        render() {
        }

        create() {
            //this.game.stage.scale.startFullScreen(true);
            //this.game.stage.scaleMode = Phaser.StageScaleMode.EXACT_FIT; //resize your window to see the stage resize too
            //this.game.stage.scale.setShowAll();
            //this.game.stage.scale.refresh();

            this.game.state.start("preload", true, false);
        }

        update() {
        }
    }
} 