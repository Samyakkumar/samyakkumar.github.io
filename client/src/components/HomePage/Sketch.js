function sketch(p) {
    let term;
    let resume;
    let icons;
    let textLoc;
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // term = terminal;
        textLoc = [p.windowWidth / 2 - 100, p.windowHeight / 2];
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        //p.createCanvas(p.windowWidth, p.windowHeight);
        term = new Icon(props.img[0], "Terminal", p.windowWidth / 2 - 50, p.windowHeight / 2 + 50, p);
        resume = new Icon(props.img[1], "Resume", p.windowWidth / 2 + 50, p.windowHeight / 2 + 50, p);
        icons = [term, resume];
        
    }
    p.mousePressed = () => {
        console.log("press")
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].mouseIn(p.mouseX, p.mouseY)) {
                console.log(icons[i].label);
            }

        }
    }

    p.draw = function () {
        //p.background(100, 0, 0, 0);
        
        p.fill(255)
        .strokeWeight(0)
        .textSize(50);
        p.textStyle(p.ITALIC);
        p.text("Hello World", textLoc[0], textLoc[1]);

        try {
            for (let i = 0; i < icons.length; i++) {
                icons[i].show();
            }
        } catch {
            console.log("image still loading")
        } finally {
            console.log();
        }
    }
}


class Icon {
    constructor(img, label, x, y, p) {
        this.img = p.loadImage(img);
        this.label = label;
        this.x = x;
        this.y = y;
        this.p = p;
    }

    show() {
        this.p.smooth();
        this.p.image(this.img, this.x, this.y);
        this.p.fill(255)
        .strokeWeight(0)
        .textSize(15);
        this.p.textStyle(this.p.ITALIC);
        this.p.text(this.label, this.x - 8, this.y + 64);
    }

    mouseIn( x,  y) {
        return (x >= this.x - 50 && x <= this.x + 50 && y <= this.y + 50 && y >= this.y - 50);
    }
    
}

export default sketch;