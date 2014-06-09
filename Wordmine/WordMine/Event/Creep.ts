/// <reference path="../_reference.ts" />
module WM.Event {
    export class Creep extends RoomEvent{
        constructor() {
            super("creep");
            //first show creep info, then the combat screen, then the combat results
        }
    }
} 