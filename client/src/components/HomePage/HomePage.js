import React, { Component } from 'react';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './Sketch';

class HomePage extends Component {
    constructor(props) {
        super(props)
    } 

    render() {
        return (
            <div>
                <P5Wrapper sketch={sketch} />
            </div>
        )
    }

}


export default HomePage;