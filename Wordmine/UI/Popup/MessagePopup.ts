/// <reference path="../../_reference.ts" />
module WM.UI.Popup {
    export class MessagePopup extends Popup {
        Message: string;
        Image: string;
        //CloseButton: DialogOption;        
        Padding: number;    
        constructor(message: string, img: string= null, onClose: Function=null,onCloseContext:any = null) {
            super(0, 0, G.MapWidth, G.MapHeight, onClose,onCloseContext);
            this.Padding = 10;            
            this.Image = img;  
            this.Message = message;


                        //this.Message = this.add(new Phaser.Text(this.Game, this.Padding, this.Padding, message, G.style));                      
            //this.CloseButton = this.add(new TextButton(this.Game, "okay", G.MapWidth, 70, this.Close, this, "#ddf"));
            //this.CloseButton.y = G.MapHeight-(70+ this.Padding);
        }
        Open() {
            super.Open();
            var text = $("<div class='popup_text'>" + this.Message + "</div>");
            var closeButton = $("<button >Close</button>");
            var self = this;
            closeButton.click(function () { console.log("click close"); self.Close();});
            this.view.append(text);
            this.view.append(closeButton);
        }


        HandleInput(dir: string) {
            this.Close();

        }
    }
}  