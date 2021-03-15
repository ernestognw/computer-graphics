import { WebGLRenderer, Color } from 'https://unpkg.com/three/build/three.module.js';

const renderer = new WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

export default renderer
