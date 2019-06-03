import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './Sketch';
import terminal from './assets/terminal.png';

class HomePage extends Component {
    constructor(props) {
        super(props)
    } 

    render() {
        return (
            <div>
                <P5Wrapper sketch={sketch} img={terminal}/>
              
            </div>
        )
    }

}


export default HomePage;