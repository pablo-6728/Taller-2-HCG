import * as THREE from 'three';
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'

//crear un espacio donde haya una figura y 3 luces que le peguen de distintas fuentes
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(20, 20, 4)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

//añadir el plano
const planeColor = new THREE.Color("rgb(121, 98, 122)")
const planeSize = 80
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize);
const planeMat = new THREE.MeshPhongMaterial({
  color: planeColor,
  side: THREE.DoubleSide,
});
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
mesh.receiveShadow = true
mesh.receiveShadow = true
scene.add(mesh);

//creacion del cubo
const geometry = new THREE.BoxGeometry(3, 3, 3)
const material = new THREE.MeshLambertMaterial({color: 0x633d69})
const cube = new THREE.Mesh(geometry, material)
cube.position.set(0, 1.6, 0)
cube.castShadow = true
//cube.receiveShadow = true

scene.add(cube)

//poner las luces
const light1 = new THREE.SpotLight(0xfff00f, 1.5)
light1.castShadow = true
light1.receiveShadow = true
light1.shadow.bias = -0.005
light1.decay = 2
light1.position.set(-15, 8, 0)


const light2 = new THREE.SpotLight(0x5034cf, 1.5)
light2.castShadow = true
light2.receiveShadow = true
light2.shadow.bias = -0.005
light2.decay = 2
light2.position.set(15, 8, 0)

const light3 = new THREE.SpotLight(0x61f277, 1.7)
light3.castShadow = true
light3.receiveShadow = true
light3.shadow.bias = -0.005
light3.decay = 2
light3.position.set(0, 8, 15)


scene.add(light1)
scene.add(light2)
scene.add(light3)



window.addEventListener(
    'resize',
    ()=>{
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        renderer()
    },
    false
)

const stats = Stats()
document.body.appendChild(stats.dom)

function animate(){
    requestAnimationFrame(animate)
    controls.update()
    render()
    stats.update()
}

function render(){
    renderer.render(scene, camera)
}

animate()
