//import * as THREE from 'three';
//import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader'

import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.118/build/three.module.js';
import {FBXLoader} from 'https://cdn.jsdelivr.net/npm/three@0.118.1/examples/jsm/loaders/FBXLoader.js';




const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 10);
camera.position.z = 1;

const scene = new THREE.Scene();

const geometry = new THREE.BoxGeometry(0.2, 0.2, 0.2);
const material = new THREE.MeshNormalMaterial();

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setAnimationLoop(animation);
document.body.appendChild(renderer.domElement);

// animation

function animation(time) {


  renderer.render(scene, camera);

}



const options = { frequency: 60, referenceFrame: "device" };
const sensor = new AbsoluteOrientationSensor(options);

sensor.addEventListener("reading", () => {
  // model is a Three.js object instantiated elsewhere.
  //mesh.quaternion.fromArray(sensor.quaternion).inverse();
  mesh.quaternion.fromArray(sensor.quaternion).conjugate()
});
sensor.addEventListener("error", (error) => {
  if (error.name === "NotReadableError") {
    console.log("Sensor is not available.");
  }
});
sensor.start();
