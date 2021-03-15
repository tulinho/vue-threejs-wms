<template>
  <div id="container" class="container"></div>
</template>


<script>
import * as THREE from 'three'

let SCALE = 400;
let camera, scene, renderer;
let geometry, material, mesh;


function initialize(self){
      let container = document.getElementById('container');
  
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(50, container.offsetWidth/container.offsetHeight, 0.1, 2000);
      camera.position.z = 1000;
      renderer = new THREE.WebGLRenderer({antialias: true});
      renderer.setClearColor("#fffafa");
      renderer.setSize(container.offsetWidth - 2, container.offsetHeight - 2);

      container.appendChild(renderer.domElement);

      window.addEventListener('resize', () => {
          renderer.setSize(container.offsetWidth - 2, container.offsetHeight - 2);
          camera.aspect = container.offsetWidth/container.offsetHeight;
          camera.updateProjectionMatrix();
      });

      var maxX = self.$store.state.areas.reduce((a,b) => { return a.PosXMax > b.PosXMax ? a : b }).PosXMax;
      var maxY = self.$store.state.areas.reduce((a,b) => { return a.PosYMax > b.PosYMax ? a : b }).PosYMax;
      console.log(`Max X: ${maxX}: Max Y:${maxY}`);

      var offsetX = (maxX/SCALE)/2;
      var offsetY = (maxY/SCALE)/2;
      console.log(`offset X: ${offsetX}: offset Y:${offsetY}`);

      self.$store.state.areas.forEach(area => {
          var width = (area.PosXMax-area.PosXMin)/SCALE;
          var height = (area.PosYMax-area.PosYmin)/SCALE;

          geometry = new THREE.BoxGeometry(width, height, 0.001);    
          material = new THREE.MeshBasicMaterial( {color: area.ColorBackground, side: THREE.DoubleSide} );
          mesh = new THREE.Mesh(geometry, material);

          mesh.position.y = area.PosYmin/SCALE + height/2 - offsetY;
          mesh.position.x = area.PosXMin/SCALE + width/2 - offsetX;
          mesh.position.z = area.PosZmin/SCALE;

          console.log(`${area.Zone}: x:${mesh.position.x}, y:${mesh.position.y} - ${mesh.position.y + height}`)
          scene.add(mesh);
      });
      
      var render = function() {
          requestAnimationFrame(render);

          renderer.render(scene, camera);
      }
      render();
      addMouseHandler(container);
}


let mouseDown = false,
        mouseX = 0,
        mouseY = 0;

    function onMouseMove(evt) {
        if (!mouseDown) {
            return;
        }

        evt.preventDefault();

        var deltaX = evt.clientX - mouseX,
            deltaY = evt.clientY - mouseY;
        mouseX = evt.clientX;
        mouseY = evt.clientY;

        if(evt.shiftKey){
            rotateScene(deltaX, deltaY);
        }
        else{
            moveCamera(deltaX, deltaY);
        }
    }

    function onMouseDown(evt) {
        evt.preventDefault();

        mouseDown = true;
        mouseX = evt.clientX;
        mouseY = evt.clientY;
    }

    function onMouseUp(evt) {
        evt.preventDefault();

        mouseDown = false;
    }

    function addMouseHandler(canvas) {
        canvas.addEventListener('mousemove', function (e) {
            onMouseMove(e);
        }, false);
        canvas.addEventListener('mousedown', function (e) {
            onMouseDown(e);
        }, false);
        canvas.addEventListener('mouseup', function (e) {
            onMouseUp(e);
        }, false);
        canvas.addEventListener( 'mousewheel', onDocumentMouseWheel, false );
    }

function onDocumentMouseWheel( event ) {
    if(event.wheelDeltaY > 0)
        camera.zoom *= event.wheelDeltaY * 0.01005;
    else    
        camera.zoom *= event.wheelDeltaY * -0.005;
    camera.updateProjectionMatrix();
}

function rotateScene(deltaX, deltaY) {
    scene.rotation.x += deltaY / 500;
    scene.rotation.z += deltaX / 500;
}

function moveCamera(deltaX, deltaY) {
    camera.position.x -= deltaX / 1;
    camera.position.y += deltaY / 1;
}


export default ({
  setup() {
  },
  methods: {
  },
  mounted(){
    var self = this;
    initialize(self);
  }
})
</script>

<style>
  body { 
      margin: 0; 
      height: calc(100vh - 200px);
  }
    
  canvas { 
      display: block;
  }

  .container{
      background-color:snow;
      border: 1px;
      border-color: thistle;
      border-style: solid;
      height: calc(95vh - 200px);
      margin: auto;
      margin-top: 10px;
      width: 95vw;
  }
</style>
