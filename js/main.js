import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';
import { AnimationMixer } from 'three';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const scene = new THREE.Scene();

const frustumSize = 15;


const aspect = window.innerWidth / window.innerHeight;
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
const camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, 0.1, 50 );
camera.zoom = 1;
camera.position.set( -6,4, 6 );
camera.lookAt( 0, 0, 0 );


window.addEventListener( 'resize', onWindowResize );




document.querySelector('.cam1').addEventListener('click', (e) => {
	animateCamera();
	
	console.log('clicked');
});

const renderer = new THREE.WebGLRenderer(
	{
		antialias: true,
		alpha: true

	});
renderer.setSize( window.innerWidth, window.innerHeight );
// renderer.setClearColor( 0x908E7F); 
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.outputColorSpace = THREE.SRGBColorSpace;



const controls = new OrbitControls( camera, renderer.domElement );
controls.enablePan = false;
controls.enableDamping = true;
controls.target.set( 0, 2, 0 );
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
	model.position.set( 0, 0, 0 );
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
gsap.registerPlugin(ScrollTrigger);
let target = new THREE.Vector3( 0, 0, 0 )
let tl = gsap.timeline({
	
	scrollTrigger: {
		scroller: "body", // the element with CSS scroll snap
        trigger: ".box1",
        pin: true,
        start: "top top", // when the top of the trigger hits the top of the viewport
        end: "bottom",
        scrub: true,
	// 	trigger: ".box1",
	// 	pin:true,
	// 	start: "top top", // when the top of the trigger hits the top of the viewport
	// 	end: "bottom center",
	// 	scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	// 	// toggleActions: "restart none none reverse"
	// 	paused: true,
	}
})
tl.to(controls.target, { // cow
	duration: 1.5, 
	x:-1.725, 
	y: 1, 
	z: 1.754, 
	ease: "power2.inOut",
	// scrollTrigger: {
	// 	scroller: ".snap-y",
	// 	trigger: ".box2",
	// 	start: 'center 55%',
	// 	markers: true,
	// 	toggleActions: 'play complete restart reverse'
	//   }, 
	onUpdate: function() {
		controls.update();
		camera.lookAt( target );
		camera.updateProjectionMatrix();
	  }
}); // 1 means 1st set of animations
tl.to(camera,{
	duration: 1,
	zoom:3,
	ease: "power2.inOut",
	onUpdate: function() {
		camera.updateProjectionMatrix();
		controls.update();
	  }
});


let tl2 = gsap.timeline({
	scrollTrigger: {
		scroller: "body", // the element with CSS scroll snap
		trigger: ".box2",
		pin: true,
		start: "top top", // when the top of the trigger hits the top of the viewport
		end: "bottom",
		scrub: true,
	// 	trigger: ".box2",
	// 	pin:true,
	// 	start: "top top", // when the top of the trigger hits the top of the viewport
	// 	end: "bottom center",
	// 	scrub: true, // smooth scrubbing, takes 1 second to "catch up" to the scrollbar
	// 	// toggleActions: "restart none none reverse"
	// 	paused: true,
	}
})
	
tl2.to(controls.target, { // windmill
	// duration: 2, 
	x: -3.732, 
	y: 3, 
	z: -3.497, 
	
	ease: "power2.inOut",
	onUpdate: function() {
		camera.lookAt( target );
		
		camera.updateProjectionMatrix();
		controls.update();
	  }
},);

// 
gsap.to(controls.target, { // tree
	// duration: 2, 
	x: 2.068, 
	y: 1, 
	z: 2.558, 
	
	ease: "power2.inOut",
	scrollTrigger: {
		scroller: "body", // the element with CSS scroll snap
		trigger: ".box3",
		pin: true,
		start: "top top", // when the top of the trigger hits the top of the viewport
		end: "bottom",
		scrub: true,
	},
	onUpdate: function() {
		camera.lookAt( target );
		
		camera.updateProjectionMatrix();
		controls.update();
	}
});

let tl3 = gsap.timeline({
	scrollTrigger: {
		scroller: "body", // the element with CSS scroll snap
		trigger: ".box4",
		pin: true,
		start: "top top", // when the top of the trigger hits the top of the viewport
		end: "bottom",
		scrub: true,
	}
});


tl3.to(camera,{
	duration: 1,
	zoom:2,
	ease: "power2.inOut",
	onUpdate: function() {
		camera.updateProjectionMatrix();
		controls.update();
	  }
},'final');

const animateCamera = () => {
	tl.play();
	
}



// animateCamera();
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


function onWindowResize() {

	const aspect = window.innerWidth / window.innerHeight;

	camera.left = - frustumSize * aspect / 2;
	camera.right = frustumSize * aspect / 2;
	camera.top = frustumSize / 2;
	camera.bottom = - frustumSize / 2;

	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}