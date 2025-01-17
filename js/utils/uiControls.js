function toggleMap(mode){
    document.getElementById("mapDiv").style.display = mode;
}

function getClickCoords(e) {
    // e = Mouse click event.
    var rect = e.target.getBoundingClientRect();
    var x = e.clientX - rect.left; //x position within the element.
    var y = e.clientY - rect.top;  //y position within the element.
    //console.log("x : " + x + " ; y : " + y);
    return([x,y]);
}

function checkClickHit(coords, elements){
    for(let r = 0; r < elements.length; r++){
        if(coords[0] >= elements[r].x && coords[0] <= (elements[r].width + elements[r].x)){
            if(coords[1] >= elements[r].y && coords[1] <= (elements[r].height + elements[r].y)){
                //console.log("hit");
                return elements[r];
            }
        }
    }
    return false;
}

function checkMapProxy(playerNode, clickedNode){
    if(playerNode.connections.includes(clickedNode)){
        console.log("Valid move");
    }
}