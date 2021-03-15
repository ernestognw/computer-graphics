"use strict";

import { GUI } from "https://unpkg.com/three@0.125.2/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.125.2/examples/jsm/controls/OrbitControls.js";
import { Color } from "https://unpkg.com/three/build/three.module.js";
import { renderer, scene, camera, stats, addFloor } from "./globals/index.js";
import * as shapeUtils from "./shapes/index.js";

const { create, ...shapes } = shapeUtils;

const init = () => {
  // Add controls
  new OrbitControls(camera, renderer.domElement);

  // GUI
  const gui = new GUI();

  // Background color
  gui
    .addColor({ rgb: new Color(0, 0, 0) }, "rgb")
    .name("Background")
    .listen()
    .onChange(({ r, g, b }) => {
      const color = new Color(
        `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
      );
      renderer.setClearColor(color);
    });

  // Floor
  addFloor(scene, gui);

  // Stats
  gui
    .add({ toggle: true }, "toggle")
    .name("Show stats")
    .listen()
    .onChange((show) => {
      if (show) {
        document.body.appendChild(stats.dom);
      } else {
        document.body.removeChild(stats.dom);
      }
    });

  // Add models available
  const addMenu = gui.addFolder("Add");
  Object.entries(shapes).forEach(async ([name, model]) => {
    let counter = 1;

    if (typeof model == "function") {
      model = await model();
    }

    addMenu
      .add(
        {
          add: () => {
            scene.add(create(`${name} ${counter}`, model, gui));
            counter++;
          },
        },
        "add"
      )
      .name(name);
  });

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
document.addEventListener("DOMContentLoaded", init);

window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
