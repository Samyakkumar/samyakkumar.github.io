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
    }
}

export default Window;