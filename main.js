//import * as THREE from 'three';
//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';




const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();


let model
// scene.add(mesh);

const loader = new FBXLoader()
loader.setPath('./')
loader.load('arrow.fbx', (fbx) => {

  model = fbx

  model.scale.setScalar(0.0005)
  model.position.set(0, 0, 0)
  model.traverse(c => {
    //c.castShadow = true
    c.material = new THREE.MeshNormalMaterial()
  })

  scene.add(model)
})

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

function animation(time) {
  renderer.render(scene, camera);
}


// Sensors API

try {
  const options = { frequency: 60, referenceFrame: "device" };
  const sensor = new AbsoluteOrientationSensor(options);

  // Reading event
  sensor.addEventListener("reading", () => {
    //model.quaternion.fromArray(sensor.quaternion).inverse();
    model.quaternion.fromArray(sensor.quaternion).conjugate()
  });

  // Error event
  sensor.addEventListener("error", (error) => {
    console.error(error)
  });

  const startButton = document.getElementById('startbutton')

  console.log(startButton)

  startButton.addEventListener('click', async () => {

    const results = await Promise.all([
      navigator.permissions.query({ name: "accelerometer" }),
      navigator.permissions.query({ name: "magnetometer" }),
      navigator.permissions.query({ name: "gyroscope" }),
    ])

    if (results.every((result) => result.state === "granted")) {
      sensor.start();
    } 
    else {
      console.log("No permissions to use AbsoluteOrientationSensor.");
    }

  })

}
catch (error) {
  console.error(`Sensors API not available`)
}



