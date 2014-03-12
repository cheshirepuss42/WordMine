module WM.States {
    export class Menu extends Phaser.State {
        button: WM.UI.TextButton;
        constructor() {
            super();


        }
        render() {
            //this.game.debug.renderInputInfo(16, 16);
        }

        create() {

            this.game.stage.backgroundColor = "337799";
            this.button = this.game.add.existing(new WM.UI.TextButton(this.game, "start game", 300, 100, this.bla));
            this.button.x = (this.game.width / 2 )- (this.button.w / 2);
            this.button.y = (this.game.height / 2 )-( this.button.h / 2);
            this.button.Show();
        }
        bla() { this.game.state.start("level", true, false); }

        update() {

            //this.game.physics.moveToPointer(this.button,300,this.game.input.activePointer);

        }
    }
}  