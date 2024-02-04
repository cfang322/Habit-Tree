// import { useEffect } from 'react';
// import {
//   Engine,
//   Scene,
//   FreeCamera,
//   HemisphericLight,
//   MeshBuilder,
//   Vector3,
//   Animation,
//   Color3,
//   StandardMaterial
// } from '@babylonjs/core';

// const BabylonTree = ({ progress }) => {
//   useEffect(() => {
//     const canvas = document.getElementById('babylon-canvas');
//     const engine = new Engine(canvas, true);

//     const scene = new Scene(engine);

//     // Camera
//     const camera = new FreeCamera('camera', new Vector3(0, 10, -10), scene);
//     camera.setTarget(Vector3.Zero());
//     camera.attachControl(canvas, true); // Disable camera controls

//     // Light
//     const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
//     light.intensity = 2;

//     const trunkHeight = 4;
//     const trunkRadius = 1;
//     const trunkSubdivisions = 100; // Increase subdivisions for a smoother appearance
//     const branches = 4;

//     // Procedurally generate a tree
//     const generateTree = (height, radius, subdivisions, branches) => {
//       // Material for the trunk
//       const trunkMaterial = new StandardMaterial('trunkMaterial', scene);
//       trunkMaterial.diffuseColor = Color3.FromHexString('#8B4513'); // Brown color

//       const trunk = MeshBuilder.CreateCylinder('trunk', { height, diameterTop: radius, diameterBottom: radius, tessellation: subdivisions }, scene);
//       trunk.material = trunkMaterial;
//       trunk.position.y = height / 2;

//       // Material for the foliage
//       const foliageMaterial = new StandardMaterial('foliageMaterial', scene);
//       foliageMaterial.diffuseColor = Color3.FromHexString('#228B22'); // Green color

//       const foliageAnimation = new Animation('foliageAnimation', 'scaling', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
//       const foliageKeys = [];
//       foliageKeys.push({ frame: 0, value: new Vector3(0.01, 0.01, 0.01) });
//       foliageKeys.push({ frame: 100, value: new Vector3(1, 1, 1) });
//       foliageAnimation.setKeys(foliageKeys);

//       const foliageInstances = [];

//       for (let i = 0; i < branches; i++) {
//         const angle = (i / branches) * Math.PI * 2;
//         const x = radius * Math.cos(angle);
//         const z = radius * Math.sin(angle);

//         // Create foliage sphere
//         const foliage = MeshBuilder.CreateSphere('foliage' + i, { diameter: radius * 2, segments: 8 }, scene);
//         foliage.position.y = height;
//         foliage.position.x = x;
//         foliage.position.z = z;
//         foliage.material = foliageMaterial;
//         foliage.scaling = new Vector3(0.01, 0.01, 0.01);
//         foliage.animations.push(foliageAnimation);
//         scene.beginAnimation(foliage, 0, 100, true);

//         foliageInstances.push(foliage);
//       }

//       const growTrunkAnimation = new Animation('growTrunkAnimation', 'scaling.y', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
//       const growTrunkKeys = [];
//       growTrunkKeys.push({ frame: 0, value: 0.01 });
//       growTrunkKeys.push({ frame: 100, value: 1 });
//       growTrunkAnimation.setKeys(growTrunkKeys);

//       const trunkAnimation = scene.beginAnimation(trunk, 0, 100, true);
//       trunkAnimation.pause();

//       progress = Math.min(Math.max(progress, 0), 1); // Clamp progress between 0 and 1
//       trunkAnimation.goToFrame(progress * 100);

//       for (const foliageInstance of foliageInstances) {
//         const growFoliageAnimation = new Animation('growFoliageAnimation', 'scaling', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
//         const growFoliageKeys = [];
//         growFoliageKeys.push({ frame: 0, value: new Vector3(0.01, 0.01, 0.01) });
//         growFoliageKeys.push({ frame: progress * 100, value: new Vector3(1, 1, 1) });
//         growFoliageAnimation.setKeys(growFoliageKeys);

//         foliageInstance.animations.push(growFoliageAnimation);
//         scene.beginAnimation(foliageInstance, 0, progress * 100, true);
//       }
//     };

//     generateTree(trunkHeight, trunkRadius, trunkSubdivisions, branches);

//     engine.runRenderLoop(() => {
//       scene.render();
//       camera.alpha += 0.001; // Adjust rotation speed
//     });

//     return () => {
//       engine.dispose();
//     };
//   }, [progress]);

//   return <canvas id="babylon-canvas" style={{ width: '100%', height: '100vh' }} />;
// };

// export default BabylonTree;


import { useEffect, useRef } from 'react';
import {
  Engine,
  Scene,
  FreeCamera,
  HemisphericLight,
  MeshBuilder,
  Vector3,
  Animation,
  Color3,
  StandardMaterial
} from '@babylonjs/core';

