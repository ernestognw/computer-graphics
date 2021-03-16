import {
  PlaneGeometry,
  MeshBasicMaterial,
  GridHelper,
  Mesh,
  Color,
} from "https://unpkg.com/three/build/three.module.js";

const addFloor = (scene, gui) => {
  const floor = new GridHelper(100, 100);
  floor.name = "Ground";
  scene.add(floor);
  floor.position.z = 0;

  const floorMenu = gui.addFolder("Floor");
  scene.add(floor);
  
  floorMenu
    .addColor({ rgb: new Color(0, 0, 0) }, "rgb")
    .name("Color")
    .listen()
    .onChange(({ r, g, b }) => {
      const color = new Color(
        `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
      );
      floor.material.color = color;
    });

  floorMenu.add(floor, "visible").name("Visible").listen();
};

export default addFloor;
