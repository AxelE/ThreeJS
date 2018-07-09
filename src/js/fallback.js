
// styles
import '../scss/index.scss';

// three.js
import * as THREE from 'three';
import 'three/examples/js/controls/PointerLockControls';


var camera, scene, renderer, geometry, material, mesh, terre, lune, pivotObject, pivotObject1;
var controls;


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

    // cubes floor
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

    var geometry = new THREE.SphereGeometry( 20, 32, 32 );
    var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    var sphere = new THREE.Mesh( geometry, material );
    sphere.position.x = -20;
    sphere.position.y = 50;
    sphere.position.z = -40;
    scene.add( sphere );

    var light = new THREE.PointLight( 0xffffff, 1, 3000 );


    sphere.add( light );
    scene.add(new THREE.AmbientLight(0x909090));

    var geometry2 = new THREE.SphereGeometry( 8, 22, 22 );
    var material2 = new THREE.MeshLambertMaterial( {color: 0x0000ff} );
    terre = new THREE.Mesh( geometry2, material2 );
    terre.position.x = 51;
    scene.add( terre );

    pivotObject = new THREE.Object3D();
    sphere.add(pivotObject);
    pivotObject.add( terre );

    var geometry3 = new THREE.SphereGeometry( 4, 10, 10 );
    var material3 = new THREE.MeshLambertMaterial( {color: 0xffffff} );
    lune = new THREE.Mesh( geometry3, material3 );
    lune.position.x = -27;
    scene.add( lune );

    pivotObject1 = new THREE.Object3D();
    terre.add( pivotObject1 );
    pivotObject1.add( lune );
}

var clock = new THREE.Clock();

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

function onMouseMove ( event ) {

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = ( event.clientY / window.innerHeight ) * 2 + 1;

}

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


    pivotObject.rotation.y += 0.01 * delta;
    pivotObject1.rotation.y += 0.2*delta;




    raycaster.setFromCamera( mouse, camera );

    var intersects = raycaster.intersectObjects( scene.children );

    for( var i = 0 ; i < intersects.length; i++ )
        intersects[i].object.material.color.set( 0xff0000 );




    renderer.render(scene, camera);


}

init();
animate();