import { ParametricGeometry } from "https://unpkg.com/three/build/three.module.js";

const klein = (v, u, target) => {
  u *= Math.PI;
  v *= 2 * Math.PI;
  u = u * 2;

  let x;
  let z;

  if (u < Math.PI) {
    x =
      3 * Math.cos(u) * (1 + Math.sin(u)) +
      2 * (1 - Math.cos(u) / 2) * Math.cos(u) * Math.cos(v);
    z =
      -8 * Math.sin(u) - 2 * (1 - Math.cos(u) / 2) * Math.sin(u) * Math.cos(v);
  } else {
    x =
      3 * Math.cos(u) * (1 + Math.sin(u)) +
      2 * (1 - Math.cos(u) / 2) * Math.cos(v + Math.PI);
    z = -8 * Math.sin(u);
  }

  const y = -2 * (1 - Math.cos(u) / 2) * Math.sin(v);

  target.set(x, y, z).multiplyScalar(0.75);
};

const slices = 26;

const stacks = 19;

const KleinBottle = new ParametricGeometry(klein, slices, stacks);

export { KleinBottle };
