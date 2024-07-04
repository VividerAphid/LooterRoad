class Chest{
    constructor(id, tId, loot){
        this.id = id;
        this.tId = tId;
        this.loot = loot;
    }
}

class Item{
    constructor(id, tId, value, tags, stats){
        //tId from template
        this.id = id;
        this.tId = tId;
        this.value = value;
        this.tags = tags;
        if(stats){this.stats = stats;}
    }

}

class ChestTemplate{
    constructor(typeId, lootTable){
        this.typeId = typeId;
        this.lootTable = lootTable; //Items defined as [id, chance] with chance out of 100
        this.chanceList = this.genChanceList();
    }
    pickLoot(itemCount){
        let loot = [];
        for(let r = 0; r < itemCount; r++){
            let pick = Math.floor(Math.random()*this.chanceList.length);
            loot.push(this.chanceList[pick]);
        }
        return loot;
    }
    genChanceList(){
        let list = [];
        for(let r = 0; r < this.lootTable.length; r++){
            let lootItem = this.lootTable[r];
            for(let t = 0; t < lootItem.chance; t++){
                list.push(lootItem.id);
            }
        }
        return list;
    }
}

class ItemTemplate{
    constructor(id, name, value, tags, stats){
        this.id = id;
        this.name = name;
        this.value = value;
        this.tags = tags;
        if(stats){this.stats = stats;}
    }
}