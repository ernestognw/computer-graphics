import {
  TextGeometry,
  FontLoader,
} from "https://unpkg.com/three/build/three.module.js";

const loadFont = new Promise((resolve) => {
  const loader = new FontLoader();

  loader.load(
    "https://raw.githubusercontent.com/stemkoski/stemkoski.github.com/master/Three.js/fonts/helvetiker_regular.typeface.js",
    resolve
  );
});

const Text = async () => {
  const font = await loadFont;

  return new TextGeometry("three.js", {
    font: font,
    size: 1.3,
    height: 1.0,
    curveSegments: 8,
    bevelEnabled: true,
    bevelThickness: 0.15,
    bevelSize: 0.3,
    bevelSegments: 5,
  });
};

export { Text };
