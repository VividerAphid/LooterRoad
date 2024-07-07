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
}