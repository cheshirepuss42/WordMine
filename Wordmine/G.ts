module WM {
    export class G {  
        static assets: string[] = ['t000.png'];
        static layerTypes: string[] = ['floor', 'wall', 'event','unmined'];
        static CellSize: number = 32;
        static GameWidth: number = 800;
        static GameHeight: number = 480;
        static RoomWidth: number = 15;
        static RoomHeight: number = 11;
        static LevelWidth: number = 5;
        static LevelHeight: number = 5;
        static CombatLetterWidth: number = 40;
        static CombatLetterHeight: number = 40;
        static get MapWidth(): number { return this.CellSize * this.RoomWidth; }
        static get MapHeight(): number { return this.CellSize * this.RoomHeight; }
        static get UIWidth(): number { return this.GameWidth - this.MapWidth; }
        static get UIHeight(): number { return this.MapHeight; }
        static style: any = { font: "16px Arial" };
        //data for roomsections, might move this to seperate thing and preload it, same for events
        static RoomSections: any = [
            {
                "type": "fourth",
                "grid": [
                    "XXX.XX",
                    "X..te.",
                    "X..XXX",
                    "X..Xcc"]
            }
            ,
            {
                "type": "fourth",
                "grid": [
                    ".....X",
                    "ttt..X",
                    ".....X",
                    "X.XXXX"]
            },
            {
                "type": "fourth",
                "grid": [
                    "XXX...",
                    "XX....",
                    ".X..tt",
                    ".X...."]
            },
            {
                "type": "fourth",
                "grid": [
                    "X..XXX",
                    ".X.tt.",
                    "..X.X.",
                    "....X."]
            },
            {
                "type": "fourth",
                "grid": [
                    "XXXXXX",
                    "XXX.X.",
                    "XX.tt.",
                    "XXXXXX"]
            },
            {
                "type": "fourth",
                "grid": [
                    "X..XXX",
                    ".X..tt",
                    "..X.X.",
                    "....X."]
            },
            {
                "type": "fourth",
                "grid": [
                    ".tt...",
                    "...X..",
                    "...X..",
                    "..tt.."]
            },
            {
                "type": "fourth",
                "grid": [
                    "XXXXXX",
                    "X...X.",
                    "X.ttte",
                    "XXXXXX"]
            }
            ,
            {
                "type": "fourth",
                "grid": [
                    "tX.t.X",
                    "eX.X.X",
                    ".X.X.X",
                    "...X.."]
            }
            ,
            {
                "type": "vertical",
                "grid": [   ".....X",
                            "XX....",
                            ".....X",
                            "XX..X.",
                            ".....X",
                            ".....X",
                            "XX..X.",
                            "...X..",
                            "XX.XXX"]
        }
            ,
            {
                "type": "horizontal",
                "grid": [   ".............",
                            ".XXXXXXXX.X..",
                            ".X...........",
                            "XX.XXXXXXXXXX"]
            }
        ]
        static creeps: any = {
            "normal": {
                attack: 10,
                defense: 10,
                name:"",
                descr:""
            }
        };
        static events: any = {
            "first": {
                panels: [
                    {
                        text: "You meet a lonely traveler.\n His boots seem different than the rest of his clothes.",
                        img: "fdgfg",
                        options: [
                            { text: "Kill him for his boots", conditions: ["*player.Health > 5"], effects: ["*player.Health / 2", 1] }
                        ]
                    },
                    {
                        text: "You kill the traveler in a particulary brutal way.",
                        img: "fdgfg",
                        options: [
                            { text: "Get the boots.", conditions: ["*player.Health > 5"], effects: ["*player.Health - 2", -1] },
                            { text: "Eat the corpse. Then get the boots.", conditions: ["*player.Health > 1"], effects: ["*player.Health + 5", -1] }
                        ]
                    }
                ]
            },
            "second": {
                panels: [
                    {
                        text: "The beast before you grumbles. \nIt's getting ready to fight.",
                        img: "fdgfg",
                        options: [
                            { text: "Try to calm it with your BeastCharm", conditions: ["has BeastCharm"], effects: ["lose BeastCharm", 1] },
                            { text: "Fight.", conditions: [], effects: ["fight", -1] }
                        ]
                    },
                    {
                        text: "The beast is charmed.\nIt hugs you and crushes the charm.\nThen it runs away.",
                        img: "fdgfg",
                        options: [
                            { text: "Ok.", conditions: [], effects: [-1] },
                        ]
                    }
                ]
            }
        }
    }    
} 