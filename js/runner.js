(function(){
    // let testChestTemplate = new ChestTemplate(1, chestTables.everything);
    // console.log(testChestTemplate);
    // console.log(testChestTemplate.pickLoot(5));
    // let coinChestTemplate = new ChestTemplate(2, chestTables.everything);
    // let testChest = new Chest(10, coinChestTemplate, coinChestTemplate.pickLoot(15));
    // console.log(testChest);

    let gameUIs = [new UIElement("MapBtn", 10, 10, 50, 50)];
    let mapUIs = [new UIElement("CloseBtn", 10, 10, 50, 50)];

    gameUIs[0].action = function(){
        toggleMap("inline");
        gameSession.mode = "map";
    };
    mapUIs[0].action = function(){
        toggleMap("none");
        gameSession.mode = "game";
    };

    document.getElementById("gameCanvas").onclick = function(e){
        let coords = getClickCoords(e);
        let result = checkClickHit(coords, gameUIs);
        console.log(result);
        if(result != false){
            result.action();
            render(gameSession);
        }
        //toggleMap("inline");
    };

    document.getElementById("mapCanvas").onclick = function(e){
        let coords = getClickCoords(e);
        let resultUI = checkClickHit(coords, mapUIs);
        //console.log(resultUI);
        if(resultUI != false){
            resultUI.action();
            render(gameSession);
        }
        let resultGame = checkClickHit(coords, gameSession.gameData.map);
        if(resultGame != false){
            checkMapProxy(gameSession.gameData.map[0], resultGame);
        }
        //toggleMap("none");
    };

    let gameDraw = new Draw(document.getElementById("gameCanvas").getContext('2d'), "#200");
    let mapDraw = new Draw(document.getElementById("mapCanvas").getContext('2d'), "#020");

    let gameMap = generateMapSingleLane();

    let gameSession = new Game(mapUIs, gameUIs, {gameDraw:gameDraw, mapDraw:mapDraw}, {map:gameMap});

    render(gameSession);
    
})();