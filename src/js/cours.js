// three.js
import * as THREE from 'three';

//Scene
const scene = new THREE.Scene();

//Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth /window.innerHeight, 1, 10000);
camera.rotation.set(0,0,0);
const renderer = new THREE.WebGLRenderer();

//FPS Vue
let fpsObject = new THREE.Object3D();
scene.add(fpsObject);

//Pitch quand t'as un ptit creux
let pitchObject = new THREE.Object3D();
pitchObject.add(camera);

//YARRR
let yawObject = new THREE.Object3D();
yawObject.position.y = 10;
yawObject.add(pitchObject);
fpsObject.add(yawObject);

camera.position.z = 1000;
let geometry = new THREE.SphereGeometry(200, 200, 200);
let material = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    wireframe: true
});
let mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);


let parent = new THREE.Mesh(new THREE.BoxGeometry(200,200,200), new THREE.MeshBasicMaterial({color : 0xff0000}));

let child0 = new THREE.Mesh(new THREE.BoxGeometry(200,200,200), new THREE.MeshBasicMaterial({color : 0x00ff00}));


child0.position.x = 200;

scene.add(parent);
parent.add(child0);



new THREE.Object3D();

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

/* Cours 1

let mouse ;

function mouseTracker(e){
    parent.rotation.y += (e.movementX / 100);
    parent.rotation.x += (e.movementY / 100);
}

function enableMouseTracking(e){
    mouse = window.addEventListener('mousemove', mouseTracker, false);
}

function disableMouseTracking(e){
    window.removeEventListener("mousemove", mouseTracker);
}
window.addEventListener('mousedown', enableMouseTracking, false);
window.addEventListener('mouseup', disableMouseTracking, false);

*/

//Cours 2
document.addEventListener('mousemove', function (event) {
    const movementX = event.movementX;
    const movementY = event.movementY;

    yawObject.rotation.y -= movementX * 0.002;
    pitchObject.rotation.x -= movementY * 0.002;

    pitchObject.rotation.x = Math.max(-Math.PI/2, Math.min(Math.PI/2, pitchObject.rotation.x));
}, false);

function animate() {
    requestAnimationFrame( animate );
    update();
    renderer.render( scene, camera );
}
animate();

//window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}, false);