const BabylonTree = ({ progress }) => {
  const canvasRef = useRef(null);
  const pointerDown = useRef(false);
  const previousPointerPosition = useRef({ x: 0, y: 0 });
  const progressRef = useRef(progress);
  const trunkRadius = 2; // Example value, replace with your desired value

  useEffect(() => {
    const canvas = canvasRef.current;
    const engine = new Engine(canvas, true);
    const scene = new Scene(engine);

    // Camera
    const camera = new FreeCamera('camera', new Vector3(0, 5, -10), scene);
    camera.setTarget(Vector3.Zero());
    camera.attachControl(canvas, false);
    camera.inputs.clear();

    // Light
    const light = new HemisphericLight('light', new Vector3(0, 1, 0), scene);
    light.intensity = 2;

    // Trunk / Branches (Green foliage)
    const trunkHeight = 6;
    const trunkSubdivisions = 24; // Increase subdivisions for a smoother appearance
    const branches = 4;

    // Procedurally generate a tree
    const generateTree = (height, radius, subdivisions, branches) => {
      // Material for the trunk
      const trunkMaterial = new StandardMaterial('trunkMaterial', scene);
      trunkMaterial.diffuseColor = Color3.FromHexString('#8B4513'); // Brown color

      const trunk = MeshBuilder.CreateCylinder('trunk', { height, diameterTop: radius, diameterBottom: radius, tessellation: subdivisions }, scene);
      trunk.material = trunkMaterial;
      trunk.position.y = height / 2;

      // Material for the foliage
      const foliageMaterial = new StandardMaterial('foliageMaterial', scene);
      foliageMaterial.diffuseColor = Color3.FromHexString('#228B22'); // Green color

      const foliageAnimation = new Animation('foliageAnimation', 'scaling', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
      const foliageKeys = [];
      foliageKeys.push({ frame: 0, value: new Vector3(0.01, 0.01, 0.01) });
      foliageKeys.push({ frame: 100, value: new Vector3(1, 1, 1) });
      foliageAnimation.setKeys(foliageKeys);

      const foliageInstances = [];

      for (let i = 0; i < branches; i++) {
        const angle = (i / branches) * Math.PI * 2;
        const x = radius * Math.cos(angle);
        const z = radius * Math.sin(angle);

        // Create foliage sphere
        const foliage = MeshBuilder.CreateSphere('foliage' + i, { diameter: radius * 2, segments: 8 }, scene);
        foliage.position.y = height;
        foliage.position.x = x;
        foliage.position.z = z;
        foliage.material = foliageMaterial;
        foliage.scaling = new Vector3(0.01, 0.01, 0.01);
        foliage.animations.push(foliageAnimation);
        scene.beginAnimation(foliage, 0, 100, true);

        foliageInstances.push(foliage);
      }

      const growTrunkAnimation = new Animation('growTrunkAnimation', 'scaling.y', 30, Animation.ANIMATIONTYPE_FLOAT, Animation.ANIMATIONLOOPMODE_CONSTANT);
      const growTrunkKeys = [];
      growTrunkKeys.push({ frame: 0, value: 0.01 });
      growTrunkKeys.push({ frame: 100, value: 1 });
      growTrunkAnimation.setKeys(growTrunkKeys);

      const trunkAnimation = scene.beginAnimation(trunk, 0, 100, true);
      trunkAnimation.pause();

      progressRef.current = Math.min(Math.max(progressRef.current, 0), 1); // Clamp progress between 0 and 1
      trunkAnimation.goToFrame(progressRef.current * 100);

      for (const foliageInstance of foliageInstances) {
        const growFoliageAnimation = new Animation('growFoliageAnimation', 'scaling', 30, Animation.ANIMATIONTYPE_VECTOR3, Animation.ANIMATIONLOOPMODE_CONSTANT);
        const growFoliageKeys = [];
        growFoliageKeys.push({ frame: 0, value: new Vector3(0.01, 0.01, 0.01) });
        growFoliageKeys.push({ frame: progressRef.current * 100, value: new Vector3(1, 1, 1) });
        growFoliageAnimation.setKeys(growFoliageKeys);

        foliageInstance.animations.push(growFoliageAnimation);
        scene.beginAnimation(foliageInstance, 0, progressRef.current * 100, true);
      }
    };

    generateTree(trunkHeight, trunkRadius, trunkSubdivisions, branches);

    const handlePointerDown = (event) => {
      pointerDown.current = true;
      previousPointerPosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    const handlePointerUp = () => {
      pointerDown.current = false;
    };

    const handlePointerMove = (event) => {
      if (!pointerDown.current) return;

      const deltaX = event.clientX - previousPointerPosition.current.x;
      const rotationSpeed = 0.01 * trunkRadius;
      camera.alpha -= deltaX * rotationSpeed;

      previousPointerPosition.current = {
        x: event.clientX,
        y: event.clientY,
      };
    };

    canvas.addEventListener('pointerdown', handlePointerDown);
    canvas.addEventListener('pointerup', handlePointerUp);
    canvas.addEventListener('pointermove', handlePointerMove);

    return () => {
      engine.dispose();
      canvas.removeEventListener('pointerdown', handlePointerDown);
      canvas.removeEventListener('pointerup', handlePointerUp);
      canvas.removeEventListener('pointermove', handlePointerMove);
    };
  }, [progress]);

  return <canvas ref={canvasRef} id="babylon-canvas" style={{ width: '100%', height: '100vh' }} />;
};

export default BabylonTree;
