<template>
    <div>
        <div id="yard-container" class="yard-container">
            <v-btn color="blue darken-1" text  @click="show(true)">Menu</v-btn>
            <presentation-menu/>
        </div>
    </div>
</template>


<script>
import * as THREE from "three";
import { mapState, mapActions } from "vuex";
import PresentationMenu from "./PresentationMenu";

const computed = mapState("menu", {
  zoom: state => state.zoom.value
})

const methods = mapActions("menu", ["show"])

let SCALE = 400;
let camera, scene, renderer;
let geometry, material, mesh;

let mouseDown = false,
  mouseX = 0,
  mouseY = 0;

export default {
  components: { PresentationMenu },
  computed,
  setup() {},    
  data() {
    return {};
  },
  methods: Object.assign({
    render() {
      requestAnimationFrame(this.render);
      renderer.render(scene, camera);
    },

    addMouseHandler(canvas) {
      var self = this;
      canvas.addEventListener(
        "mousemove",
        function (e) {
          self.onMouseMove(e);
        },
        false
      );
      canvas.addEventListener(
        "mousedown",
        function (e) {
          self.onMouseDown(e);
        },
        false
      );
      canvas.addEventListener(
        "mouseup",
        function (e) {
          self.onMouseUp(e);
        },
        false
      );
      canvas.addEventListener("mousewheel", this.onMouseWheel, false);
    },

    onMouseMove(evt) {
      if (!mouseDown) {
        return;
      }

      evt.preventDefault();

      let deltaX = evt.clientX - mouseX,
        deltaY = evt.clientY - mouseY;
      mouseX = evt.clientX;
      mouseY = evt.clientY;

      if (evt.shiftKey) {
        this.rotateScene(deltaX, deltaY);
      } else {
        this.moveCamera(deltaX, deltaY);
      }
    },

    onMouseDown(evt) {
      evt.preventDefault();

      mouseDown = true;
      mouseX = evt.clientX;
      mouseY = evt.clientY;
    },

    onMouseUp(evt) {
      evt.preventDefault();

      mouseDown = false;
    },

    onMouseWheel(event) {
      if (event.wheelDeltaY > 0) camera.zoom *= event.wheelDeltaY * 0.01005;
      else camera.zoom *= event.wheelDeltaY * -0.005;
      camera.updateProjectionMatrix();
    },

    rotateScene(deltaX, deltaY) {
      scene.rotation.x += deltaY / 500;
      scene.rotation.z += deltaX / 500;
    },

    moveCamera(deltaX, deltaY) {
      camera.position.x -= deltaX / 1;
      camera.position.y += deltaY / 1;
    },

    initialize() {
      let container = document.getElementById("yard-container");

      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(
        50,
        container.offsetWidth / container.offsetHeight,
        0.1,
        2000
      );
      camera.position.z = this.zoom;
      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor("#fffafa");
      renderer.setSize(container.offsetWidth - 2, container.offsetHeight - 2);

      container.appendChild(renderer.domElement);

      window.addEventListener("resize", () => {
        renderer.setSize(container.offsetWidth - 2, container.offsetHeight - 2);
        camera.aspect = container.offsetWidth / container.offsetHeight;
        camera.updateProjectionMatrix();
      });

      var maxX = this.$store.state.areas.reduce((a, b) => {
        return a.PosXMax > b.PosXMax ? a : b;
      }).PosXMax;
      var maxY = this.$store.state.areas.reduce((a, b) => {
        return a.PosYMax > b.PosYMax ? a : b;
      }).PosYMax;

      var offsetX = maxX / SCALE / 2;
      var offsetY = maxY / SCALE / 2;

      this.$store.state.areas.forEach((area) => {
        var width = (area.PosXMax - area.PosXMin) / SCALE;
        var height = (area.PosYMax - area.PosYmin) / SCALE;

        geometry = new THREE.BoxGeometry(width, height, 0.001);
        material = new THREE.MeshBasicMaterial({
          color: area.ColorBackground,
          side: THREE.DoubleSide,
        });
        mesh = new THREE.Mesh(geometry, material);

        mesh.position.y = area.PosYmin / SCALE + height / 2 - offsetY;
        mesh.position.x = area.PosXMin / SCALE + width / 2 - offsetX;
        mesh.position.z = area.PosZmin / SCALE;

        scene.add(mesh);
      });
    },
  }, methods),
  mounted() {
    let container = document.getElementById("yard-container");
    this.initialize();
    this.render();
    this.addMouseHandler(container);
  },
  watch: {
    zoom (newValue) {
      camera.position.z = newValue;
      camera.updateProjectionMatrix();
    }
  }
};
</script>

<style>
body {
  margin: 0;
  height: calc(100vh - 200px);
}

canvas {
  display: block;
}

.yard-container {
  background-color: snow;
  border: 1px;
  border-color: thistle;
  border-style: solid;
  height: calc(95vh - 200px);
  margin: auto;
  margin-top: 10px;
  width: 95vw;
}
</style>
