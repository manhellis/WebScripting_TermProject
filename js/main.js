import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AnimationMixer } from 'three';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const aspect = window.innerWidth / window.innerHeight;
const frustumSize = 10;
// const camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 1000 );
// camera.up.set(0,0,1);
camera.position.set(5,0,10);
// Define the axis to rotate around (x, y, z)
var axis = new THREE.Vector3(0,0,1);

// Convert the angle to radians
var angle = Math.PI / 2; // 90 degrees

// Rotate the camera
// camera.rotateOnAxis(axis, angle);
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

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0xFFD966 } );
// const cube = new THREE.Mesh( geometry, material );
// cube.position.x = 3;
// scene.add( cube );

// texture
const texLoad= new THREE.TextureLoader();

// load a resource
texLoad.load(
	// resource URL
	'textures/Grass_04.png',

	// onLoad callback
	function ( texture ) {
		// in this example we create the material when the texture is loaded
		const material = new THREE.MeshBasicMaterial( {
			map: texture
		 } );
	},

	// onProgress callback currently not supported
	undefined,

	// onError callback
	function ( err ) {
		console.error( 'An error happened.' );
	}
);
//


const edges = new THREE.EdgesGeometry( geometry ); 
const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff} ) ); 

const loader = new GLTFLoader();

loader.load( '/Manh_scene5.glb', function ( gltf ) {
    
	scene.add( gltf.scene );
   

}, undefined, function ( error ) {

	console.error( error );

} );




const light = new THREE.AmbientLight( 0x404040 , 40); // soft white light
const light2 = new THREE.PointLight( 0x404040, 100, 100 );
light2.position.set( 1, 2, 1.5);
scene.add( light2 );
scene.add( light );



camera.position.z = 5;
controls.update();


line.position.x = 3;
function animate() {
	requestAnimationFrame( animate );
    controls.update();
	camera.updateMatrixWorld();

	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
    // line.rotation.x += 0.01;
    // line.rotation.y += 0.01;

	renderer.render( scene, camera );
}

animate();