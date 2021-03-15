import Stats from 'https://unpkg.com/three@0.125.2/examples/jsm/libs/stats.module.js';

const stats = new Stats();
stats.showPanel(0);
document.body.appendChild(stats.dom)

export default stats;
