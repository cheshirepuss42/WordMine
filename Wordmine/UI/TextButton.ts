module WM.UI {
    export class TextButton { 
        x: number;
        y: number;
        w: number;
        h: number;
        text: string;
        onClick: Function;
        constructor(text: string, width: number= 100, height: number= 50, callback?: Function,context?:Object,color:string="#eee") {
            this.onClick = callback;
            this.w = width;
            this.h = height;        
            this.text =text;
            this.Hide();
            
        }
        Hide() {
           
        }
        Show() {
           
        }
    }

}