module WM.States {
    export class Boot extends Phaser.State {
        create() {
            this.game.stage.backgroundColor = '#444448';
            this.game.state.start("preload", true, false);
        }
    }
} 