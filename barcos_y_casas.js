const loader = new THREE.GLTFLoader();

function crearVisor(idContenedor){

    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1a2b);

    let camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    // CÁMARA FIJA
    camera.position.set(0, 2, 6);
    camera.lookAt(0, -1, 0);

    let renderer = new THREE.WebGLRenderer({
        antialias: true
    });

    renderer.setSize(
        window.innerWidth,
        window.innerHeight
    );

    document
        .getElementById(idContenedor)
        .appendChild(renderer.domElement);

    // =====================
    // LUCES
    // =====================

    const luzDir = new THREE.DirectionalLight(
        0xE4D96F,
        3
    );

    luzDir.position.set(-5, 5, 5);
    scene.add(luzDir);

    const luzAmb = new THREE.PointLight(
        0xE4D96F,
        1
    );

    luzAmb.position.set(0, 2, 0);
    scene.add(luzAmb);

    // =====================
    // AGUA
    // =====================

    let aguaGeo = new THREE.PlaneGeometry(
        200,
        200,
        50,
        50
    );

    let aguaMat = new THREE.MeshPhongMaterial({
        color: 0x2E42FF,
        transparent: true,
        opacity: 0.6
    });

    let agua = new THREE.Mesh(
        aguaGeo,
        aguaMat
    );

    agua.rotation.x = -Math.PI / 2;
    agua.position.y = -2;

    scene.add(agua);

    // =====================
    // BARCO
    // =====================

    let barco = null;

    loader.load(
        "barcoDoble.glb",
        function(gltf){

            barco = gltf.scene;

            barco.scale.set(
                1,
                1,
                1
            );

            barco.position.set(
                3,
                -2,
                0
            );

            scene.add(barco);
        }
    );

    // =====================
    // ANIMACIÓN
    // =====================

    let tiempo = 0;

    function animate(){

        requestAnimationFrame(animate);

        tiempo += 0.02;

        // Olas del agua
        const pos =
            agua.geometry.attributes.position;

        for(let i = 0; i < pos.count; i++){

            let x = pos.getX(i);
            let y = pos.getY(i);

            let z =
                Math.sin(x * 0.2 + tiempo) * 0.2 +
                Math.cos(y * 0.2 + tiempo) * 0.2;

            pos.setZ(i, z);
        }

        pos.needsUpdate = true;
        agua.geometry.computeVertexNormals();

        // Animación del barco
        if(barco){

            // Giro sobre sí mismo
            barco.rotation.y += 0.003;

            // Balanceo lateral
            barco.rotation.z =
                Math.sin(tiempo * 2) * 0.03;

            // Subir y bajar
            barco.position.y =
    -3 +
    Math.sin(tiempo * 2) * 0.08;
        }

        camera.lookAt(0, -1, 0);

        renderer.render(
            scene,
            camera
        );
    }

    animate();

    // Responsive
    window.addEventListener(
        "resize",
        function(){

            camera.aspect =
                window.innerWidth /
                window.innerHeight;

            camera.updateProjectionMatrix();

            renderer.setSize(
                window.innerWidth,
                window.innerHeight
            );
        }
    );
}

// INICIO
crearVisor("barcoModelo");