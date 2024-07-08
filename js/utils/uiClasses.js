class UIElement{
    constructor(id, x, y, width, height){
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.children = "";
    }
    action(){
        console.log(this.id + " action!");
    }

    render(art){
        art.drawRect(this.x, this.y, this.width, this.height, "#f0f", true);
    }
}

class Game{
    constructor(mapUI, gameUI, draws, gameData){
        this.UI = {mapUI:mapUI, gameUI:gameUI};
        this.draws = draws;
        this.gameData = gameData;
        this.mode = "game";
    }
}