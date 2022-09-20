import * as THREE from 'three';
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'

//crear un espacio donde hayan 2 figuras y cada una tiene distintas texturas
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.set(30, 20, 0)

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

const controls = new OrbitControls(camera, renderer.domElement)

//añadir el plano
const planeSize = 100
const planeGeo = new THREE.PlaneGeometry(planeSize, planeSize)
const planeMat = new THREE.MeshPhongMaterial({
    color: 0xc25768,
    side: THREE.DoubleSide
})
const mesh = new THREE.Mesh(planeGeo, planeMat);
mesh.rotation.x = Math.PI * -.5;
mesh.receiveShadow = true
mesh.receiveShadow = true
scene.add(mesh);

//añadir los cubos
const texture01 = new THREE.TextureLoader().load("img/shrek_texture.jpeg")
const material01 = new THREE.MeshLambertMaterial({
    map: texture01,
    side: THREE.DoubleSide
}) 

const texture02 = new THREE.TextureLoader().load("img/meme.jpg")
const material02 = new THREE.MeshLambertMaterial({
    map:texture02,
    side: THREE.DoubleSide,
})
texture02.wrapS = THREE.RepeatWrapping
texture02.wrapT = THREE.RepeatWrapping
texture02.repeat.set(4,4)

const geometry = new THREE.BoxGeometry(15, 15, 15)
const cube01 = new THREE.Mesh(geometry, material01)
cube01.position.set(0, 12.51, -10)
const cube02 = new THREE.Mesh(geometry, material02)
cube02.position.set(0, 12.51, 10)

scene.add(cube01)
scene.add(cube02)

//añadir una luz para que se vea la escena
const light = new THREE.SpotLight(0xffffff, 1.5)
light.position.set(40, 50, 0)
scene.add(light)

//creacion de la escena
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
