import React, {useEffect, useState} from "react";
import p5 from "p5";
const RainSketch = (p) =>  {
    var yoff = 0.0;
    const Y_AXIS = 1;
    const X_AXIS = 2;
    var splashes = [];
    var c1, c2;

    p.setup = () => {
        p.createCanvas(window.innerWidth, 600);
        var y = 0;
        var x = 0;
        for (var i = 0; i < 100; i++) {
            y = p.random(-800, 0);
            x = p.random(0, p.width);
            splashes.push(new rain(x, y));
        }
        c1 = p.color(201, 233, 246);
        c2 = p.color(69, 179, 224);
    }
    yoff = 0.0;
    var limit = 200;
    p.draw = () => {
        p.background(255)
        setGradient(0, 0, p.width / 2, p.height, c1, c2, Y_AXIS);
        setGradient(p.width / 2, 0, p.width / 2, p.height, c1, c2, Y_AXIS);
        // let randNum = random(0, 1);
        // if (randNum <= 0.7) {
        //   let r = random(10, 30);
        //   let x = random(0, width);
        //   let y = random(0, height);
        //   splashes.push(new splash(r, x, y));
        // }
        for (var a in splashes) {
            splashes[a].show()
            splashes[a].move()
            splashes[a].checkOut()
            // if (splashes[a].checkOut()) {
            //   splashes.pop(a);
            // }
        }
        p.fill(0, 119, 190, 200);
        // We are going to draw a polygon out of the wave points
        p.beginShape();

        let xoff = 0; // Option #1: 2D Noise
        // let xoff = yoff; // Option #2: 1D Noise

        // Iterate over horizontal pixels
        for (let x = 0; x <= p.width; x += 30) {
            // Calculate a y value according to noise, map to

            // Option #1: 2D Noise
            let y = p.map(p.noise(xoff, yoff), 0, 1, p.height - limit, p.height);

            // Option #2: 1D Noise
            // let y = map(noise(xoff), 0, 1, 200,300);

            // Set the vertex
            p.vertex(x, y);
            // Increment x dimension for noise
            xoff += 0.05;
            limit += 0.002;
            if (limit >= p.height / 2) {
            limit = 200;
            }
        }
        // increment y dimension for noise
        yoff += 0.01;
        p.vertex(p.width, p.height);
        p.vertex(0, p.height);
        p.endShape(p.CLOSE);
        p.textSize(42);
        p.textAlign(p.CENTER);
        p.fill(255);
        p.text("Samyak Kumar", window.innerWidth / 2, 300)

    }

    p.windowResized = () => {
        p.resizeCanvas(window.innerWidth, 600)
    }

    function rain(x, y){
        var length= p.random(5, 15);
        var x = x;
        var y = y;
        var velocity = p.map(length, 1, 15, 1, 5);
        
        this.show = () => {
            p.noStroke();
            p.fill(0, 119, 190, 200)
            p.ellipse(x, y, 3, length);
        }
        
        this.move = () => {
          y += velocity;
          velocity += 0.1;
        }
        
        this.checkOut = () => {
          if (y >= p.height) {
            y = p.random(-800, 0);
          length= p.random(1, 15);
          velocity = p.map(length, 1, 15, 1, 5);
          }
        }
        
      }

    function splash(rad, x, y) {
        var radius = rad;
        var locx = x;
        var locy = y;
        var r = 0;
        var opacity = 200;
        this.show = () => {
          p.strokeWeight(2);
          p.stroke(0, 119, 190, opacity);
          p.noFill()
          p.ellipse(locx, locy, r, r * 1.25);
          r += 0.5
          opacity = opacity - 2;
        }
        
        this.checkSplashFinish = () => {
          return r >= radius || opacity <= 0;
        }
      }

    function setGradient(x, y, w, h, c1, c2, axis){
        p.noFill();
      
        if (axis === Y_AXIS) {
          // Top to bottom gradient
          for (let i = y; i <= y + h; i++) {
            let inter = p.map(i, y, y + h, 0, 1);
            let c = p.lerpColor(c1, c2, inter);
            p.stroke(c);
            p.line(x, i, x + w, i);
          }
        } else if (axis === X_AXIS) {
          // Left to right gradient
          for (let i = x; i <= x + w; i++) {
            let inter = p.map(i, x, x + w, 0, 1);
            let c = p.lerpColor(c1, c2, inter);
            p.stroke(c);
            p.line(i, y, i, y + h);
          }
        }
      }
}

export default function Sketch() {
    const [myRef, setMyRef] = useState(React.createRef())
    const [isRain, setIsRain] = useState(true)
    const [lat, setLat] = useState(33.753746)
    const [long, setLong] = useState(-84.386330)
    const [weather, setWeather] = useState(null)
    const [hasWeather, setHasWeather] = useState(false)
    const [cityName, setCityName] = useState("Atlanta")
    const [hasCity, setHasCity] = useState(false)
    

    
    // setmyP5(new p5(sketch, myRef.current))
    useEffect(()=>{
        if (isRain) {
            let canvas = new p5(RainSketch, myRef.current)
            return () => {
                canvas.remove()
            }
        }

        navigator.geolocation.getCurrentPosition((pos) => {
            if (pos && !hasWeather) {
                console.log("Latitude " + pos.coords.latitude);
                setLat(pos.coords.latitude);
                console.log("longitude " + pos.coords.longitude);
                setLong(pos.coords.longitude);
                if (!hasCity) {
                    fetch("https://api.mapbox.com/geocoding/v5/mapbox.places/" + long + "," + lat + ".json?limit=1&access_token=pk.eyJ1Ijoic2FteWFra3VtYXIiLCJhIjoiY2p4a2RsMXQyMDNxaTNybHFjZnRkcXp6eSJ9.vj-Bgp0H-1_OGC6ODQSvCg")
                    .then((res) => res.json().then(dat => {
                    var context = dat["features"];
                    console.log(context.length)
                    if (context.length > 0) {
                        context = dat["features"][0]["context"];
                        for (var i = 0; i < context.length; i++) {
                            if ("place" == context[i]["id"].split('.')) {
                                setCityName(context[i]["text"])
                                console.log(context[i]["text"])
                                setHasCity(true);
                                break;
                            }
                        }
                    }
                }))
                }
                fetch("http://api.openweathermap.org/data/2.5/weather?q=Atlanta" + "&appid=8bec09210e082b231bce64431923b596")
                .then((res) => res.json().then(dat => {
                    setWeather(dat["weather"][0]["description"])
                    setHasWeather(true)
                }))
            }
        })
    })
    return (
        <div>
            <div ref={myRef}>

            </div>
            <button onClick={() => {setIsRain(!isRain)}}>Toggle Rain</button>
    {hasCity && <h1>{cityName}</h1>}

        </div>
    )
}
