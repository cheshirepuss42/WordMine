module WM.UI.Popup {
    export class Popup extends Phaser.Group{
        Background: Phaser.Sprite;
        Game: Phaser.Game;
        OnClose: Function;
        OnCloseContext: any;

        constructor(x: number, y: number, w: number, h: number,onClose:Function=null,onCloseContext:any=null) {
            this.Game = wm.Level.game;
            super(this.Game, null, "popup", false);
            this.OnClose = onClose;
            this.OnCloseContext = onCloseContext;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.Background = this.add(new Phaser.Image(this.Game, 0, 0, FilledRect.getBMD(this.Game, w, h, "#eee"), null));
        }
        Open() {
            this.Game.add.existing(this);
            this.Show();
            wm.Level.Popup = this;        
        }
        //close popup and return the result
        Close() {
            this.Hide();  
            if(this.OnClose!=null)          
                this.OnClose.call(this.OnCloseContext); 
            wm.Level.Popup = null;        
        }
        HandleInput(input: string) {
        }
        Show() {
            this.Background.exists = this.Background.visible = true;
        }
        Hide() {
            this.Background.exists = this.Background.visible = false;
        }

    }
}