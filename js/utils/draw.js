class Draw{
    constructor(ctx, backColor){
        this.ctx = ctx;
        this.canvasBackColor = backColor;
        this.clearCanvas();
    }

    clearCanvas(){
        let can = this.ctx.canvas;
        this.ctx.beginPath();
        this.ctx.fillStyle = this.canvasBackColor;
        this.ctx.strokeStyle = this.canvasBackColor;
        this.ctx.fillRect(0,0, can.width, can.height);
    }

    drawInventory(){

    }

    drawTopBar(){
        
    }

    drawCircle(x, y, radius, colour){
        this.ctx.beginPath();
        this.ctx.fillStyle = colour;
        this.ctx.strokeStyle = colour;
        this.ctx.arc(x, y, (radius*2), 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawText(x, y, text, font, colour){
        this.ctx.fillStyle = colour;
        this.ctx.strokeStyle = colour;
        this.ctx.font = font;
        this.beginPath();
        this.ctx.fillText(text, x, y);
        this.stroke();
    }

    drawRing(x, y, radius, colour, width){
        this.ctx.strokeStyle = colour;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }
}