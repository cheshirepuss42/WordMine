module WM.UI {
    export class Popup extends Phaser.Group{
        Background: Phaser.Sprite;
        Game: Phaser.Game;
        CanBeRemoved: boolean;
        Result: any;

        constructor(x: number, y: number, w: number, h: number) {
            this.Game = wm.Level.game;
            super(this.Game, null, "popup", false);
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.CanBeRemoved = false;
            this.Result = null;
            this.Background = this.add(new Phaser.Image(this.Game, 0, 0, FilledRect.getBMD(this.Game, w, h, "#eee"), null));
        }
        //close popup and return the result
        Resolve() {
            this.Hide();
            this.CanBeRemoved = true;   
        
        }
        HandleInput(input: string) {
        }
        Show() {
            this.Background.exists = this.Background.visible = true;
        }
        Hide() {
            this.Background.exists = this.Background.visible = false;
        }

    }
}