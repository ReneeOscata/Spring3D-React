//import * as THREE from './three.module.js';
import * as THREE from './three.module.js';
import { Canvas } from "@react-three/fiber";
import React from "react";
import {resorte, resorte2, resorte3, resorte4} from './datos.js';
import { Euler } from './three.module.js';
//import { OrbitControls } from './OrbitControls.js';
//import { extend } from '@react-three/fiber'
import { Stats, OrbitControls } from '@react-three/drei'
//import { OrbitControls, TransformControls } from 'three-stdlib'
//extend({ OrbitControls, TransformControls })

function App() {
  const width = 1;
  //Loading
  const textureLoader = new THREE.TextureLoader()
  //const normalTexture = textureLoader.load('./textures/NormalMap2.png')
  //Material del resorte
  const material = new THREE.MeshStandardMaterial()
  material.metalness = 0.7
  material.roughness = 0.2
  //material.normalMap = normalTexture;
  material.color = new THREE.Color(0x292929)
  const alambre = 14
  return (
    <div id="canvas-container" style={{height: 800, width: 1800}}>
      <Canvas dpr={[1, 2]} camera={{ fov: 50, near: 0.1, far:5000, position: [0, 1000, 300]}}>
        <pointLight color={0xbb1818} intensity={50} position={[-80,430,-80]}/>
        {
          resorte3.map((punto, indice, arr) =>{
            if (indice < arr.length -1){
              let distanciaEntrePuntos = Math.pow(Math.pow(arr[indice+1][0]-arr[indice][0],2)+Math.pow(arr[indice+1][1]-arr[indice][1],2),0.5);
            
              let auxAlfa = (arr[indice+1][2]-arr[indice][2])/(arr[indice+1][0]-arr[indice][0]);
              let alfa = Math.atan(auxAlfa);
              let auxBeta = (arr[indice+1][2]-arr[indice][2])/(arr[indice+1][1]-arr[indice][1]);
              let beta = (Math.atan(auxBeta));//abs
              let auxTheta = (arr[indice+1][1]-arr[indice][1])/(arr[indice+1][0]-arr[indice][0]);
              let theta = Math.atan(auxTheta);
              
              let posX = (arr[indice+1][0]+arr[indice][0])/2;
              let posY = (arr[indice+1][1]+arr[indice][1])/2;
              let posZ = (arr[indice+1][2]+arr[indice][2])/2;
              
              let geometry = new THREE.CylinderBufferGeometry(alambre/2,alambre/2,distanciaEntrePuntos);
              let cilindro = new THREE.Mesh(geometry, material);
              let euler = new Euler(beta,alfa,1.5708+theta, 'XZY');
              cilindro.rotation.copy(euler);
              
              //cilindro.position.set(posX, posZ, posY);
              return <primitive object={cilindro} position={[posX, posY, posZ]} />
            }

          })
        }
        <OrbitControls />
        
      </Canvas>
    </div>
  )
}

export default App;
