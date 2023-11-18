import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff ); 
renderer.outputColorSpace = THREE.SRGBColorSpace;

const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xFFD966 } );
const cube = new THREE.Mesh( geometry, material );

const edges = new THREE.EdgesGeometry( geometry ); 
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff} ) ); 

const loader = new GLTFLoader();

loader.load( '/koi_fish.glb', function ( gltf ) {
    gltf.animations; // Array<THREE.AnimaxtionClip>
    gltf.scene; // THREE.Group
    gltf.scenes; // Array<THREE.Group>
    gltf.cameras; // Array<THREE.Camera>
    gltf.asset; // Object
	scene.add( gltf.scene );
   

}, undefined, function ( error ) {

	console.error( error );

} );

scene.add( line );
scene.add( cube );

const light = new THREE.AmbientLight( 0x404040 , 100 ); // soft white light
scene.add( light );



camera.position.z = 5;
controls.update();


function animate() {
	requestAnimationFrame( animate );
    controls.update();

	cube.rotation.x += 0.01;
	cube.rotation.y += 0.01;
    line.rotation.x += 0.01;
    line.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();