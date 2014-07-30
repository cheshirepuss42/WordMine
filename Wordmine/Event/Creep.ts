/// <reference path="../_reference.ts" />
module WM.Event {
    export class Creep extends RoomEvent{
        
        InfoPanel: UI.Popup.MessagePopup;
        ResultPanel: UI.Popup.MessagePopup;
        Data: CreepData;
        constructor(name) {
            super("creep");
            this.Data = new CreepData(G.creeps[name]);
            this.ResultPanel = new UI.Popup.MessagePopup("result", null, this.Resolve, this);
            this.InfoPanel = new UI.Popup.MessagePopup("blaaa", null, this.ResultPanel.Open, this.ResultPanel);
        }
        Handle() {
            this.InfoPanel.Open();
        }
        Resolve() {
            super.Resolve(true);
            wm.toCombat(this.Data);
        }
    }
    export class CreepData {
        Name: string;
        Description: string;
        Image: string;
        Attack: number;
        Defense: number;
        Health: number;
        //CombatEffects: Array<Combat.CombatEffect>;
        Reward: Treasure;
        constructor(data: any) {
            this.Name = data['name'];
            this.Description = data['descr'];
            this.Image = data['img'];
            this.Attack = data['a'];
            this.Defense = data['d'];
            this.Health = data['h'];
            this.Reward = new Treasure(data['reward']);
            //this.CombatEffects = new Array<Combat.CombatEffect>();
            //if (data['fx'] !== undefined) {
            //    for (var i = 0; i < data['fx'].length; i++) {
            //        this.CombatEffects.push(new Combat.CombatEffect(data['fx'][i]));
            //    }
            //}
        }


    }
} 