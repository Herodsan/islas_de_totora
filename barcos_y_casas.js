const loader = new THREE.GLTFLoader();
function crearVisor(idContenedor, tipo){
    let scene = new THREE.Scene();
    scene.background = new THREE.Color(0x0b1a2b);
    let camera = new THREE.PerspectiveCamera(75,1,0.1,1000);
    camera.position.set(0,1.5,8);
    let renderer = new THREE.WebGLRenderer({antialias:true});
    renderer.setSize(230,230);
    document.getElementById(idContenedor).appendChild(renderer.domElement);
    const luzDir2 = new THREE.DirectionalLight(0xE4D96F, 3);
    luzDir2.position.set(-5, -5, 5);
    scene.add(luzDir2);
    const lightAmb = new THREE.PointLight(0xE4D96F, 1);
    lightAmb.position.set(0, 0, 0);
    scene.add(lightAmb);
    scene.fog = new THREE.Fog(0x0b1a2b, 10, 80);

    function cargarModelo(ruta, x, y, z, sx, sy, sz, rotY = 0, callback = null) {
        loader.load(ruta, function(gltf) {
          const modelo = gltf.scene;
          modelo.position.set(x, y, z);
          modelo.scale.set(sx, sy, sz);
          modelo.rotation.y = rotY;
          scene.add(modelo);
          if(callback){
            callback(modelo);
          }
        });
    }
    function crearCasa(posX, posY, posZ) {
        const grupoCasa = new THREE.Group();
        function cilindro(radio, alto, x, y, z, color) {
          let geometry = new THREE.CylinderGeometry(radio, radio, alto, 32);
          let material = new THREE.MeshPhongMaterial({ color: color});
          let cilindro = new THREE.Mesh(geometry, material);
          cilindro.position.set(x, y, z);
          grupoCasa.add(cilindro);
          return cilindro;
        }
        let j = 2.5;
        for (let i = 0; i < 30; i++) {
          cilindro(0.05, 2.5, -1.5, 0, i * 0.1, 0xE4D96F);
          cilindro(0.05, 2.5,  1.5, 0, i * 0.1, 0xE4D96F);
          if (i <= 14) {
            cilindro(0.05, j, i * 0.1 - 1.5, j/2 - 1.25, 0,   0xE4D96F);
            cilindro(0.05, j, i * 0.1 - 1.5, j/2 - 1.25, 2.9, 0xE4D96F);
            j += 0.06;
          } else {
            cilindro(0.05, j, i * 0.1 - 1.5, j/2 - 1.25, 0,   0xE4D96F);
            cilindro(0.05, j, i * 0.1 - 1.5, j/2 - 1.25, 2.9, 0xE4D96F);
            j -= 0.06;
          }
        }
        for (let i = 0; i < 30; i++) {
          let tDer = cilindro(0.05, 2.5, -1, 1.6, i * 0.1, 0xC29A4A);
          tDer.rotation.z = -60 * (Math.PI / 180);
          let tIzq = cilindro(0.05, 2.5,  1, 1.6, i * 0.1, 0xC29A4A);
          tIzq.rotation.z =  60 * (Math.PI / 180);
        }
        let frontalDer = new THREE.Group();
        for (let i = 0; i < 16; i++) {
          let p = cilindro(0.05, 2.5, i * 0.09 + 0.5, -0.2, 2.93, 0xC29A4A);
          frontalDer.add(p);
        }
        frontalDer.rotation.z = 60 * (Math.PI / 180);
        grupoCasa.add(frontalDer);
    
        let frontalIzq = new THREE.Group();
        for (let i = 0; i < 16; i++) {
          let p = cilindro(0.05, 2.5, i * 0.09 - 1.9, -0.2, 2.92, 0xC29A4A);
          frontalIzq.add(p);
        }
        frontalIzq.rotation.z = -60 * (Math.PI / 180);
        grupoCasa.add(frontalIzq);
    
        let geoP = new THREE.PlaneGeometry(0.7, 1.4,2,2);
        let matP = new THREE.MeshPhongMaterial({ color: 0x000000, side: THREE.DoubleSide });
        let puerta = new THREE.Mesh(geoP, matP);
        puerta.position.set(0, -0.5, 3);
        grupoCasa.add(puerta);
    
        grupoCasa.position.set(posX, posY, posZ);
        scene.add(grupoCasa);
        return grupoCasa;
    }       
    
    if(tipo === "barco"){
        cargarModelo("barcoDoble.glb",2.5, -3, 0,0.8, 0.8, 0.8,1);
        cargarModelo("barco3.glb",-3.5, -2, 0,0.2, 0.3, 0.3,2.3);
        cargarModelo("planta.glb", 0, -2, 0, 0.2, 0.2, 0.2, 2);
        cargarModelo("planta.glb", 1, -2, -3, 0.2, 0.2, 0.2, 2);
        cargarModelo("planta.glb", 0.3, -2, -3, 0.2, 0.2, 0.2, 2);
        cargarModelo("planta.glb", 0, -2, -2, 0.2, 0.2, 0.2, 1);
        cargarModelo("planta.glb", -1.5, -2, -2.5, 0.2, 0.2, 0.2, 1);
        cargarModelo("planta.glb", -2, -2, -2, 0.2, 0.2, 0.2, 1);
        cargarModelo("planta.glb", -2.5, -2, -2, 0.2, 0.2, 0.2, 1);
        cargarModelo("planta.glb", -3, -2, -2, 0.2, 0.2, 0.2, 1);
        cargarModelo("planta.glb", -2, -2, -2.5, 0.2, 0.2, 0.2, 2);
        cargarModelo("planta.glb", -2.5 -2, -2.5, 0.2, 0.2, 0.2, 1);
    }
    if(tipo === "isla"){
        camera.position.set(0,1,6.5)
        let casa = crearCasa(-2.8,0.1,-4);
        let casa2 = crearCasa(4,0.1,-3);
        casa.rotation.y = 30*(Math.PI/180);
        casa2.rotation.y = 320*(Math.PI/180);
        cargarModelo("isla.glb", 0, -2.3, -3, 1.2, 0.5, 0.5, 3);
        cargarModelo("planta.glb", -3.5, -2, 0, 0.2, 0.2, 0.2, 1);
        cargarModelo("planta.glb", 4, -2, 0.5, 0.2, 0.2, 0.2, 1);
        cargarModelo("planta.glb", -6.5, -2, -8, 0.2, 0.2, 0.2, 1);
        cargarModelo("planta.glb", 7, -2, -4, 0.2, 0.2, 0.2, 1);
    }
    let tiempo = 0;
    let aguaGeo =new THREE.PlaneGeometry(200,200,100,100);
    let aguaMat =new THREE.MeshPhongMaterial({color:0x2E42FF,transparent:true,opacity:0.7});
    let agua =new THREE.Mesh(aguaGeo,aguaMat);
    agua.rotation.x = -Math.PI/2;
    agua.position.y = -2;
    scene.add(agua);
    function animate(){
        requestAnimationFrame(animate);
        tiempo += 0.02;
        const pos = agua.geometry.attributes.position;
        for(let i=0;i<pos.count;i++){
            let x = pos.getX(i);
            let y = pos.getY(i);
            let z = Math.sin(x*0.2+tiempo)*0.2 + Math.cos(y*0.2+tiempo)*0.2;
            pos.setZ(i,z);
        }
        pos.needsUpdate = true;
        agua.geometry.computeVertexNormals();
        renderer.render(scene, camera);
    }
    animate();
}
crearVisor("barcoModelo","barco");
crearVisor("islaModelo","isla");
