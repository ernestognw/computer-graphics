import {
  ExtrudeGeometry,
  Shape,
} from "https://unpkg.com/three/build/three.module.js";

const shape = new Shape();
const x = -2.5;
const y = -5;
shape.moveTo(x + 2.5, y + 2.5);
shape.bezierCurveTo(x + 2.5, y + 2.5, x + 2, y, x, y);
shape.bezierCurveTo(x - 3, y, x - 3, y + 3.5, x - 3, y + 3.5);
shape.bezierCurveTo(x - 3, y + 5.5, x - 1.5, y + 7.7, x + 2.5, y + 9.5);
shape.bezierCurveTo(x + 6, y + 7.7, x + 8, y + 4.5, x + 8, y + 3.5);
shape.bezierCurveTo(x + 8, y + 3.5, x + 8, y, x + 5, y);
shape.bezierCurveTo(x + 3.5, y, x + 2.5, y + 2.5, x + 2.5, y + 2.5);

const extrudeSettings = {
  steps: 1,

  depth: 1.0,

  bevelEnabled: true,
  bevelThickness: 0.51,

  bevelSize: 0.56,

  bevelSegments: 6,
};

const Heart = new ExtrudeGeometry(shape, extrudeSettings);

export { Heart };
