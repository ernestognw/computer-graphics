'use strict';

import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
} from 'https://unpkg.com/three/build/three.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.125.2/examples/jsm/controls/OrbitControls.js';
import Stats from 'https://unpkg.com/three@0.125.2/examples/jsm/libs/stats.module.js';
import { GUI } from 'https://unpkg.com/three@0.125.2/examples/jsm/libs/dat.gui.module.js';

let renderer, scene, camera, cameraControl, mesh, stats;

const init = () => {
  // RENDERER
  renderer = new WebGLRenderer({ antialias: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  // SCENE
  scene = new Scene();

  // CAMERA
  const fov = 60;
  const aspect = window.innerWidth / window.innerHeight;
  const near = 0.1;
  const far = 10000;
  camera = new PerspectiveCamera(fov, aspect, near, far);
  camera.position.set(0, 0, 3);
  cameraControl = new OrbitControls(camera, renderer.domElement);

  // MODELS
  const geometry = new BoxGeometry();
  const material = new MeshBasicMaterial({
    color: 'white',
    wireframe: true,
  });
  mesh = new Mesh(geometry, material);

  // SCENE GRAPH
  scene.add(mesh);

  // GUI
  const gui = new GUI();

  // Model
  const model = {
    rotY: (mesh.rotation.y * 180) / Math.PI,
    posHome: () => {
      mesh.position.x = 0;
      model.rotY = 0;
      mesh.rotation.y = model.rotY;
    },
  };

  // View
  // Position Menu
  const posMenu = gui.addFolder('Position menu');

  // Model Position
  const sliderPosX = posMenu
    .add(mesh.position, 'x')
    .min(-5)
    .max(5)
    .step(0.5)
    .listen()
    .name('X');

  // Model Orientation
  const sliderRotY = posMenu
    .add(model, 'rotY')
    .min(-180)
    .max(180)
    .step(1)
    .name('Grados')
    .listen();

  // Model Draw Mode
  const chbWireframe = posMenu
    .add(mesh.material, 'wireframe')
    .setValue(true)
    .name('Wireframe');

  // Button position home
  const buttonPosHome = posMenu.add(model, 'posHome').name('Reset');

  // TextField Model Name
  const tfMeshName = posMenu.add(mesh, 'name').name("Model's name");

  // Controller
  sliderRotY.onChange((value) => {
    mesh.rotation.y = (value * Math.PI) / 180;
  });

  // STATS
  stats = new Stats();
  stats.showPanel(0);
  document.body.appendChild(stats.dom);

  // RENDER LOOP
  renderLoop();
};

function renderLoop() {
  stats.begin();
  renderer.render(scene, camera); // DRAW SCENE
  updateScene();
  stats.end();
  stats.update();
  requestAnimationFrame(renderLoop);
}

function updateScene() {}

// EVENT LISTENERS & HANDLERS
document.addEventListener('DOMContentLoaded', init);

window.addEventListener('resize', function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
