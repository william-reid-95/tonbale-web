//rpg web game 

let tilePrefixes = ["dry","wet","cold","dark","sunny","windy"];
let tileBiomeTypes = ["rocky","grassy","swampy","sandy"];
let tileTerrainTypes = ["fields","jungle","hills","mountains","forest","crags","plains"]

let firstNames = [
    "Tami",
    "Jai",
    "Fleya",
    "Rye",
    "Eddena",
    "Gaden",
    "Vyn",
    "Peri",
    "Orthur",
    "Lilyi",
    "Kaeda",
    "Ephrais",
    "Jevelyn",
    "Reulog",
    "Rián",
    "Eilesti",
    "Clatharla",
    "Tinuiel",
    "Teshurr",
    "Seiveril",
    "Finrod",
    "Mithrandir",
    "Morraen",
    "Barahad",
    "Elaria"
]

let lastNames = [
    "Tireoz",
    "Tanin",
    "Ktakl",
    "Hakkan",
    "Cerus",
    "Thanarg",
    "Remnac",
    "Gek",
    "Ulfryz",
    "Iedit",
    "Kulkodar",
    "Kynd",
    "Nedryz",
    "Temedius",
    "Zu",
    "Ogothr",
    "Laeros",
    "Wyn",
    "Drakus",
    "Cryn",
    "Kaida",
    "Gek",
    "Vespak",
    "Teirac",
]

let titlePrefixes = [
    "blood",
    "water",
    "stone",
    "rock",
    "earth",
    "sword",
    "fire",
    "heaven",
    "hell",
    "wind"
]

let titleSuffixes = [
    "drinker",
    "runner",
    "forger",
    "hunter",
    "master",
    "mage",
    "warrior",
    "priest",
    "slayer",
    "eater",
    "walker"
]


function randomInt(max){
    // inclusive, i.e max of 2 will return values between 0 and 1
    return Math.floor(Math.random() * max);
}

function randomBool(){
    if(randomInt(2) == 0){
        return false;
    }
    else{
        return true;
    }
}

function createDescription(){
    let prefix = tilePrefixes[randomInt(tilePrefixes.length)];
    let biome = tileBiomeTypes[randomInt(tileBiomeTypes.length)];
    let terrain = tileTerrainTypes[randomInt(tileTerrainTypes.length)];

    return "the " + prefix + ", " + biome + " " + terrain
}

function createName(){
    let firstName = firstNames[randomInt(firstNames.length)];
    let lastName = lastNames[randomInt(lastNames.length)];

    return firstName + " " + lastName
}

function createTitle(){
    let titlePrefix = titlePrefixes[randomInt(titlePrefixes.length)];
    let titleSuffix = titleSuffixes[randomInt(titleSuffixes.length)];

    return titlePrefix + "-" + titleSuffix
}

class Tile{
    constructor(_x,_y,){
        this.x = _x;
        this.y = _y;
        this.passable = randomBool();
        this.icon = this.SelectMapIcon();
        this.description = createDescription();
        this.eventSelect = randomInt(3)
        if(this.eventSelect == 0){
            this.event = this.EventEnemy;
        }
        else if (this.eventSelect == 1){
            this.event = this.EventTreasure;
        }
    }
    SelectMapIcon(){
        if(this.passable == false){
            this.icon = "#"
        }
        else{
            this.icon = "." //TODO add other ground icons
        }
    }
    EventEnemy(){
        this.character = new Character();
        console.log("enemy event triggered")
    }
    EventTreasure(){
        console.log("treasure event")
    }
}

class Item{
    constructor (_name,_value){
        this.name = _name,
        this.value = _value
    }
}

class Character{
    constructor () {
        this.name = createName;
        if(randomBool()){
            this.title = createTitle;
        }
    }
}

class Player{
    constructor(_name){
        this.name = _name;
        this.maxHp = 100;
        this.hp = 100;
        this.atk = 1;
        this.def = 1;
        this.mgk = 1;
        this.gold = 0;
        this.inventory = [];
    }

    myMethod(){
        //do stuff
    }
}


//init game

let mapSize = 10;
var yPos = 5;
var xPos = 5;


const map = [];

for( let x = 1; x <= mapSize; x++ ){
    for( let y = 1; y <= mapSize; y++ ){
        let newTile = new Tile(x,y)
        map.push(newTile)
       
    }
}

let player = new Player("Bill")

player.inventory.push(new Item("apple",5))

function GameTick(){
    let mapString = "";
    let location = null;
    for(let i = 1; i <= map.length-1; i++ ){
        //console.log(map[i].x,map[i].y,map[i].description)
        if(map[i].x == xPos && map[i].y == yPos){
            location = map[i];
            if(location.event){
                location.event()
            }
            console.log(xPos,yPos)
            break
        }
    }
    

    //show text in html doc
    document.getElementById("map-text").innerHTML = "you are in " + location.description;
    document.getElementById("main-text").innerHTML = "you are in " + location.description;
    document.getElementById("stats-text-name").innerHTML = player.name
    document.getElementById("stats-text-hp").innerHTML = "Hp: " + player.hp +"/"+player.maxHp;
    document.getElementById("stats-text-atk").innerHTML = "Atk: " + player.atk
    document.getElementById("stats-text-def").innerHTML = "Def: " + player.def
    document.getElementById("stats-text-mgk").innerHTML = "Mgk: " + player.mgk
    document.getElementById("stats-text-gold").innerHTML = "Gold: " + player.gold
}

function Button(xNew,yNew){
    xPos += xNew;
    yPos += yNew;
    GameTick();
}
