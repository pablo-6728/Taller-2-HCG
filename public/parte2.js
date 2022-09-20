import * as THREE from 'three';
import {OrbitControls} from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'

//crear un espacio donde hayan 2 figuras y cada una tiene distintas texturas
const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
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
const geometry = new THREE.BoxGeometry(5, 5, 5)
const material = new THREE.MeshLambertMaterial({}) //añadir el color

const cube01 = new THREE.Mesh(geometry, material)
cube01.position.set(0, 2.51, -10)
const cube02 = new THREE.Mesh(geometry, material)
cube02.position.set(0, 2.51, 10)
//TODO: añadir las texturas a los cubos



scene.add(cube01)
scene.add(cube02)
//añadir una luz para que se vea la escena
const light = new THREE.AmbientLight(0xffffff, 1)
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
