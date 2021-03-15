import { TorusKnotGeometry } from "https://unpkg.com/three/build/three.module.js";

const radius =  3.2;  
const tubeRadius =  1.0;  
const radialSegments = 15;  
const tubularSegments = 100;  
const p =  4;  
const q =  6;  

const Knot = new TorusKnotGeometry(
  radius,
  tubeRadius,
  tubularSegments,
  radialSegments,
  p,
  q
);

export { Knot }
