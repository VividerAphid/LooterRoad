function render(session){
    //render UI
    let UIelements = "";
    let drawFunc = "";
    let draw = "";
    switch(session.mode){
        case "game": 
            UIelements = session.UI.gameUI;
            draw = session.draws.gameDraw;
            drawFunc = function(){console.log("main");};
            break;
        case "map":
            UIelements = session.UI.mapUI;
            draw = session.draws.mapDraw;
            drawFunc = renderMap;
            break;
    }
    draw.clearCanvas();
    drawFunc(session, draw);
    //Draw active window UI elements
    for(let r = 0; r < UIelements.length; r++){
        UIelements[r].render(draw);
    }
}

function generateMap(){
    let map = [];
    let maxSteps = 50;
    let currentSteps = 0;
    map.push(new JourneyNode(1, 250, 10, [], "start"));
    currentSteps++;
    let branches = Math.floor(Math.random()*3) + 1;
    let nodeWidthSpan = 250;
    let spanIncrement = nodeWidthSpan / branches;
    for(let r = 0; r < branches; r++){
        let x = (r*spanIncrement) + 125;
        let y = (currentSteps*20) + 20;
        map.push(new JourneyNode(r+2, x, y, [map[0]],"blank"));
        map[0].connections.push(map[r+1]);
    }
    
    //console.log(map);
    return map;
}

function generateMapSingleLane(){
    let map = [];
    let maxSteps = 50;
    let currentSteps = 0;
    map.push(new JourneyNode(1, 250, 25, [], "start"));
    currentSteps++;
    for(currentSteps; currentSteps < maxSteps; currentSteps++){
        let x = Math.floor(Math.random()*150) +200;
        let y = (currentSteps*29) + 29;
        map.push(new JourneyNode(currentSteps+1, x, y, [map[currentSteps-1]], "blank"));
        map[currentSteps-1].connections.push(map[currentSteps]);
    }
    return map;
}

function renderMap(session, draw){
    let map = session.gameData.map;
    for(let r = 0; r < map.length; r++){
        map[r].drawConnections(draw);
    }
    for(let r = 0; r < map.length; r++){
        map[r].drawNode(draw);
    }
}