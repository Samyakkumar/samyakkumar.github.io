class Window{
    constructor(x, y, length, width,title, p) {
        this.x = x;
        this.y = y;
        this.length = length;
        this.width = width;
        this.p = p;
    }

    show() {
        this.p.fill(0, 0, 0);
        this.p.rect(this.x - this.length, this.y - this.width, this.x + this.length, this.y + this.width);
        this.p.fill(255, 255, 255)
        this.p.rect(this.x - this.length + 5.4*this.length , this.y - this.length, this.x + this.length - 5.4*this.length, this.y + this.length - 4.8*this.length)
        this.p.rect(this.x - this.length + 5.1*this.length , this.y - this.length, this.x + this.length - 5.4*this.length, this.y + this.length - 4.8*this.length)
        this.p.rect(this.x - this.length + 4.8*this.length , this.y - this.length, this.x + this.length - 5.4*this.length, this.y + this.length - 4.8*this.length)


    }
}

export default Window;