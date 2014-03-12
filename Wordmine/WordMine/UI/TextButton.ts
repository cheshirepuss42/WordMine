module WM.UI {
    export class TextButton extends Phaser.Group {
 
        w: number;
        h: number;
        button: Phaser.Button;
        text: Phaser.Text;
        constructor(game: Phaser.Game, text: string, width: number= 100, height: number= 50, callback?: Function,context?:Object,color:string="#eee") {
            super(game, null, "button");
            this.w = width;
            this.h = height;        
            this.button = this.add(new Phaser.Button(this.game, 0, 0, "", callback,context));
            this.button.loadTexture(FilledRect.getBMD(this.game,this.w, this.h, color), 0);
            this.text =this.add( new Phaser.Text(this.game, 0, 0, text, G.style));
            this.text.anchor.setTo(0.5, 0.5);
            this.text.x = this.button.width / 2;
            this.text.y = this.button.height / 2;
            this.Hide();
            
        }
        Hide() {
            this.button.alive = 
            this.button.exists = 
            this.button.visible = 
            this.text.alive = 
            this.text.exists = 
            this.text.visible = false;
        }
        Show() {
            this.button.alive =
            this.button.exists =
            this.button.visible =
            this.text.alive =
            this.text.exists =
            this.text.visible = true;
        }
    }
}