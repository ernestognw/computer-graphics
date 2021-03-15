import {
  ExtrudeGeometry,
  Vector2,
  Shape,
} from "https://unpkg.com/three/build/three.module.js";

const starPoints = [];

starPoints.push(new Vector2(0, 5));
starPoints.push(new Vector2(1, 1));
starPoints.push(new Vector2(4, 1));
starPoints.push(new Vector2(2, -1));
starPoints.push(new Vector2(3, -5));
starPoints.push(new Vector2(0, -2));
starPoints.push(new Vector2(-3, -5));
starPoints.push(new Vector2(-2, -1));
starPoints.push(new Vector2(-4, 1));
starPoints.push(new Vector2(-1, 1));

const starShape = new Shape(starPoints);

const extrusionSettings = {
  size: 3,
  height: 4,
  curveSegments: 3,
  bevelThickness: 1,
  bevelSize: 2,
  bevelEnabled: false,
  material: 0,
  extrudeMaterial: 1,
  depth: 1
};

const Star = new ExtrudeGeometry(starShape, extrusionSettings);

export { Star };
