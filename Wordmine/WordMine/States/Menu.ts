module WM.States {
    export class Menu extends Phaser.State {
        button: WM.UI.TextButton;
        create() {
            //show a button that starts the game when pressed
            this.button = this.game.add.existing(new WM.UI.TextButton(this.game, "start game", 300, 100, this.Start));
            this.button.x = (this.game.width / 2 )- (this.button.w / 2);
            this.button.y = (this.game.height / 2 )-( this.button.h / 2);
            this.button.Show();
        }
        Start() { this.game.state.start("level", true, false); }

    }
}  