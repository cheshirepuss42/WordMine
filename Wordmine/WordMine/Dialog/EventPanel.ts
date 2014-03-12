module WM.Dialog {
    export class EventPanel extends Phaser.Group {
        //text: Phaser.Text;
        background: Phaser.Graphics;
        text: Phaser.Text;
        image: string;//to be made
        options: Array<EventOption>;
        padding: number;
        constructor(game: Phaser.Game, panel:any) {
            super(game, null, "panel", false);
            this.x = game.width / 4;
            this.y = 100;
            this.padding = 10;
            this.background = this.add(new Phaser.Graphics(game, 0, 0));
            this.background.beginFill(0xeeeeee);
            this.background.drawRect(0, 0, game.width / 2, game.height / 1.5);
            this.options = new Array<EventOption>();
            
            for (var j = 0; j < panel.options.length; j++) {
                var option = panel.options[j];console.log(option);
                if (Effect.Happens(option.conditions)) {
                    var effects = function () {
                        for (var i = 0; i < option.effects.length; i++) {
                            Effect.Call(option.effects[i])();
                        }
                    }
                    var eopt = new EventOption(game, option.text, effects);   
                    console.log(eopt);                
                    this.add(eopt);
                    eopt.y += 200 + ((this.options.length - 1) * eopt.h);
                    this.options.push(eopt);
                }
            }
            this.image = panel.img;  
            this.text = this.add(new Phaser.Text(game, this.padding, this.padding, panel.text, G.style));
            
            
            this.Hide();
        }
        Show() {
            for (var i = 0; i < this.options.length; i++) {
                this.options[i].Show();
            }
            this.text.alive = this.text.exists = this.text.visible = true;
            this.background.alive = this.background.exists = this.background.visible = true;
        }
        Hide() {
            
            for (var i = 0; i < this.options.length; i++) {
                this.options[i].Hide();
            }
            this.text.alive = this.text.exists = this.text.visible = false;
            this.background.alive = this.background.exists = this.background.visible = false;
        }
    }
}  