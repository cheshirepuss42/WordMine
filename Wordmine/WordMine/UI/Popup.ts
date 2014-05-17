module WM.UI {
    export class Popup extends Phaser.Group{
        Background: Phaser.Sprite;
        constructor(game:Phaser.Game,x:number,y:number,w:number,h:number) {
            super(game, null, "popup", false);
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.Background = this.add(new Phaser.Image(game, 0, 0, FilledRect.getBMD(game, w, h, "#eee"), null));
        }

    }
}