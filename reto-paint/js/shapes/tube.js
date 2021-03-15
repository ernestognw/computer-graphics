import {
  TubeGeometry,
  Vector3,
  Curve,
} from "https://unpkg.com/three/build/three.module.js";

class CustomSinCurve extends Curve {
  constructor(scale) {
    super();
    this.scale = scale;
  }
  getPoint(t) {
    const tx = t * 3 - 1.5;
    const ty = Math.sin(2 * Math.PI * t);
    const tz = 0;
    return new Vector3(tx, ty, tz).multiplyScalar(this.scale);
  }
}

const path = new CustomSinCurve(4);
const tubularSegments = 20;

const radius = 1;

const radialSegments = 30;

const closed = false;
const Tube = new TubeGeometry(
  path,
  tubularSegments,
  radius,
  radialSegments,
  closed
);

export { Tube };
