﻿/// <reference path="../../_reference.ts"/>
module WM.UI.Popup {
    export class Popup{
        view: JQuery;
        OnClose: Function;
        OnCloseContext: any;
        x: number;
        y: number;
        width: number;
        height: number;

        constructor(x: number, y: number, w: number, h: number,onClose:Function=null,onCloseContext:any=null) {
            this.OnClose = onClose;
            this.OnCloseContext = onCloseContext;
            this.x = x;
            this.y = y;
            this.width = w;
            this.height = h;
            this.view = wm.popupView;
            this.view.hide();
            
            //this.add(new Phaser.Image(this.Game, 0, 0, FilledRect.getBMD(this.Game, w, h, "#eee"), null));
        }
        Open() {
            this.view.show();
            //append("<div>bla</div>");
            //wm.view.append(this.view);
            //console.log(this.view);
            //console.log(wm.view);
            wm.popup = this;        
        }
        //close popup and return the result
        Close() {
            this.view.empty(); 
            this.view.hide();  
            if(this.OnClose!=null)          
                this.OnClose.call(this.OnCloseContext); 
            wm.popup = null;        
        }
        HandleInput(input: string) {
        }


    }
}