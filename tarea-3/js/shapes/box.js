import {
    BoxGeometry,
    MeshBasicMaterial,
    Mesh,
} from 'https://unpkg.com/three/build/three.module.js';

const createBox = (gui) => {
    const geometry = new BoxGeometry(5,5,5);
    const material = new MeshBasicMaterial({
        color: 'white',
        wireframe: true,
    });

    const box = new Mesh(geometry, material);

    box.model = {
        rotation: {
            x: (box.rotation.x * 180) / Math.PI,
            y: (box.rotation.y * 180) / Math.PI,
            z: (box.rotation.z * 180) / Math.PI,
        },
        posHome: () => {
            box.position.x = 0;
            box.position.y = 0;
            box.position.z = 0;
            box.model.rotation.y = 0;
            box.model.rotation.x = 0;
            box.model.rotation.z = 0;
            box.rotation.y = box.model.rotation.y;
            box.rotation.x = box.model.rotation.x;
            box.rotation.z = box.model.rotation.z;
        },
    };

    const boxMenu = gui.addFolder('Box')

    const positionMenu = boxMenu.addFolder('Position');

    positionMenu
        .add(box.position, 'x')
        .min(-5)
        .max(5)
        .step(0.5)
        .listen()
        .name('X');
    positionMenu
        .add(box.position, 'y')
        .min(-5)
        .max(5)
        .step(0.5)
        .listen()
        .name('Y');
    positionMenu
        .add(box.position, 'z')
        .min(-5)
        .max(5)
        .step(0.5)
        .listen()
        .name('Z');

    const rotationMenu = boxMenu.addFolder('Rotation');

    rotationMenu
        .add(box.model.rotation, 'x')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados X')
        .listen()
        .onChange((value) => box.rotation.x = (value * Math.PI) / 180);
    rotationMenu
        .add(box.model.rotation, 'y')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados Y')
        .listen()
        .onChange((value) => box.rotation.y = (value * Math.PI) / 180);
    rotationMenu
        .add(box.model.rotation, 'z')
        .min(-180)
        .max(180)
        .step(1)
        .name('Grados Z')
        .listen()
        .onChange((value) => box.rotation.z = (value * Math.PI) / 180);

    boxMenu.add(box.model, 'posHome').name('Reset');

    return box;
}


export default createBox