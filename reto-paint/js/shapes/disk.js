import { RingGeometry } from "https://unpkg.com/three/build/three.module.js";

const innerRadius = 1.0;
const outerRadius = 8.0;
const thetaSegments = 30;

const Disk = new RingGeometry(innerRadius, outerRadius, thetaSegments);

export { Disk };
