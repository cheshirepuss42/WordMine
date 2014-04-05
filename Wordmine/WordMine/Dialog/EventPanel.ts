module WM.Dialog {
    export class EventPanel extends Phaser.Group {
        //text: Phaser.Text;
        background: Phaser.Sprite;
        text: Phaser.Text;
        image: string;//to be made
        options: Array<EventOption>;
        padding: number;
        SelectedOption: number;
        constructor(game: Phaser.Game, panel:any) {
            super(game, null, "panel", false);
            this.padding = 10;
            this.background = this.add(new Phaser.Image(game, 0, 0, UI.FilledRect.getBMD(game, G.MapWidth, G.MapHeight, "#eee"),null));
            this.options = new Array<EventOption>();            
            for (var j = 0; j < panel.options.length; j++) {
                var option = panel.options[j];
                if (Effect.Happens(option.conditions)) {
                    var effects = function () {
                        for (var i = 0; i < option.effects.length; i++) {
                            Effect.Call(option.effects[i])();
                        }
                    }
                    var eopt = new EventOption(game, option.text, G.MapWidth, 70, effects);                 
                    this.add(eopt);
                    eopt.y += 200 + ((this.options.length - 1) * eopt.h);
                    this.options.push(eopt);
                }
            }
            this.image = panel.img;  
            this.text = this.add(new Phaser.Text(game, this.padding, this.padding, panel.text, G.style));  
            this.SelectedOption = 0;          
            this.Hide();
        }

        HandleInput(dir:string) {
            this.options[this.SelectedOption].button.tint = 0xeeeeee;
            if (dir=="down") {
                this.SelectedOption++;
                this.SelectedOption = (this.SelectedOption > this.options.length - 1) ? 0 : this.SelectedOption;
                
            }
            else if(dir=="up") {
                this.SelectedOption--;
                this.SelectedOption = (this.SelectedOption < 0) ? this.options.length - 1 : this.SelectedOption;
            }
            else
                this.options[this.SelectedOption].callback();
            this.options[this.SelectedOption].button.tint = 0xaaaaee;
        }
        Show() {
            for (var i = 0; i < this.options.length; i++) {
                this.options[i].Show();
            }
            this.text.exists=this.text.visible = true;
            this.background.exists =this.background.visible= true;
            this.visible = this.exists = true;           
        }
        Hide() {            
            for (var i = 0; i < this.options.length; i++) {
                this.options[i].Hide();
            }
            this.text.exists = this.text.visible = false;
            this.background.exists = this.background.visible = false;
            this.visible = this.exists = false;            
        }
    }
}  