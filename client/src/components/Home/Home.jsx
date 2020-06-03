import React, { useState } from "react";
import Resume from "../Resume/Resume";
import Sketch from "../Sketch/Sketch";
export default function Home() {
    const [count, setCount] = useState(0);
    return(
        <div>
            <Sketch />
            <Resume />
            
        </div>
    )
}