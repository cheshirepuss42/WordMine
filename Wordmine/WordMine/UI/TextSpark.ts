module WM.UI {
    export class TextSpark {
        Text: Phaser.Text;
        constructor(txt: string, px: number, py: number, color: string= "#fff") {
            this.Text = wm.Level.game.add.text(px + (G.CellSize / 2), py + (G.CellSize / 2), txt, { fill: color });
            this.Text.anchor.setTo(0.5, 0.5);
            //var game.add.tween(this.Text);
            //this.Text.style.fill = color;
            wm.Level.game.add.tween(this.Text).to({ y: py - 100,alpha:0 }, 2000, Phaser.Easing.Cubic.Out,true).onComplete.add(this.Destroy, this);


        }
        Destroy() {
            this.Text.destroy();
        }
    }
}  