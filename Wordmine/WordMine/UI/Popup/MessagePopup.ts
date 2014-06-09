/// <reference path="../../_reference.ts" />
module WM.UI.Popup {
    export class MessagePopup extends Popup {
        Message: Phaser.Text;
        Image: string;
        CloseButton: DialogOption;        
        Padding: number;    
        constructor(message:string,effects:Function,img:string=null) {
            super(0, 0, G.MapWidth, G.MapHeight,effects);
            this.Padding = 10;            
            this.Image = img;  
            this.Message = this.add(new Phaser.Text(this.Game, this.Padding, this.Padding, message, G.style));                      
            this.CloseButton = this.add(new TextButton(this.Game, "okay", G.MapWidth, 70, this.Close, this, "#ddf"));
            this.CloseButton.y = G.MapHeight-(70+ this.Padding);
        }

        HandleInput(dir: string) {
            this.Close();

        }
        Show() {
            super.Show();
            this.CloseButton.visible = true;
            this.Message.visible = true;
            this.visible = this.exists = true;
        }
        Hide() {
            super.Hide();
            this.CloseButton.visible = false;
            this.Message.visible = false;
            this.visible = this.exists = false;            
        }
    }
}  