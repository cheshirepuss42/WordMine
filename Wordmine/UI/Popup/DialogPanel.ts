/// <reference path="../../_reference.ts" />
module WM.UI.Popup {
    export class DialogPanel extends Popup {
        data: any;
        text: string;
        image: string;//to be made
        Options: Array<DialogOption>;
        padding: number;
        SelectedOption: number;
        constructor(panel:any) {
            super(0, 0, G.MapWidth, G.MapHeight);
            
            this.padding = 10;           
            this.data = panel;
        }
        Open() {
            
            this.image = this.data.img;  
            this.text = this.data.text;
            
            this.view.append(new Label(this.text).view);
            this.Options = new Array<DialogOption>();            
            for (var j = 0; j < this.data.options.length; j++) {
                var option = this.data.options[j];
                if (Event.Effect.Happens(option.conditions)) {   
                    this.Options.push(this.BuildOption(option));                      
                }
            }  
            this.SelectedOption = 0; 
            super.Open();
        }
        BuildOption(option: any): DialogOption {
            var self = this;
            var effects = function (e) {
                e.stopPropagation();
                for (var i = 0; i < option.effects.length; i++) {
                    Event.Effect.Call(option.effects[i])();
                }
            }
            var eopt = new DialogOption(option.text, effects);  
            this.view.append(eopt.view);
          
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