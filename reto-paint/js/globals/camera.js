import { PerspectiveCamera } from 'https://unpkg.com/three/build/three.module.js';

const fov = 60;
const aspect = window.innerWidth / window.innerHeight;
const near = 0.1;
const far = 10000;

const camera = new PerspectiveCamera(fov, aspect, near, far);
camera.position.set(0, 3, 15);

export default camera;
