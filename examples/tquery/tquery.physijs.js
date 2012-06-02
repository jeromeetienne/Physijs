
// tQuery API
//
// world.enablePhysics();
// world.physics()		// here access physijs.xScene
// world.hasPhysics()
// world.disablePhysics();
//
// object.enablePhysics()
// object.physics()		// here access physijs.xMesh and physijs.xMaterial
// object.hasPhysics()
// object.disablePhysics()

//////////////////////////////////////////////////////////////////////////////////
//		tQuery.World							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.World.register('enablePhysics', function(){
	var world	= this;
	var tScene	= world.tScene();
	console.assert(tScene._xScene === undefined)
	tScene._xScene	= new Physijs.xScene();
	
	world.loop().hook(function(){
		tScene._xScene.simulate(2*1/60, 2);
	});
})

//////////////////////////////////////////////////////////////////////////////////
//		tQuery.Mesh							//
//////////////////////////////////////////////////////////////////////////////////

tQuery.Mesh.register('enablePhysics', function(mass){
	var mesh	= this;
	var tMesh	= mesh.get(0);
	console.assert(tMesh._xMesh === undefined)
	console.assert(tMesh._physijs === undefined)
	// this mass is overwritten by box init geometry
	tMesh._xMesh	= new Physijs.xMesh(tMesh.geometry, 0)
	tMesh._physijs	= tMesh._xMesh._physijs;

	tMesh._xMesh._boxGeometryInit(tMesh.geometry, mass)
	//tMesh._xMesh.mass	= 0;


	// TODO to remove hardcoded
	// - possible solution: here if attached, get the scene to this world
	// - if not yet attached, hook the scene.add function to add the physics world too
	var tScene	= tQuery.world.tScene();

	tScene._xScene.add( tMesh, function(){
		console.log("this tMesh has been added")
	});
	
	return this;	// for chained API
})

tQuery.Mesh.register('hasPhysics', function(){
	return this.get(0)._xMesh ? true : false;
});

tQuery.Mesh.register('physics', function(){
	return this.get(0)._xMesh;
});

