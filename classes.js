class Chest{
    constructor(id, tId, loot){
        this.id = id;
        this.tId = tId;
        this.loot = loot;
    }
}

class Item{
    constructor(id, tId){
        //tId is pointer to itemTemplate
        this.id = id;
        this.tId = tId;
        this.name = tId.name;
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
    constructor(id, name, value, stackSize, tags, stats){
        this.id = id;
        this.name = name;
        this.value = value;
        this.stackSize = stackSize;
        this.tags = tags;
        if(stats){this.stats = stats;}
    }
}

class Character{
    constructor(id, name, inventory){
        this.id = id;
        this.name = name;
        this.inventory = inventory;
    }
}

class Inventory{
    constructor(maxSlots){
        this.maxSlots = maxSlots;
        this.items = [];
    }
    addItem(item, count){
        if(this.checkOpenStacks(item)){
            console.log("Adding to stack");
            let stack = this.items[this.findOpenStack(item)];
            stack.amount += count;
            return true;
        }
        else{
            if(this.checkOpenSlots()){
                console.log("New stack");
                this.items.push({itemId: item.tId.id, amount:count});
                return true;
            }
            else{
                console.log("Inventory full!");
                return false;
            }
        }
    }
    removeItem(){

    }
    checkOpenSlots(){
        //find if there are any more open slots
        if(this.items.length < this.maxSlots){
            return true;
        }
        return false;
    }
    checkOpenStacks(item){
        //find if there is an open stack for this item
        for(let r = 0; r < this.items.length; r++){
            if(this.items[r].itemId == item.tId.id){
                if(this.items[r].amount < item.tId.stackSize){
                    return true;
                }
            }
        }
        return false;
    }
    findOpenStack(item){
        //return index of open stack
        for(let r = 0; r < this.items.length; r++){
            if(this.items[r].itemId == item.tId.id){
                if(this.items[r].amount < item.tId.stackSize){
                    return r;
                }
            }
        }
        return false;
    }
}