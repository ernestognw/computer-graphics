"use strict";

import { GUI } from "https://unpkg.com/three@0.125.2/examples/jsm/libs/dat.gui.module.js";
import { OrbitControls } from "https://unpkg.com/three@0.125.2/examples/jsm/controls/OrbitControls.js";
import { Color, Raycaster, Vector2, GridHelper } from "https://unpkg.com/three/build/three.module.js";
import { renderer, scene, camera, stats, addFloor } from "./globals/index.js";
import * as shapeUtils from "./shapes/index.js";

const { create, ...shapes } = shapeUtils;

// GUI
const gui = new GUI();

// Raycaster & mouse
const raycaster = new Raycaster();
const mouse = new Vector2();

const init = () => {
  // Add controls
  new OrbitControls(camera, renderer.domElement);

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


    // Stats
    gui
        .add({ toggle: true }, "toggle")
        .name("All Wireframes")
        .listen()
        .onChange((show) => {
            scene.children.forEach((element, idx)=>{
                if (idx > 0) {
                    element.material.wireframe = show
                }
            })

        });

    // Add models available
  const addMenu = gui.addFolder("Add Model");
  Object.entries(shapes).forEach(async ([name, model]) => {
    let counter = 1;

    if (typeof model == "function") {
      model = await model();
    }

    addMenu
      .add(
        {
          add: () => {
            scene.add(create(`[Model] ${name} ${counter}`, model, gui));
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

window.addEventListener( 'mousemove', (event) => {
    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;
}, false );

window.addEventListener('dblclick', () => {
    raycaster.setFromCamera(mouse, camera);
    const [_, ...children] = scene.children
    const intersects = raycaster.intersectObjects(children);
    if (intersects.length !== 0) {
        // debugger;
        const intersected_element = intersects[0];
        let new_scene_children = []
        scene.children.forEach((element) => {
            if (element.uuid == intersected_element.object.uuid) {
                gui.removeFolder(intersected_element.object.model.menu)
            } else {
                new_scene_children.push(element)
            }
        })
        scene.children = new_scene_children
    }
}, false)

window.addEventListener("resize", function () {
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
});
