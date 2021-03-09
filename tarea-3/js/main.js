'use strict';


import { GUI } from 'https://unpkg.com/three@0.125.2/examples/jsm/libs/dat.gui.module.js';
import { OrbitControls } from 'https://unpkg.com/three@0.125.2/examples/jsm/controls/OrbitControls.js';
import { renderer, scene, camera, stats } from './globals/index.js'
import { createBox, createPyramid, createCylinder } from './shapes/index.js';

const init = () => {
    // Add controls 
    new OrbitControls(camera, renderer.domElement);

    // GUI
    const gui = new GUI();

    // Add models to scene
    scene.add(createBox(gui));
    scene.add(createPyramid(gui));
    scene.add(createCylinder(gui));

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

function updateScene() { }

// EVENT LISTENERS & HANDLERS
document.addEventListener('DOMContentLoaded', init);

window.addEventListener('resize', function () {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
