import Particle from "./Particle";

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
            this.particles[i].show(this.particles);
        }
    }

    move() {
        for (let i = 0; i < this.particles.length; i++) {
            this.particles[i].move();
            this.particles[i].seperate(this.particles);
            this.particles[i].flock(this.particles);
            this.particles[i].cohesion(this.particles);
        }
    }
}
export default Particles;