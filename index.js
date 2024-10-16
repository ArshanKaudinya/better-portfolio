import * as THREE from 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.module.js';

let scene, camera, renderer, questionMark, whoText, isText, nameText;
let idleRotationSpeed = 0.007; // Speed for idle rotation on the x-axis


function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.z = 30;

    renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('three-canvas'), alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true; 

    setupLighting();

    questionMark = createQuestionMark();
    scene.add(questionMark);

    whoText = createWhoText();
    whoText.visible = false; 
    scene.add(whoText);

    isText = createIsText();
    isText.visible = false;
    scene.add(isText);

    nameText = createNameText();
    nameText.visible = false;
    scene.add(nameText);

    animate();
}

function setupLighting() {
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 10, 10);
    directionalLight.castShadow = true;
    scene.add(directionalLight);
}

// Create the question mark geometry
/* 
function createQuestionMark() {
    const group = new THREE.Group();
    const segments = 5;
    const material = new THREE.MeshPhongMaterial({ color: 0x333333, flatShading: true });

    // Torus (curved part)
    const torus = new THREE.Mesh(new THREE.TorusGeometry(6, 1.6, segments, segments, Math.PI * 1.5), material);
    torus.rotation.set(Math.PI * 2, Math.PI, 0);
    torus.position.set(0, 5, 0);
    torus.castShadow = true;
    group.add(torus);

    // Cap at the end of the torus
    const cap = new THREE.Mesh(new THREE.CircleGeometry(1.6, segments), material);
    cap.rotation.set(Math.PI / 2, 0, 6.9);
    cap.position.set(-6, 5, -0.1);
    cap.castShadow = true;
    group.add(cap);

    // Vertical bar (Cylinder)
    const verticalBar = new THREE.Mesh(new THREE.CylinderGeometry(1.6, 1.6, 11, segments), material);
    verticalBar.position.set(0, -5.2, 0);
    verticalBar.castShadow = true;
    group.add(verticalBar);

    // Sphere (dot at the bottom)
    const sphere = new THREE.Mesh(new THREE.SphereGeometry(2, segments, segments), material);
    sphere.position.set(0, -15, 0);
    sphere.castShadow = true;
    group.add(sphere);

    group.scale.set(1, 1, 1);
    group.receiveShadow = true;

    return group;
} 
*/


const fontPath = 'fonts\\Amaranth_Regular.json'; // Change font

function createQuestionMark() {
    const loader = new THREE.FontLoader();
    const textGroup = new THREE.Group();

    loader.load(fontPath, function(font) {
        const textGeometry = new THREE.TextGeometry('?', {
            font: font,
            size: 15,
            height: 1,
            curveSegments: 12,
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, flatShading: true });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-5.7, -7, 0); 
        textMesh.castShadow = true;

        textGroup.add(textMesh);
    });

    return textGroup;
}

function createWhoText() {
    const loader = new THREE.FontLoader();
    const textGroup = new THREE.Group();

    loader.load(fontPath, function(font) {
        const textGeometry = new THREE.TextGeometry('who', {
            font: font,
            size: 6,
            height: 1,
            curveSegments: 12,
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, flatShading: true });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-8, -3, 0); 
        textMesh.castShadow = true;

        textGroup.add(textMesh);
    });

    return textGroup;
}


function createIsText() {
    const loader = new THREE.FontLoader();
    const textGroup = new THREE.Group();

    loader.load(fontPath, function(font) {
        const textGeometry = new THREE.TextGeometry('is', {
            font: font,
            size: 6,
            height: 1,
            curveSegments: 12,
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, flatShading: true });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-8, -3, 0); 
        textMesh.castShadow = true;

        textGroup.add(textMesh);
    });

    return textGroup;
}

function createNameText() {
    const loader = new THREE.FontLoader();
    const textGroup = new THREE.Group();

    loader.load(fontPath, function(font) {
        const textGeometry = new THREE.TextGeometry('name', {
            font: font,
            size: 6,
            height: 1,
            curveSegments: 12,
        });

        const textMaterial = new THREE.MeshPhongMaterial({ color: 0x333333, flatShading: true });
        const textMesh = new THREE.Mesh(textGeometry, textMaterial);
        textMesh.position.set(-8, -3, 0); 
        textMesh.castShadow = true;

        textGroup.add(textMesh);
    });

    return textGroup;
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

window.addEventListener('scroll', () => {
    const scrollY = window.scrollY / 7;
    const scaleFactor = 1 + scrollY / 250;
    
    questionMark.scale.set(scaleFactor, scaleFactor, scaleFactor);
    questionMark.rotation.x = scrollY / 350 * Math.PI;
    questionMark.rotation.y = scrollY / 350 * Math.PI * 2;

    if (scrollY >= 480) {
        questionMark.visible = false; 
    } else {
        questionMark.visible = true; 
    }
    
    if (scrollY > 480 && scrollY <= 900) {
        whoText.visible = true;
        const textScale = scaleFactor - 480 / 250;
        whoText.scale.set(textScale, textScale, textScale);
        whoText.rotation.x = (scrollY - 480) / 350 * Math.PI;
        whoText.rotation.y = (scrollY - 480) / 350 * Math.PI;
    } else {
        whoText.visible = false;
    }

    // Add logic for 'is' text appearance between 900 and 1200
    if (scrollY > 900 && scrollY <= 1200) {
        isText.visible = true;
        const textScale = scaleFactor - 900 / 250;
        isText.scale.set(textScale, textScale, textScale);
        isText.rotation.x = (scrollY - 900) / 350 * Math.PI;
        isText.rotation.y = (scrollY - 900) / 350 * Math.PI;
    } else {
        isText.visible = false;
    }

    // Add logic for 'name' text appearance after 1200
    if (scrollY > 1200 && scrollY <= 1500) {
        nameText.visible = true;
        const textScale = scaleFactor - 1200 / 250;
        nameText.scale.set(textScale, textScale, textScale);
        nameText.rotation.x = (scrollY - 1200) / 350 * Math.PI;
        nameText.rotation.y = (scrollY - 1200) / 350 * Math.PI;
    } else {
        nameText.visible = false;
    }
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    questionMark.rotation.y += idleRotationSpeed; // Rotate question mark 
    whoText.rotation.y += idleRotationSpeed; // Rotate "WHO" text 
    renderer.render(scene, camera);
}

init();




