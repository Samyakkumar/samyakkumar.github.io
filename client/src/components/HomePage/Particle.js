class Particle {
    constructor(p, color) {
        this.x = p.random(0, p.windowWidth);
        this.y = p.random(0, p.windowHeight);
        this.p = p;
        this.col = color;
        this.vec = p.createVector(p.random(-1,1), p.random(-1, 1));
        this.desiredSeperation = 10;
        this.location = this.p.createVector(this.x, this.y)
        this.maxVec = 5;

    }

    move() {
        this.x += this.vec.x;
        this.y += this.vec.y;
        this.location = this.p.createVector(this.x, this.y)
        if (this.offScreen()) {
            this.x = this.p.random(0, this.p.windowWidth);
        this.y = this.p.random(0, this.p.windowHeight);
        this.vec = this.p.createVector(this.p.random(-this.maxVec,this.maxVec), this.p.random(-this.maxVec, this.maxVec));
        this.location = this.p.createVector(this.x, this.y)
        }
    }

    show(particles) {
        this.p.fill(this.col);
        // this.p.noStroke();
        this.p.ellipse(this.x, this.y, 10, 10);
        // this.p.strokeWeight(1)
        // var heading = this.vec.copy().setMag(1).heading();
        // this.p.line(this.x, this.y, this.x + 15 * Math.cos(heading), this.y + (15) * Math.sin(heading))
        for (let i = 0; i < particles.length; i++) {
            var currParticle = particles[i];
            var d = Math.sqrt((currParticle.x - this.x)**2 + (currParticle.y - this.y)**2);
            if (d > 0 && d <= this.desiredSeperation*5) {
                this.p.strokeWeight(0.5);

                this.p.line(this.x, this.y, currParticle.x, currParticle.y);
            }
        }
    }

    offScreen() {
        return (this.x <= 0 || this.x > this.p.windowWidth || this.y <= 0 || this.y > this.p.windowHeight)
    }

    seperate(particles){
        var sum = new this.p.createVector();
        var count = 0;
        for (let i = 0; i < particles.length; i++) {
            var currParticle = particles[i];
            var d = Math.sqrt((currParticle.x - this.x)**2 + (currParticle.y - this.y)**2);
            if (d > 0 && d < this.desiredSeperation) {
                var diff = this.location.copy().sub(currParticle.location);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(1);
            var steer = sum.copy().sub(this.vec);
            steer.limit(0.3)
            this.applyForce(steer);
        }
    }

    cohesion(particles){
        var sum = new this.p.createVector();
        var count = 0;
        for (let i = 0; i < particles.length; i++) {
            var currParticle = particles[i];
            var d = Math.sqrt((currParticle.x - this.x)**2 + (currParticle.y - this.y)**2);
            if (d > 0 && d > this.desiredSeperation) {
                var diff = this.location.copy().sub(currParticle.location);
                diff.normalize();
                diff.div(d);
                sum.add(diff);
                count++;
            }
        }

    
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(0.1);
            var steer = sum.copy().sub(this.vec);
            steer.limit(0.01)

            steer.mult(-1);
            this.applyForce(steer);
        }
    }

    flock(particles){
        var sum = new this.p.createVector();
        var count = 0;
        var ndist = 50;
        for (let i = 0; i < particles.length; i++) {
            var currParticle = particles[i];
            var d = Math.sqrt((currParticle.x - this.x)**2 + (currParticle.y - this.y)**2);
            if (d > 0 && d < ndist) {
                // var diff = this.location.copy().sub(currParticle.location);
                // diff.normalize();
                // diff.div(d);
                // sum.add(diff);
                sum.add(currParticle.vec)
                count++;
            }
        }
        if (count > 0) {
            sum.div(count);
            sum.normalize();
            sum.mult(1);
            var steer = sum.copy().sub(this.vec);
            steer.limit(0.4)
            this.applyForce(steer);
        } else {
            return new this.p.createVector(0, 0);
        }
    }

    applyForce(force) {
        // console.log("force")
        this.vec.add(force);
        var limit = this.p.map(this.p.windowWidth, 0, 1280, 8, 25);
        this.vec.limit(3)
        this.location = this.p.createVector(this.x, this.y)
    }

}
export default Particle;