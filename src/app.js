let scene, camera, renderer, cone, stage;
let ADD = 0.005;

let addStage = () => {
    var geometry = new THREE.BoxGeometry( 20, 8, 2 );
    var material = new THREE.MeshBasicMaterial( {color: 0x00a1cb} );
    stage = new THREE.Mesh( geometry, material );

    // wireframe
    var geo = new THREE.EdgesGeometry( stage.geometry );
    var mat = new THREE.LineBasicMaterial( { color: 0x000000, linewidth: 4 } );
    var wireframe = new THREE.LineSegments( geo, mat );
    wireframe.renderOrder = 1; // make sure wireframes are rendered 2nd
    stage.add( wireframe );

    scene.add( stage );
}

let initScene = () => {
    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xababab);

    camera = new THREE.PerspectiveCamera(30,
                windowWidth / windowHeight,
                1, 1000);

    camera.position.z = 50;

    let axes = new THREE.AxesHelper(15);
    scene.add(axes);

    addStage();

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(windowWidth, windowHeight);

    document.body.appendChild(renderer.domElement);
}

let mainLoop = () => {
    stage.rotation.x -= ADD;
    stage.rotation.z -= ADD / 2;

    renderer.render(scene, camera);
    requestAnimationFrame(mainLoop);
}

initScene();
mainLoop();