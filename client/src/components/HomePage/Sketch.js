function sketch(p) {
    let term;
    let resume;
    let icons;
    let textLoc;
    let particles;
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // term = terminal;
        textLoc = [p.windowWidth / 2 - 100, p.windowHeight / 2];
        particles = new Particles(80, p.color(255, 255, 255, 80), p);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        //p.resizeCanvas(p.windowWidth, p.windowHeight);
        term = new Icon(props.img[0], "Terminal", p.windowWidth / 2 - 100, p.windowHeight / 2 + 10, p);
        resume = new Icon(props.img[1], "Resume", p.windowWidth / 2, p.windowHeight / 2 + 10, p);
        icons = [term, resume, new Icon(props.img[1], "Randomn", p.windowWidth / 2 + 100, p.windowHeight / 2 + 10, p), 
        new Icon(props.img[1], "Random 1", p.windowWidth / 2 - 100, p.windowHeight / 2 + 110, p), 
        new Icon(props.img[1], "Random 2", p.windowWidth / 2, p.windowHeight / 2 + 110, p),
        new Icon(props.img[1], "Random 3", p.windowWidth / 2 + 100, p.windowHeight / 2 + 110, p)];
        
    }
    p.windowResized = () => {
        p.resizeCanvas(p.windowWidth, p.windowHeight);
        updateVars();
      }
    
    p.mousePressed = () => {
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].mouseIn(p.mouseX, p.mouseY)) {
                console.log(icons[i].label);
            }

        }
    }

    function dayOfWeekAsString(dayIndex) {
        return ["Sunday", "Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"][dayIndex];
      }

    function getCurrDay() {
        var d= new Date();
        var ans = dayOfWeekAsString(d.getDay());
        return ans;
    }

    function updateVars() {
        icons[0] = new Icon(icons[0].img, "Terminal", p.windowWidth / 2 - 100, p.windowHeight / 2 + 10, p)
        icons[1] = new Icon(icons[1].img, "Resume", p.windowWidth / 2, p.windowHeight / 2 + 10, p);
        icons[2] = new Icon(icons[2].img, "Randomn", p.windowWidth / 2 + 100, p.windowHeight / 2 + 10, p);
        icons[3] = new Icon(icons[3].img, "Random 1", p.windowWidth / 2 - 100, p.windowHeight / 2 + 110, p);
        icons[4] = new Icon(icons[4].img, "Random 2", p.windowWidth / 2, p.windowHeight / 2 + 110, p);
        icons[5] = new Icon(icons[5].img, "Random 3", p.windowWidth / 2 + 100, p.windowHeight / 2 + 110, p);
    }

    p.draw = function () {
        p.background(182,25,36);

        p.fill(255)
        .strokeWeight(0)
        .textSize(18);
        p.text(getCurrDay() + "  " + p.hour()+ " : " + p.minute() + " : " + p.second(), p.windowWidth / 2 - 70, 50);
        if (p.hour() >= 12) {
            p.text("PM", p.windowWidth / 2 + 110, 50);
        } else {
            p.text("AM", p.windowWidth / 2 + 110, 50);
        }
        
        p.fill(255)
        .strokeWeight(0)
        .textSize(50);
        p.textStyle(p.ITALIC);
        p.text("Hello World", p.windowWidth / 2 - 100, p.windowHeight / 2 - 80);

        particles.show();
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


class Particles {
    constructor(numParticles, col, p) {
        this.numberOfParticles = numParticles;
        this.color = col;
        this.p = p;
        this.particles = []

        for (let i = 0; i < numParticles; i++) {
            this.particles.push(new Particle(p, this.color));
        }
    }
    show() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].show();
        }
    }
}

class Particle {
    constructor(p, color) {
        this.x = p.random(0, p.windowWidth);
        this.y = p.random(0, p.windowHeight);
        this.p = p;
        this.col = color;
    }

    show() {
        this.p.fill(this.col);
        this.p.noStroke();
        this.p.ellipse(this.x, this.y, 4, 4);
    }
}


class Icon {
    constructor(img, label, x, y, p) {
        this.img = img;
        this.label = label;
        this.x = x;
        this.y = y;
        this.p = p;
        this.foundImg = p.loadImage(this.img)
    }

    show() {
        
        this.p.smooth();
        this.p.image(this.foundImg, this.x, this.y);
        this.p.fill(255)
        .strokeWeight(0)
        .textSize(15);
        this.p.textStyle(this.p.ITALIC);
        this.p.text(this.label, this.x - 8, this.y + 64);
    }

    mouseIn( x,  y) {
        return (x >= this.x && x <= this.x + 50 && y <= this.y + 50 && y >= this.y - 50);
    }
    
}

export default sketch;