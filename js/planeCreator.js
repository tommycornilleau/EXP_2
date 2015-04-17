function createPlane3D(depth, width,margin, height){
	// first create all the individual vertices
	var geometry = new THREE.Geometry();
	for (var z = 0 ; z < depth ; z++) {
	    for (var x = 0 ; x < width ; x++) {
	        var vertex = new THREE.Vector3(x*margin, Math.random()*height,z*margin);
	        geometry.vertices.push(vertex);
	    }
	}

	console.log("depth : "+depth*margin)
	console.log("width : "+width*margin)

	for (var z = 0 ; z < depth-1 ; z++) {
	    for (var x = 0 ; x < width-1 ; x++) {
	    	//a,b,c and d are the index of the interesting vertices
	        var a = x + z*width;
	        var b = (x+1) + (z * width);
	        var c = x + ((z+1) * width);
	        var d = (x+1) + ((z+1) * width);

	        var face1 = new THREE.Face3(b, a, c);
	        var face2 = new THREE.Face3(c ,d, b);

	        // face1.color = new THREE.Color(scale(getHighPoint(geometry, face1)).hex());
	        // face2.color = new THREE.Color(scale(getHighPoint(geometry, face2)).hex())
	        geometry.faces.push(face1);
	        geometry.faces.push(face2);
	    }
	}

    // compute the normals
    // geometry.computeVertexNormals(true);
    // geometry.computeFaceNormals();

    // setup the material
    var mat = new THREE.MeshLambertMaterial({
        wireframe: true,
        color: 'white'
    });
    mat.vertexColors = THREE.FaceColors;
    mat.shading = THREE.NoShading;

    // create the mesh
    var groundMesh = new THREE.Mesh(geometry,mat);
    groundMesh.name = 'field';

    // var edges = THREE.WireframeHelper(groundMesh,0xffffff)

    scene.add(groundMesh);
    // scene.add(edges);
}