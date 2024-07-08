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
    map.push(new JourneyNode(1, 250, 25, [], "start"));
    currentSteps++;
    let laneRange = 50;
    let laneYRange = 10;
    let yMin = 29;
    let leftMin = 160;
    let centerMin = 225;
    let rightMin = 290;

    let L1= map[0],R1= map[0],C= map[0];
    let L2,R2 ="";
    let id = 2;
    // map.push(new JourneyNode(2, (Math.floor(Math.random()*laneRange)+leftMin), (Math.floor(Math.random()*laneYRange)+45), [map[0]], "blank"));
    // map.push(new JourneyNode(3, (Math.floor(Math.random()*laneRange)+centerMin), (Math.floor(Math.random()*laneYRange)+45), [map[0]], "blank"));
    // map.push(new JourneyNode(4, (Math.floor(Math.random()*laneRange)+rightMin), (Math.floor(Math.random()*laneYRange)+45), [map[0]], "blank"));
    // map[0].connections.push(map[1],map[2],map[3]);
    for(currentSteps; currentSteps < maxSteps; currentSteps++){
        let x = (Math.floor(Math.random()*laneRange)+centerMin);
        let y = (Math.floor(Math.random()*laneYRange)+(currentSteps*yMin)) + 20;
        let cons = [C];
        let newNode = new JourneyNode(id, x, y, cons, "C");
        map.push(newNode);
        id++;
        C.connections.push(newNode);
        C = newNode;
        if((Math.random() > .4) && currentSteps < 49){
            let x = (Math.floor(Math.random()*laneRange)+leftMin);
            let y = (Math.floor(Math.random()*laneYRange)+(currentSteps*yMin))+ 20;
            let cons = [];
            if(L1){cons.push(L1);}
            else{cons.push(C)}
            let newNode = new JourneyNode(id, x, y, cons, "L");
            map.push(newNode);
            id++;
            if(L1){L1.connections.push(newNode);}
            else{C.connections.push(newNode)}
            L1 = newNode;
        }
        else{
            if(L1){
                C.connections.push(L1);
                L1.connections.push(C);
                L1 = "";
            }
        }
        if((Math.random() > .4) && currentSteps < 49){
            let x = (Math.floor(Math.random()*laneRange)+rightMin);
            let y = (Math.floor(Math.random()*laneYRange)+(currentSteps*yMin))+ 20;
            let cons = [];
            if(R1){cons.push(R1);}
            else{cons.push(C)}
            let newNode = new JourneyNode(id, x, y, cons, "L");
            map.push(newNode);
            id++;
            if(R1){R1.connections.push(newNode);}
            else{C.connections.push(newNode)}
            R1 = newNode;
        }
        else{
            if(R1){
                C.connections.push(R1);
                R1.connections.push(C);
                R1 = ""
            }
        }
    }
    console.log(map);
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