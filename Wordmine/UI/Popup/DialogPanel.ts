/// <reference path="../../_reference.ts" />
module WM.UI.Popup {
    export class DialogPanel extends Popup {
        text: string;
        image: string;//to be made
        Options: Array<DialogOption>;
        padding: number;
        SelectedOption: number;
        constructor(panel:any) {
            super(0, 0, G.MapWidth, G.MapHeight);

            this.padding = 10;           
            this.Options = new Array<DialogOption>();            
            for (var j = 0; j < panel.options.length; j++) {
                var option = panel.options[j];
                if (Event.Effect.Happens(option.conditions)) {
                    this.BuildOption(option);
                }
            }
            this.image = panel.img;  
            this.text = panel.text;  
            this.SelectedOption = 0;          
        }

        BuildOption(option: any): DialogOption {
            var self = this;
            var effects = function () {
                for (var i = 0; i < option.effects.length; i++) {
                    Event.Effect.Call(option.effects[i])();
                }
                self.Close();
            }
            var eopt = new DialogOption(option.text, G.MapWidth, 70, effects);  
            eopt.y += 200 + ((this.Options.length - 1) * eopt.h);
            this.Options.push(eopt);
            //this.add(eopt);
            return eopt;
        }

        HandleInput(dir:string) {
            //this.Options[this.SelectedOption].button.tint = 0xeeeeee;
            if (dir=="down") {
                this.SelectedOption++;
                this.SelectedOption = (this.SelectedOption > this.Options.length - 1) ? 0 : this.SelectedOption;
                
            }
            else if(dir=="up") {
                this.SelectedOption--;
                this.SelectedOption = (this.SelectedOption < 0) ? this.Options.length - 1 : this.SelectedOption;
            }
            else
                this.Options[this.SelectedOption].onClick();
            //this.Options[this.SelectedOption].button.tint = 0xaaaaee;
        }

    }
}  