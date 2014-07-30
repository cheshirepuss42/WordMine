/// <reference path="../_reference.ts" />
module WM.Event {

    export class RoomEvent {
        //this should be the base class or base interface for anything on the map that makes something happen
        //like a creep, or a dialog, or finding treasure, or opening a door
        //is activated when moving onto a cell
        //should be chainable:creepintro->combat or dialog->creepintro->combat
        //input should be based on a tileChar
        //then get 
        //tileChar->random creep->creepintro->combat
        //i derive from the tilechar which type of event is needed then store in the cell the object that does 
        Type: string;
        constructor(type: string) {
            this.Type = type;
            //pick one from the list
            //
        }
        Handle() {
        }
        Resolve(clearEvent: boolean) {
            if (clearEvent) {                
                wm.targetCell.Event = null;
                wm.player.Cell = wm.targetCell;
            }
            //wm.drawCell(wm.targetCell.RoomX,wm.targetCell.RoomY);
        }

    }
} 
