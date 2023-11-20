import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AnimationMixer } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const renderer = new THREE.WebGLRenderer(
	{
		antialias: true,
		alpha: true

	});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0xffffff ); 
renderer.outputColorSpace = THREE.SRGBColorSpace;

const controls = new OrbitControls( camera, renderer.domElement );
document.body.appendChild( renderer.domElement );
// cube
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xFFD966 } );
// const cube = new THREE.Mesh( geometry, material );

// const edges = new THREE.EdgesGeometry( geometry ); 
// const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff} ) ); 

const loader = new GLTFLoader();

loader.load( '/Manh_scene10.glb', function ( gltf ) {
    
	scene.add( gltf.scene );
   

}, undefined, function ( error ) {

	console.error( error );

} );

// scene.add( line );
// scene.add( cube );

const light = new THREE.AmbientLight( 0x404040 , 40); // soft white light
const light2 = new THREE.PointLight( 0x404040, 100, 100 );
light2.position.set( 1, 2, 1.5);
scene.add( light2 );
// scene.add( light );



camera.position.z = 5;
controls.update();

// cube.position.x = 3;
// line.position.x = 3;
function animate() {
	requestAnimationFrame( animate );
    controls.update();
    
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
    // line.rotation.x += 0.01;
    // line.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();