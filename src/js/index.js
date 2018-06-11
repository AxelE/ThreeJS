// three.js
import * as THREE from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 1, 10000);
const renderer = new THREE.WebGLRenderer();

camera.position.z = 1000;
var geometry = new THREE.BoxGeometry(200, 200, 200);
var material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
})
let mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


renderer.setSize(window.innerWidth,window.innerHeight);
document.body.appendChild(renderer.domElement);
let moveState = {
    left: false,
    right: false,
    up: false,
    down: false,
};
let moveIteration= {
    left: 1,
    right: 1,
    up: 1,
    down: 1
}

function update(){

    if(moveState.up) {
        mesh.rotation.x -= 0.01;
    }

    if(moveState.down) {
        mesh.rotation.x += 0.01;
    }
    if(moveState.left) {
        mesh.rotation.y -= 0.01;
    }
    if(moveState.right) {
        mesh.rotation.y += 0.01;
    }
}

function enableMoveState(e){
    switch(e.keyCode){
        case 37:
            moveState.left = true;
            break;
        case 38:
            moveState.up = true;
            break;
        case 39:
            moveState.right = true;
            break;
        case 40:
            moveState.down = true;
            break;
    }
}

function disableMoveState(e){
    switch(e.keyCode){
        case 37:
            moveState.left = false;
            break;
        case 38:
            moveState.up = false;
            break;
        case 39:
            moveState.right = false;
            break;
        case 40:
            moveState.down = false;
            break;
    }
}
window.addEventListener('keydown', enableMoveState, false);
window.addEventListener('keyup', disableMoveState, false);

var mouse ;

function mouseTracker(e){
    mesh.rotation.y += (e.movementX / 100);
    mesh.rotation.x += (e.movementY / 100);
}

function enableMouseTracking(e){
    mouse = window.addEventListener('mousemove', mouseTracker, false);
}

function disableMouseTracking(e){
    window.removeEventListener("mousemove", mouseTracker);
}
window.addEventListener('mousedown', enableMouseTracking, false);
window.addEventListener('mouseup', disableMouseTracking, false);


function animate() {
    requestAnimationFrame( animate );
    update();
    renderer.render( scene, camera );
}
animate();



