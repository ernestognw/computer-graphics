import {
  Vector2,
  LatheGeometry,
} from "https://unpkg.com/three/build/three.module.js";

const points = [];
for (let i = 0; i < 10; ++i) {
  points.push(new Vector2(Math.sin(i * 0.2) * 3 + 3, (i - 5) * 0.8));
}
const segments = 50;

const phiStart = Math.PI * 1.72;

const phiLength = Math.PI * 2.0;

const Plate = new LatheGeometry(points, segments, phiStart, phiLength);

export { Plate }
