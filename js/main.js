import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
// import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { PMREMGenerator } from 'three/src/extras/PMREMGenerator.js';
import { AnimationMixer } from 'three';
import { gsap } from "gsap";
// import { ScrollTrigger } from "gsap/ScrollTrigger";

const scene = new THREE.Scene();

const frustumSize = 15;


const aspect = window.innerWidth / window.innerHeight;
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
// const camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 50 );
// camera.zoom = 1;
// camera.position.set( -40,20, 95 );
// camera.lookAt( -50,20,95 );


window.addEventListener( 'resize', onWindowResize );




const renderer = new THREE.WebGLRenderer(
	{
		antialias: true,
		alpha: true

	});
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.setClearColor( 0x908E7F); 
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.6;
renderer.outputColorSpace = THREE.SRGBColorSpace;

const pmremGenerator = new THREE.PMREMGenerator( renderer );

// const light = new THREE.AmbientLight( 0x404040 , 1); // soft white light
// scene.add( light );
scene.background = new THREE.Color( 0xbfe3dd );
scene.environment = pmremGenerator.fromScene( new RoomEnvironment( renderer ), 0.04 ).texture;


// const controls = new OrbitControls( camera, renderer.domElement );
// controls.enablePan = false;
// controls.enableDamping = true;
// controls.target.set( 0, 2, 0 );
// controls.update();

document.body.appendChild( renderer.domElement );
// cube
// const geometry = new THREE.BoxGeometry( 1, 1, 1 );
// const material = new THREE.MeshBasicMaterial( { color: 0xFFD966 } );
// const cube = new THREE.Mesh( geometry, material );

// const edges = new THREE.EdgesGeometry( geometry ); 
// const line = new THREE.LineSegments(edges, new THREE.LineBasicMaterial( { color: 0xffffff} ) ); 

const loader = new GLTFLoader();

loader.load( '/ManhDiorama_scene.glb', function ( gltf ) {
	gltf.scene.scale.set(2, 2, 2)
	gltf.scene.traverse(function (child) {
		if (child.isMesh) {
			child.castShadow = true
			child.receiveShadow = true
		}
	})
    const model = gltf.scene;
	model.position.set( 0, 0, 0 );
	model.rotation.set( 0, 90,0);
	
	scene.add( model );
   

}, undefined, function ( error ) {

	console.error( error );

} );

// scene.add( line );
// scene.add( cube );





gsap.set(camera.position, {
	x: -40,
	y: 20,
	z: 95
});


// animateCamera();
// cube.position.x = 3;
// line.position.x = 3;
function animate() {
	requestAnimationFrame( animate );
    // controls.update();
    
	// cube.rotation.x += 0.01;
	// cube.rotation.y += 0.01;
    // line.rotation.x += 0.01;
    // line.rotation.y += 0.01;
	
	renderer.render( scene, camera );
}

const pos1 = document.querySelector('.pos1');
const pos2 = document.querySelector('.pos2');
const pos3 = document.querySelector('.pos3');

function createCameraAnimationTimeline() {
    // Create a new timeline
    const tl = gsap.timeline({paused: true});

    // Define various target positions to animate to
	tl.to(camera.position, {
		x: -40,
		y: 20,
		z: 95,
		duration: 2, // Customize duration as needed
		ease: "power2.inOut",
		onUpdate: () => {
			// controls.target.set(-30, 20, 80);
			// controls.update();
		},
		onComplete: () => {
			showElement(pos1);
			hideElement(pos2);
		}
	}).addLabel('position1');

		// Animation to the second position
	tl.to(camera.position, {
		x: 40,
		y: 20,
		z: 80,
		duration: 3, // Customize duration as needed
		ease: "power2.inOut",
		onUpdate: () => {
			// controls.target.set(4, 20, 80);
			// controls.update();
		},
		onComplete: () => {
			hideElement(pos1);
			hideElement(pos3);
			showElement(pos2);
		}
	}).addLabel('position2');

		// Animation to the third position
	tl.to(camera.position, {
		x: 100,
		y: 20,
		z: 50,
		duration: 4, // Customize duration as needed
		ease: "power2.inOut",
		// onUpdate: () => controls.update(),
		onComplete: () => {
			hideElement(pos2);
			showElement(pos3);	
		}
    }).addLabel('position3');

    // Continue adding more positions if needed
	tl.paused(true);
    return tl;
}

// Create the timeline
const cameraAnimationTimeline = createCameraAnimationTimeline();
cameraAnimationTimeline.seek('position1');
// Event listener for button to animate to the first position
document.querySelector('.cam1').addEventListener('click', () => {
	// controls.enabled = false;
    cameraAnimationTimeline.tweenFromTo(cameraAnimationTimeline.currentLabel(),cameraAnimationTimeline.previousLabel());

	
});

// Event listener for button to animate to the second position
document.querySelector('.cam2').addEventListener('click', () => {
	// controls.enabled = false;
    cameraAnimationTimeline.tweenFromTo(cameraAnimationTimeline.currentLabel(),cameraAnimationTimeline.nextLabel());

});


// turn the butons into delay based triggers for the html displays

const hideElement = (element) => {
	element.classList.add('hidden');
}
const showElement = (element) => {
	element.classList.remove('hidden');
}


function onWindowResize() {

	const aspect = window.innerWidth / window.innerHeight;

	camera.left = - frustumSize * aspect / 2;
	camera.right = frustumSize * aspect / 2;
	camera.top = frustumSize / 2;
	camera.bottom = - frustumSize / 2;

	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}
animate();
