import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './Sketch';
import terminal from './assets/terminal.png';
import note from './assets/note.png';
import Particle from './Particles';
import './style.css'

class HomePage extends Component {
    constructor(props) {
        super(props);
        this.updateDimensions = this.updateDimensions.bind(this);
    } 

    /**
   * Calculate & Update state of new dimensions
   */
  updateDimensions() {
    
  }

  /**
   * Add event listener
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions);
  }

  /**
   * Remove event listener
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
    render() {
        return (
            <>
            {/* <Particle /> */}
            <P5Wrapper sketch={sketch} img={[terminal, note]}/>
            </>
        )
    }

}


export default HomePage;