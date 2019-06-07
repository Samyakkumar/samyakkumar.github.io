import Icon from "./Icon";
import Particles from "./Particles";

function sketch(p) {
    let term;
    let resume;
    let icons;
    let particles;
    let windowShowing = false;
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // term = terminal;
        particles = new Particles(100, p.color(100, 100, 100, 20), p);
        console.log(p)
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
        var numParts = p.map(p.windowWidth, 0, 1280, 100, 300);
        particles = new Particles(numParts, p.color(100, 100, 100, 20), p);
        updateVars();
      }
    
    p.mousePressed = () => {
        for (let i = 0; i < icons.length; i++) {
            if (icons[i].mouseIn(p.mouseX, p.mouseY)) { 
                p.clear();
                p.background(182,25,36);           
                icons[i].showWindow();
                windowShowing = true;
            }
        }
        p.redraw();

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
        if (!windowShowing) {
            p.background(182,25,36, 50);

        p.fill(255)
        .strokeWeight(0)
        .textSize(18);
        p.text(getCurrDay() + "  " + p.hour()+ " : " + p.minute() + " : " + p.second(), p.windowWidth / 2 - 70, 50);
        if (p.hour() >= 12) {
            p.text("PM", p.windowWidth / 2 + 130, 50);
        } else {
            p.text("AM", p.windowWidth / 2 + 130, 50);
        }
        
        p.fill(255)
        .strokeWeight(0)
        .textSize(50);
        p.textStyle(p.ITALIC);
        p.text("Hello World", p.windowWidth / 2 - 100, p.windowHeight / 2 - 80);

        particles.show();
        particles.move();
        } else {
            p.fill(255)
            .strokeWeight(0)
            .textSize(18);
            p.text(getCurrDay() + "  " + p.hour(), p.windowWidth / 2 - 70, 50);
            if (p.hour() >= 12) {
                p.text("PM", p.windowWidth / 2 + 20, 50);
            } else {
                p.text("AM", p.windowWidth / 2 + 20, 50);
            }
        }
        try {
            if (!windowShowing) {
            for (let i = 0; i < icons.length; i++) {
                icons[i].show();
            }
            }
        } catch {
            console.log("image still loading")
        } finally {
            console.log();
        }
        
    }
}


export default sketch;