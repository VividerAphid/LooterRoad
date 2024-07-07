const chestTables = {
    "everything": {typeId: "everything", name:"Everything", table:[]},
    "coin_stash": {typeId: "coin_stash", name:"Coin Stash", table:[
        {id:"copper_coin", chance:50},
        {id:"silver_coin", chance:25},
        {id:"gold_coin", chance:10},
        {id:"two_dollar", chance:1},
    ]},
}

function loadEverythingTable(){
    //YES I KNOW THERE IS A BETTER WAY
    let table = [];
    let length = Object.keys(itemDefinitions).length;
    let keys = Object.keys(itemDefinitions);
    for(let r = 0; r < length; r++){
        let lootLine = {id:-1, chance:1};
        lootLine.id = keys[r];
        table.push(lootLine);
    }
    return table;
}

chestTables["everything"].table = loadEverythingTable();