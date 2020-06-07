import React, {useState, useEffect} from "react";
import * as THREE from "three";

export default function WhoAmI() {
    const [ref, setRef] = useState(React.createRef())
    // const [container] = useState(document.createElement("div"))
    useEffect(() => {
        var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera( 60, window.innerWidth/window.innerHeight, 1, 1000 );
    camera.position.z = 1;
    camera.rotation.x = 1.16;
    camera.rotation.y = -0.12;
    camera.rotation.z = 0.27;
    // document.body.appendChild( renderer.domElement );
    var ambient = new THREE.AmbientLight(0x555555);
    // var geometry = new THREE.BoxGeometry( 1, 1, 1 );
    // var material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
    // var cube = new THREE.Mesh( geometry, material );
    // scene.add( cube );
    scene.add(ambient);

    var directionalLight = new THREE.DirectionalLight(0xffeedd);
    directionalLight.position.set(0,0,1);
    scene.add(directionalLight);

    var flash = new THREE.PointLight(0x062d89, 30, 500 ,1.7);
    flash.position.set(200,300,100);
    scene.add(flash);

    var renderer = new THREE.WebGLRenderer();
    // 0x11111f
    scene.fog = new THREE.FogExp2(0x99ccff, 0.002);
    renderer.setClearColor(scene.fog.color);
    renderer.setSize( window.innerWidth, window.innerHeight );
    ref.current.appendChild( renderer.domElement );
    var cloudParticles = []

    let loader = new THREE.TextureLoader();
    loader.load("./images/smoke-1.png", function(texture){
        var cloudGeo = new THREE.PlaneBufferGeometry(800,800);
        var cloudMaterial = new THREE.MeshLambertMaterial({
          map: texture,
          transparent: true
        });
        for(let p=0; p<25; p++) {
          let cloud = new THREE.Mesh(cloudGeo,cloudMaterial);
          cloud.position.set(
            Math.random()*800 -400,
            500,
            Math.random()*500 - 450
          );
          cloud.rotation.x = 1.16;
          cloud.rotation.y = -0.12;
          cloud.rotation.z = Math.random()*360;
          cloud.material.opacity = 0.6;
          cloudParticles.push(cloud);
          scene.add(cloud);
        }
      });

    var rainGeo = new THREE.Geometry();
    var rainCount = 1500;
    for(let i=0;i<rainCount;i++) {
    var rainDrop = new THREE.Vector3(
        Math.random() * 400 -200,
        Math.random() * 500 - 250,
        Math.random() * 400 - 200
    );
    rainDrop.velocity = {};
    rainDrop.velocity = 0;
    rainGeo.vertices.push(rainDrop);
    }
    //aaaaaa
    var rainMaterial = new THREE.PointsMaterial({
        color: 0xa1c6cc,
        size: 0.4,
        transparent: true,
        opacity:0.8
      });
      var rain = new THREE.Points(rainGeo,rainMaterial);
      scene.add(rain);
      var curr_font;
      var geometry;
      var fontLoader = new THREE.FontLoader()
      fontLoader.load("./fonts/Singel-Demo-SemiBold_Regular.json", function (font) {
        curr_font = font;
        geometry = new THREE.TextGeometry( 'Samyak Kumar', {
            font: font,
            size: 100,
            height: 5,
            curveSegments: 12,
            bevelEnabled: true,
            bevelThickness: 10,
            bevelSize: 8,
            bevelOffset: 0,
            bevelSegments: 5
        } );
        var msh = new THREE.Mesh(geometry, font)
        msh.renderOrder = 0;
        scene.add(msh)
        
      })
      
    //   var geometry = new THREE.TextGeometry("Samyak Kumar",{
    //       size: 42
    //   })
    //   scene.add(geometry)


      



    var animate = function () {
      requestAnimationFrame( animate );
    //   cube.rotation.x += 0.01;
    //   cube.rotation.y += 0.01;
    if(Math.random() > 0.93 || flash.power > 100) {
        if(flash.power < 100) 
          flash.position.set(
            Math.random()*400,
            300 + Math.random() *200,
            100
          );
        flash.power = 50 + Math.random() * 250;
      }

      rainGeo.vertices.forEach(p => {
        p.velocity -= 0.1 + Math.random() * 0.1;
        p.y += p.velocity;
        if (p.y < -200) {
          p.y = 200;
          p.velocity = 0;
        }
      });
      rainGeo.verticesNeedUpdate = true;
      rain.rotation.y +=0.004;
    
    cloudParticles.forEach(p => {
        p.rotation.z -=0.002;
      });
    
    renderer.render( scene, camera );

    };
    animate();
    })

    var style = {
        width: "100vw",
      height: "100vh",
    margin: "0",
    background: "black",
    overflow: "hidden"
    }
    var text = {
        position: "absolute",
        top:"40%",
        left: "40%",
        fontSize: "42px",
        color: "white"
    }

    return (
        <div>
            <div ref={ref} style={style}>

            </div>
            <p style={text}>Samyak Kumar</p>
        </div>
    )
}