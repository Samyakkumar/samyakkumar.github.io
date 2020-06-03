import React, {useEffect, useState} from "react";
import p5 from "p5";
const sketch = (p) =>  {
    p.setup = () => {
        p.createCanvas(window.innerWidth, 600)
        p.textAlign(p.CENTER, p.CENTER)
        p.textSize(42)
    }

    p.draw = () => {
        p.background(255)
        p.text("Samyak Kumar", window.innerWidth / 2, 300)

    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, 600)
    }
}

export default function Sketch() {
    const [myRef, setMyRef] = useState(React.createRef())
    // setmyP5(new p5(sketch, myRef.current))
    useEffect(()=>{
        let canvas = new p5(sketch, myRef.current)
        return () => {
            canvas.remove()
        }
    })
    return (
        <div ref={myRef}>

        </div>
    )
}
