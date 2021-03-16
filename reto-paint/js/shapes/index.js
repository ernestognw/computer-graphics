import {
  MeshBasicMaterial,
  Mesh,
  Color,
} from "https://unpkg.com/three/build/three.module.js";
import { KleinBottle } from "./klein-bottle.js";
import { Star } from "./star.js";
import { RoundedBox } from "./rounded-box.js";
import { Mark } from "./mark.js";
import { Text } from "./text.js";
import { Knot } from "./knot.js";
import { Tube } from "./tube.js";
import { Heart } from "./heart.js";
import { Plate } from "./plate.js";
import { Disk } from "./disk.js";

const create = (title, geometry, gui) => {
  const material = new MeshBasicMaterial({
    color: "white",
    wireframe: true,
    opacity: 0.4
  });

  const mesh = new Mesh(geometry, material);

  const geometryMenu = gui.addFolder(title);

  mesh.model = {
    menu: geometryMenu,
    rotation: {
      x: (mesh.rotation.x * 180) / Math.PI,
      y: (mesh.rotation.y * 180) / Math.PI,
      z: (mesh.rotation.z * 180) / Math.PI,
    },
    posHome: () => {
      mesh.position.x = 0;
      mesh.position.y = 0;
      mesh.position.z = 0;
      mesh.model.rotation.y = 0;
      mesh.model.rotation.x = 0;
      mesh.model.rotation.z = 0;
      mesh.rotation.y = mesh.model.rotation.y;
      mesh.rotation.x = mesh.model.rotation.x;
      mesh.rotation.z = mesh.model.rotation.z;
      mesh.material.wireframe = true;
      mesh.material.color = "white";
    },
  };

  const positionMenu = geometryMenu.addFolder("Position");

  positionMenu
    .add(mesh.position, "x")
    .min(-100)
    .max(100)
    .step(0.5)
    .listen()
    .name("X");

  positionMenu
    .add(mesh.position, "y")
    .min(-100)
    .max(100)
    .step(0.5)
    .listen()
    .name("Y");

  positionMenu
    .add(mesh.position, "z")
    .min(-100)
    .max(100)
    .step(0.5)
    .listen()
    .name("Z");

  const rotationMenu = geometryMenu.addFolder("Rotation");

  rotationMenu
    .add(mesh.model.rotation, "x")
    .min(-180)
    .max(180)
    .step(1)
    .name("Grados X")
    .listen()
    .onChange((value) => (mesh.rotation.x = (value * Math.PI) / 180));
  rotationMenu
    .add(mesh.model.rotation, "y")
    .min(-180)
    .max(180)
    .step(1)
    .name("Grados Y")
    .listen()
    .onChange((value) => (mesh.rotation.y = (value * Math.PI) / 180));
  rotationMenu
    .add(mesh.model.rotation, "z")
    .min(-180)
    .max(180)
    .step(1)
    .name("Grados Z")
    .listen()
    .onChange((value) => (mesh.rotation.z = (value * Math.PI) / 180));

  geometryMenu.add(mesh.material, "wireframe").name("Wireframe").listen();
  geometryMenu.add(mesh.material, "transparent").name("Transparent").listen();
  geometryMenu
    .add(mesh.material, "opacity")
    .min(0)
    .max(1)
    .step(0.01)
    .listen()
    .name("Opacity");
  geometryMenu
    .addColor({ rgb: mesh.material.color }, "rgb")
    .name("Color")
    .listen()
    .onChange(({ r, g, b }) => {
      mesh.material.color = new Color(
        `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`
      );
    });
  return mesh;
};

export {
  create,
  KleinBottle,
  Star,
  RoundedBox,
  Mark,
  Text,
  Knot,
  Tube,
  Heart,
  Plate,
  Disk,
};
