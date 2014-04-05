module WM.UI {
    export class FilledRect extends Phaser.Sprite {
        color: string;
        constructor(game: Phaser.Game, width: number, height: number, color: string="#fff") {
            super(game, width, height,FilledRect.getBMD(game, width, height, color));            
            this.color = color;
            //this.loadTexture(, null);
            this.visible = true;
            this.exists = true;
            //this.
        }
        static getBMD(game: Phaser.Game, width: number, height: number, color: string= "#fff"): Phaser.BitmapData {
            var bmd = new Phaser.BitmapData(game, "", width, height);
            bmd.ctx.beginPath();
            bmd.ctx.rect(0, 0, width, height);
            bmd.ctx.fillStyle = color;
            bmd.ctx.fill();
            return bmd;
        }
        //static bla(game:Phaser.Game):Phaser.Sprite {
        //    var bmd = new Phaser.BitmapData(game,"",128, 128);



        //    // draw to the canvas context like normal

        //    bmd.ctx.beginPath();

        //    bmd.ctx.rect(0, 0, 128, 128);

        //    bmd.ctx.fillStyle = '#ff0000';

        //    bmd.ctx.fill();
        //    return new Phaser.Sprite(game, 200, 200, bmd);


        //    // use the bitmap data as the texture for the sprite

        //    //var sprite = game.add.sprite(200, 200, bmd);

        //}
    }
}  