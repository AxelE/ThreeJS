
//Récupération de la vue FPS fait par https://github.com/titoasty/boilerplate-threejs

// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';


var camera, scene, renderer, geometry, material, mesh;
var controls;
var sun = new THREE.Mesh;


var keys = [];
document.onkeydown = function (e) {
    e = e || window.event;
    keys[e.keyCode] = true;
};

document.onkeyup = function (e) {
    e = e || window.event;
    keys[e.keyCode] = false;
};


function init() {
    scene = new THREE.Scene();

    // camera
    camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.z = 50;

    /* cubes floor
    for (var x = 0; x < 30; x++) {
        for (var y = 0; y < 30; y++) {
            var geometry = new THREE.BoxGeometry(2, 2, 2);
            var material = new THREE.MeshBasicMaterial({
                color: Math.floor(Math.random() * 16777215)
            });
            var mesh = new THREE.Mesh(geometry, material);
            mesh.position.x -= x * 2;
            mesh.position.z -= y * 2;
            mesh.position.y = -2;

            scene.add(mesh);
        }
    }
    */

    var geometry = new THREE.Geometry();

    geometry.vertices.push(
        new THREE.Vector3(-10, 10, 0),
        new THREE.Vector3(-10, -10, 0),
        new THREE.Vector3(10, -10, 0),
        new THREE.Vector3(10, 10, 0),
        new THREE.Vector3(0, 10, -10),
        new THREE.Vector3(0, -10, -10),
        new THREE.Vector3(0, -10, 10),
        new THREE.Vector3(0, 10, 10),
    );

    //Carré
    geometry.faces.push(new THREE.Face3(0, 1, 2), new THREE.Face3(0, 2, 3));

    var material = new THREE.MeshBasicMaterial({color: 0xffff00});
    var mesh = new THREE.Mesh(geometry, material);

    scene.add(mesh);

    // add sunlight light
    var directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(200, 0, 0);
    directionalLight.name = "directional";
    scene.add(directionalLight);

    var geo = new THREE.SphereGeometry( 5, 32, 32 );
    var mat = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    sun = new THREE.Mesh( geo, mat );
    sun.position.y = 200;
    sun.position.x = 200;
    scene.add( sun );

    var geo = new THREE.SphereGeometry( 3, 12, 12 );
    var mat = new THREE.MeshBasicMaterial( {color: 0x0000FF} );
    var earth = new THREE.Mesh( geo, mat );
    earth.position.y = 0;
    earth.position.x = 20;
    sun.add( earth );

    // renderer
    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    document.body.appendChild(renderer.domElement);

    // mouse view controls
    controls = new THREE.PointerLockControls(camera);
    scene.add(controls.getObject());

    // pointer lock
    var element = document.body;

    var pointerlockchange = function (event) {
        if (document.pointerLockElement == element) {
            controls.enabled = true;
        } else {
            controls.enabled = false;
        }
    };
    var pointerlockerror = function (event) {};

    // hook pointer lock state change events
    document.addEventListener('pointerlockchange', pointerlockchange, false);
    document.addEventListener('pointerlockerror', pointerlockerror, false);

    element.addEventListener('click', function () {
        element.requestPointerLock = element.requestPointerLock || element.mozRequestPointerLock || element.webkitRequestPointerLock;
        element.requestPointerLock();
    }, false);
}

var clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);

    var delta = clock.getDelta();
    var speed = 10;

    // up
    if (keys[38]) {
        controls.getObject().translateZ(-delta * speed);
    }
    // down
    if (keys[40]) {
        controls.getObject().translateZ(delta * speed);
    }
    // left
    if (keys[37]) {
        controls.getObject().translateX(-delta * speed);
    }
    // right
    if (keys[39]) {
        controls.getObject().translateX(delta * speed);
    }

    sun.rotation.y += 0.008;

    renderer.render(scene, camera);
}

init();
animate();
