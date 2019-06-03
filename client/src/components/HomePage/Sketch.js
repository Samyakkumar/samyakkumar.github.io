function sketch(p) {
    let term;
    p.setup = function () {
        p.createCanvas(p.windowWidth, p.windowHeight);
        // term = terminal;
    }

    p.myCustomRedrawAccordingToNewPropsHandler = function (props) {
        p.createCanvas(p.windowWidth, p.windowHeight);
        term = p.loadImage(props.img);
    }

    p.draw = function () {
        p.background(100);
        p.fill(255)
        .strokeWeight(0)
        .textSize(50);
        p.textStyle(p.ITALIC);
        p.text("Hello World", p.windowWidth / 2 - 100, p.windowHeight / 2);
        try {
            p.image(term, p.windowWidth / 2 - 100, p.windowHeight / 2 + 50);
            p.fill(255)
            .strokeWeight(0)
            .textSize(15);
            p.textStyle(p.ITALIC);
            p.text("Terminal", p.windowWidth / 2 - 105, p.windowHeight / 2 + 120);
        } catch {
            console.log("image still loading")
        } finally {
            console.log();
        }
    }
}

export default sketch;