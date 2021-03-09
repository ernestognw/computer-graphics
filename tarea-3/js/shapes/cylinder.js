import {
    CylinderGeometry,
    MeshBasicMaterial,
    Mesh,
} from 'https://unpkg.com/three/build/three.module.js';

const createCylinder = (gui) => {
    const geometry = new CylinderGeometry(5,5,5);
    const material = new MeshBasicMaterial({
        color: 'white',
        wireframe: true,
    });

    const cylinder = new Mesh(geometry, material);

    cylinder.position.x = -10

    cylinder.model = {
        rotation: {
            x: (cylinder.rotation.x * 180) / Math.PI,
            y: (cylinder.rotation.y * 180) / Math.PI,
            z: (cylinder.rotation.z * 180) / Math.PI,
        },
        posHome: () => {
            cylinder.position.x = -10;
            cylinder.position.y = 0;
            cylinder.position.z = 0;
            cylinder.model.rotation.y = 0;
            cylinder.model.rotation.x = 0;
            cylinder.model.rotation.z = 0;
            cylinder.rotation.y = cylinder.model.rotation.y;
            cylinder.rotation.x = cylinder.model.rotation.x;
            cylinder.rotation.z = cylinder.model.rotation.z;
        },
    };

    const cylinderMenu = gui.addFolder('Cylinder')

    const positionMenu = cylinderMenu.addFolder('Position');

    positionMenu
        .add(cylinder.position, 'x')
        .min(-15)
        .max(-5)
        .step(0.5)
        .listen()
        .name('X');
    positionMenu
        .add(cylinder.position, 'y')
        .min(-5)
        .max(5)
        .step(0.5)
        .listen()
        .name('Y');
    positionMenu
        .add(cylinder.position, 'z')
        .min(-5)
        .max(5)
        .step(0.5)
        .listen()
        .name('Z');

    const rotationMenu = cylinderMenu.addFolder('Rotation');

    rotationMenu
        .add(cylinder.model.rotation, 'x')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados X')
        .listen()
        .onChange((value) => cylinder.rotation.x = (value * Math.PI) / 180);
    rotationMenu
        .add(cylinder.model.rotation, 'y')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados Y')
        .listen()
        .onChange((value) => cylinder.rotation.y = (value * Math.PI) / 180);
    rotationMenu
        .add(cylinder.model.rotation, 'z')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados Z')
        .listen()
        .onChange((value) => cylinder.rotation.z = (value * Math.PI) / 180);

    cylinderMenu.add(cylinder.model, 'posHome').name('Reset');

    return cylinder;
}


export default createCylinder