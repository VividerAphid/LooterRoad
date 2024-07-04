const chestTables = [
    {typeId: 1, name:"Everything", table:[]},
    {typeId: 2, name:"Coin Stash", table:[
        {id:1, chance:50},
        {id:2, chance:25},
        {id:3, chance:10},
    ]},
]

function loadEverythingTable(){
    let table = [];
    for(let r = 0; r < itemDefinitions.length; r++){
        let lootLine = {id:-1, chance:1};
        lootLine.id = itemDefinitions[r].id;
        table.push(lootLine);
    }
    return table;
}

chestTables[0].table = loadEverythingTable();