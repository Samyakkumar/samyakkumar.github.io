function sketch(p) {
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        p.createCanvas(p.windowWidth, p.windowHeight);

    }

    p.draw = function () {
        p.background(100);
        p.fill(255)
        .strokeWeight(0)
        .textSize(50);
        p.textStyle(p.ITALIC);
        p.text("Hello World", p.windowWidth / 2 - 100, p.windowHeight / 2);
    }
}

export default sketch;