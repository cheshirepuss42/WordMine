/// <reference path="../_reference.ts" />
module WM.UI {
    export class DialogPanel extends Popup {
        //text: Phaser.Text;
        //background: Phaser.Sprite;
        text: Phaser.Text;
        image: string;//to be made
        options: Array<DialogOption>;
        padding: number;
        SelectedOption: number;
        constructor(game: Phaser.Game, panel:any) {
            super(game, 0,0, G.MapWidth, G.MapHeight);
            this.padding = 10;           
            this.options = new Array<DialogOption>();            
            for (var j = 0; j < panel.options.length; j++) {
                var option = panel.options[j];
                if (Dialog.Effect.Happens(option.conditions)) {
                    var effects = function () {
                        for (var i = 0; i < option.effects.length; i++) {
                            Dialog.Effect.Call(option.effects[i])();
                        }
                    }
                    var eopt = new DialogOption(game, option.text, G.MapWidth, 70, effects);                 
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
            this.Background.exists = this.Background.visible= true;
            this.visible = this.exists = true;           
        }
        Hide() {            
            for (var i = 0; i < this.options.length; i++) {
                this.options[i].Hide();
            }
            this.text.exists = this.text.visible = false;
            this.Background.exists = this.Background.visible = false;
            this.visible = this.exists = false;            
        }
    }
}  