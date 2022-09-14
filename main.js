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

function SelectMapIcon(biomeType,biomePassable){
    if(biomeType == "water")
    {
        if(biomePassable == false){
            return "≈"
        }
        else{
            return "~" //TODO add other ground icons
        }
    }
    else{
        if(biomePassable == false){
            return "Δ"
        }
        else{
            return "." //TODO add other ground icons
        }
    }
    
}
class Biome{
    constructor(_type,_name,_passable){
        this.type = _type;
        this.name = _name;
        this.passable = _passable;
        this.iconChar = SelectMapIcon(this.type,this.passable);
    }
}

let forest = new Biome("land")

function AssignBiome(){

}

class Tile{
    constructor(_x,_y,_z){
        this.x = _x;
        this.y = _y;
        this.z = _z; //height (relative to sea level of tile) 
        this.passable;
        //this.biome = assignBiome();
        //this.iconChar = SelectMapIcon(this.passable);
        this.description = createDescription(this.biome);
        this.eventSelect = randomInt(3)
        if(this.eventSelect == 0){
            this.event = this.EventEnemy;
        }
        else if (this.eventSelect == 1){
            this.event = this.EventTreasure;
        }
    }
    CheckPassable(){
        if(this.z == 0){
            passable = false;
        }
        else{
            passable = true;
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
let player = new Player("Bill")

player.inventory.push(new Item("apple",5))


var mapSize = 20;
var yPos = 5;
var xPos = 5;
var map = [];

function SmoothMap(){
    for(let i = 0; i < map.length; i++ ){
        //get tile
        let tile = map[i];
        if(!(tile.x == 1 || tile.x == mapSize || tile.y == 1 || tile.y == mapSize)){
            let neighbourTotal = 0;
            for(let j = 0; j < map.length; j++ ){
                //get n tile
                let neighbourTile = map[j];
                if((neighbourTile.x == tile.x -1 || neighbourTile.x == tile.x +1) && (neighbourTile.y == tile.y -1 || neighbourTile.y == tile.y +1)){
                    neighbourTotal += neighbourTile.z
                }
                if(neighbourTotal != 0){
                    if(neighbourTotal / 4 > tile.z){
                        tile.z += 1;
                        if(tile.z >= 9){
                            tile.z = 9;
                        }
                    }
                    else{
                        tile.z -= 1;
                        if(tile.z <= 0){
                            tile.z = 0;
                        }
                    }
                }
            }
        }
    }
}

function WorldGen(){
    //creates all tiles
    for(let x = 1; x <= mapSize; x++ ){
        for(let y = 1; y <= mapSize; y++ ){
            let newTile = new Tile(x,y,randomInt(9))
            map.push(newTile)
           
        }
    }
    //creates walls (tiles of height 0)
    for(let i = 0; i < map.length; i++ ){
        //get tile
        let tile = map[i];
        if(tile.x == 1 || tile.x == mapSize || tile.y == 1 || tile.y == mapSize)
        {
            tile.z = 0;
        }
    }
    //smooth map
    SmoothMap()
    SmoothMap()
    SmoothMap()
    //start game
    GameTick()
}

function GameTick(){
    let mapString = "";
    let location = null;
    for(let i = 0; i < map.length; i++ ){
        if (i % mapSize == 0){
            mapString += "<br>"
            console.log("new line")
        }
        //console.log(map[i].x,map[i].y,map[i].description)
        if(map[i].x == xPos && map[i].y == yPos){
            location = map[i];
            if(location.event){
                location.event()
            }
            console.log(xPos,yPos,location.z)
            mapString += "#";
        }
        else{
            mapString += map[i].z;
            //mapString += map[i].iconChar;
        }
        
    }

    //show text in html doc
    document.getElementById("map-text").innerHTML = mapString;
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
