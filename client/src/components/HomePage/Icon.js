import Window from "./Window";

class Icon {
    constructor(img, label, x, y, p) {
        this.img = img;
        this.label = label;
        this.x = x;
        this.y = y;
        this.p = p;
        this.foundImg = p.loadImage(this.img)
        this.isShowWindow = false;
    }

    show() {
        this.p.smooth();
        this.p.image(this.foundImg, this.x, this.y);
        this.p.fill(255)
        .strokeWeight(0)
        .textSize(15);
        this.p.textStyle(this.p.ITALIC);
        this.p.text(this.label, this.x - 8, this.y + 64);
        if (this.isShowWindow) {
            this.showWindow();
        }
    }

    mouseIn( x,  y) {
        return (x >= this.x && x <= this.x + 50 && y <= this.y + 50 && y >= this.y - 50);
    }

    showWindow() {
        let newWindow = new Window(this.p.windowWidth / 2 - 80, this.p.windowHeight/ 2 - 80, 80, 80, this.label, this.p);
        newWindow.show();
    }
    
}

export default Icon;