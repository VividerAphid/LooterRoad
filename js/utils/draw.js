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

    drawCircle(x, y, radius, color){
        this.ctx.beginPath();
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.arc(x, y, (radius*2), 0, 2*Math.PI);
        this.ctx.fill();
        this.ctx.stroke();
    }

    drawText(x, y, text, font, color){
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.font = font;
        this.beginPath();
        this.ctx.fillText(text, x, y);
        this.stroke();
    }

    drawRing(x, y, radius, color, width){
        this.ctx.strokeStyle = color;
        this.ctx.lineWidth = width;
        this.ctx.beginPath();
        this.ctx.arc(x, y, radius, 0, 2*Math.PI);
        this.ctx.stroke();
    }

    drawRect(x, y, width, height, color, filled){
        this.ctx.fillStyle = color;
        this.ctx.strokeStyle = color;
        this.ctx.beginPath();
        if(filled){
            this.ctx.fillRect(x, y, width, height);
        }
        else{
            this.ctx.rect(x, y, width, height);
        }
        this.ctx.stroke();
    }
}