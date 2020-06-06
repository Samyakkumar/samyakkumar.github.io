import React, { useState } from "react";
import ReactGA from 'react-ga';
import Resume from "../Resume/Resume";
import Sketch from "../Sketch/Sketch";
import Carousel from "nuka-carousel";
import WhoAmI from "../WhoAmI/WhoAmI"
export default function Home() {
    ReactGA.initialize("UA-141601792-1");
    ReactGA.pageview(window.location.pathname + window.location.search);
    const [count, setCount] = useState(0);
    return(
        <div>
            {/* <Carousel dragging={true}>
            
            <Resume />
            <Resume />
            </Carousel> */}
            <WhoAmI />
            
            
        </div>
    )
}