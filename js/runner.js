(function(){
    let testChestTemplate = new ChestTemplate(1, chestTables.everything);
    console.log(testChestTemplate);
    console.log(testChestTemplate.pickLoot(5));
    let coinChestTemplate = new ChestTemplate(2, chestTables.everything);
    let testChest = new Chest(10, coinChestTemplate, coinChestTemplate.pickLoot(15));
    console.log(testChest);

    let gameUIs = [new UIElement("MapBtn", 10, 10, 50, 50)];
    let mapUIs = [new UIElement("CloseBtn", 10, 10, 50, 50)];

    gameUIs[0].action = function(){toggleMap("inline")};
    mapUIs[0].action = function(){toggleMap("none")};

    document.getElementById("gameCanvas").onclick = function(e){
        let coords = getClickCoords(e);
        let result = checkClickHit(coords, gameUIs);
        console.log(result);
        if(result != false){
            result.action();
        }
        //toggleMap("inline");
    };

    document.getElementById("mapCanvas").onclick = function(e){
        let coords = getClickCoords(e);
        let result = checkClickHit(coords, mapUIs);
        console.log(result);
        if(result != false){
            result.action();
        }
        //toggleMap("none");
    };

    let gameDraw = new Draw(document.getElementById("gameCanvas").getContext('2d'), "#200");
    let mapDraw = new Draw(document.getElementById("mapCanvas").getContext('2d'), "#020");
})();