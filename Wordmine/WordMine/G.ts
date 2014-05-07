module WM {
    export class G {  
        static CellSize: number = 32;
        static GameWidth: number = 1024;
        static GameHeight: number = 672;
        static RoomWidth: number = 15;
        static RoomHeight: number = 11;
        static LevelWidth: number = 3;
        static LevelHeight: number = 3;
        static get MapWidth(): number { return this.CellSize * this.RoomWidth; }
        static get MapHeight(): number { return this.CellSize * this.RoomHeight; }
        static style: any = { font: "16px Arial" };
        //data for roomsections, might move this to seperate thing and preload it, same for events
        static RoomSections: any = [
            {
                "type": "fourth",
                "grid": [
                    "XXX.XX",
                    "X.....",
                    "X..XXX",
                    "X..Xtt"]
            },
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
        static events: any = {
            "first": {
                panels: [
                    {
                        text: "You meet a lonely traveler.\n His boots seem different than the rest of his clothes.",
                        img: "fdgfg",
                        options: [
                            { text: "Kill him for his boots", conditions: ["*Player.Health > 5"], effects: ["*Player.Health / 2", 1] }
                        ]
                    },
                    {
                        text: "You kill the traveler in a particulary brutal way.",
                        img: "fdgfg",
                        options: [
                            { text: "Get the boots.", conditions: ["*Player.Health > 5"], effects: ["*Player.Health - 2", -1] },
                            { text: "Eat the corpse. Then get the boots.", conditions: ["*Player.Health > 1"], effects: ["*Player.Health + 5", -1] }
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