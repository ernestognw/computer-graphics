import {
    CylinderGeometry,
    MeshBasicMaterial,
    Mesh,
} from 'https://unpkg.com/three/build/three.module.js';

const createPyramid = (gui) => {
    const geometry = new CylinderGeometry(0, 4, 5, 4, 1)
    const material = new MeshBasicMaterial({
        color: 'white',
        wireframe: true,
    });

    const pyramid = new Mesh(geometry, material);

    pyramid.position.x = 10;

    pyramid.model = {
        rotation: {
            x: (pyramid.rotation.x * 180) / Math.PI,
            y: (pyramid.rotation.y * 180) / Math.PI,
            z: (pyramid.rotation.z * 180) / Math.PI,
        },
        posHome: () => {
            pyramid.position.x = 10;
            pyramid.position.y = 0;
            pyramid.position.z = 0;
            pyramid.model.rotation.y = 0;
            pyramid.model.rotation.x = 0;
            pyramid.model.rotation.z = 0;
            pyramid.rotation.y = pyramid.model.rotation.y;
            pyramid.rotation.x = pyramid.model.rotation.x;
            pyramid.rotation.z = pyramid.model.rotation.z;
        },
    };

    const pyramidMenu = gui.addFolder('Pyramid')

    const positionMenu = pyramidMenu.addFolder('Position');

    positionMenu
        .add(pyramid.position, 'x')
        .min(5)
        .max(15)
        .step(0.5)
        .listen()
        .name('X');
    positionMenu
        .add(pyramid.position, 'y')
        .min(-5)
        .max(5)
        .step(0.5)
        .listen()
        .name('Y');
    positionMenu
        .add(pyramid.position, 'z')
        .min(-5)
        .max(5)
        .step(0.5)
        .listen()
        .name('Z');

    const rotationMenu = pyramidMenu.addFolder('Rotation');

    rotationMenu
        .add(pyramid.model.rotation, 'x')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados X')
        .listen()
        .onChange((value) => pyramid.rotation.x = (value * Math.PI) / 180);
    rotationMenu
        .add(pyramid.model.rotation, 'y')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados Y')
        .listen()
        .onChange((value) => pyramid.rotation.y = (value * Math.PI) / 180);
    rotationMenu
        .add(pyramid.model.rotation, 'z')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados Z')
        .listen()
        .onChange((value) => pyramid.rotation.z = (value * Math.PI) / 180);

    pyramidMenu.add(pyramid.model, 'posHome').name('Reset');

    return pyramid;
}


export default createPyramid