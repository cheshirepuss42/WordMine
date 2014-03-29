module WM.UI {
    export class FilledRect extends Phaser.Sprite {
        color: string;
        constructor(game: Phaser.Game, width: number, height: number, color: string="#fff") {
            super(game, width, height);            
            this.color = color;
            this.loadTexture(FilledRect.getBMD(game,width,height,color),null);
        }
        static getBMD(game: Phaser.Game, width: number, height: number, color: string= "#fff"): Phaser.BitmapData {
            var bmd = new Phaser.BitmapData(game,"bla", width, height);
            bmd.context.fillStyle = color;
            bmd.context.rect(0, 0, width, height);
            bmd.context.fill();
            return bmd;
        }

    }
}  