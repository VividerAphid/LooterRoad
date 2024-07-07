(function(){
    let testChestTemplate = new ChestTemplate(1, chestTables.everything);
    console.log(testChestTemplate);
    console.log(testChestTemplate.pickLoot(5));
    let coinChestTemplate = new ChestTemplate(2, chestTables.everything);
    let testChest = new Chest(10, coinChestTemplate, coinChestTemplate.pickLoot(15));
    console.log(testChest);


    document.getElementById("gameCanvas").onclick = function(){
        toggleMap("inline");
    };

    document.getElementById("mapCanvas").onclick = function(){
        toggleMap("none");
    };
})();