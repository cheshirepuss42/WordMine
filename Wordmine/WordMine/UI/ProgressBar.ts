module WM.UI {
    export class ProgressBar extends Phaser.Group {
        background: FilledRect;
        bar: FilledRect;
        padding: number;
        dpadding: number;
        constructor(game: Phaser.Game, width: number= 100, height: number= 50) {
            super(game, null, "progressbar");
            this.padding = 5;
            this.dpadding = this.padding * 2;
            this.background = this.add(new FilledRect(game, width, height));
            this.bar = this.add(new FilledRect(game, width - this.dpadding, height - this.dpadding, "#000"));
            this.bar.x += this.padding*3;
            this.bar.y += this.padding*3;
        }
        SetAmount(percent: number) {
            if (percent >= 0 && percent <= 1) {
                var w = (this.background.width - this.dpadding) * percent;
                this.bar.width = w;
            }            
        }
    }
} 