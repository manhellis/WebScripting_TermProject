import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AnimationMixer } from 'three';

const scene = new THREE.Scene();

const frustumSize = 15;
const aspect = window.innerWidth / window.innerHeight;
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 50 );
camera.zoom = 1;
camera.position.set( -7, 8, 10 );



const renderer = new THREE.WebGLRenderer(
	{
		antialias: true,
		alpha: true

	});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x908E7F); 
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace = THREE.SRGBColorSpace;



const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.enableDamping = true;
controls.update();

document.body.appendChild( renderer.domElement );
// cube
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xFFD966 } );
// const cube = new THREE.Mesh( geometry, material );

// const edges = new THREE.EdgesGeometry( geometry ); 
// const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff} ) ); 

const loader = new GLTFLoader();

loader.load( '/Manh_scene10.glb', function ( gltf ) {
    const model = gltf.scene;
	model.position.set( 0, -2, 0 );
	scene.add( model );
   

}, undefined, function ( error ) {

	console.error( error );

} );

// scene.add( line );
// scene.add( cube );


const light = new THREE.AmbientLight( 0x404040 , 20); // soft white light
scene.add( light );


// const light2 = new THREE.PointLight( 0x404040, 100, 100 );
// light2.position.set( 1, 2, 1.5);
// scene.add( light2 );






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