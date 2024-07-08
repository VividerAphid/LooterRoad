class Container{
    constructor(size){
        this.inventory = new Inventory(size);
    }
}

class Chest extends Container{
    constructor(size, tId, loot){
        super(size);
        this.tId = tId;
        this.loadContents(loot);
    }
    loadContents(loot){
        for(let r = 0; r < loot.length; r++){
            let it = new Item(itemDefinitions[loot[r]]);
            this.inventory.addItem(it, 1);
        }
    }
}

class Item{
    constructor(tId){
        //tId is pointer to itemTemplate
        this.tId = tId;
        this.name = tId.name; //For potential player renaming?
        this.value = tId.value;
    }
    augment(item){
        if(this.tId.stats.canAugment){
            this.name = item.name + " " + this.name;
            this.value = Math.round(item.value * .9) + this.value;
        }
        else{
            console.log("This item is not augmentable!");
        }
    }
    craft(){
        if(this.stats.craftable){
            let becomes = this.stats.becomes;
            return [itemDefinitions[becomes], this.stats.craftAmount];
        }
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
        for(let r = 0; r < this.lootTable.table.length; r++){
            let lootItem = this.lootTable.table[r];
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
            //console.log("Adding to stack");
            let stack = this.items[this.findOpenStack(item)];
            stack.amount += count;
            return true;
        }
        else{
            if(this.checkOpenSlots()){
                //console.log("New stack");
                this.items.push({itemId: item.tId.id, amount:count});
                return true;
            }
            else{
                //console.log("Inventory full!");
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

class JourneyNode{
    constructor(id, x, y, cons, type){
        this.id = id;
        this.x = x;
        this.y = y;
        this.connections = cons;
        this.type = type;
        this.visited = false;
    }
    
    drawNode(art){
        art.drawCircle(this.x, this.y, 3, "#f00");
    }
    drawConnections(art){
        for(let r = 0; r < this.connections.length;r++){
            let con = this.connections[r];
            if(con.id > this.id){
                art.ctx.beginPath();
                art.ctx.strokeStyle = "#f00";
                art.ctx.fillStyle = "#f00";
                art.ctx.moveTo(this.x, this.y);
                art.ctx.lineTo(con.x, con.y);
                art.ctx.stroke();
            }
        }
    }
}