<template>
    <div>
        <div id="yard-container" class="yard-container">
        </div>
    </div>
</template>


<script>
//import * as THREE from "three";
import { mapState, mapActions } from "vuex";

const computedFromCamera = mapState("camera", {
  zoom: state => state.zoom,
  scale: state => state.scale,
  scene: state => state.scene
})
const computedFromYard = mapState("yard", {
  yards: state => state.yards,
  areas: state => state.areas
})

const cameraMethods = mapActions("camera", ["setContainer","initialize","render", "rotateScene", "moveCamera", "zoomCamera"])
const yardMethods = mapActions("yard", ["draw"])

export default {
  components: { },
  computed: Object.assign({}, computedFromCamera, computedFromYard),
  setup() {},    
  data() {
    return {
      mouseDown : false,
      mouseX : 0,
      mouseY : 0
    };
  },
  methods: Object.assign({
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
      canvas.addEventListener("mousewheel", function(event){
        self.zoomCamera(event.wheelDeltaY);
      }, false);
    },

    onMouseMove(evt) {
      if (!this.mouseDown) {
        return;
      }

      evt.preventDefault();

      let deltaX = evt.clientX - this.mouseX,
        deltaY = evt.clientY - this.mouseY;
      this.mouseX = evt.clientX;
      this.mouseY = evt.clientY;

      if (evt.shiftKey) {
        this.rotateScene({deltaX, deltaY});
      } else {
        this.moveCamera({deltaX, deltaY});
      }
    },

    onMouseDown(evt) {
      evt.preventDefault();

      this.mouseDown = true;
      this.mouseX = evt.clientX;
      this.mouseY = evt.clientY;
    },

    onMouseUp(evt) {
      evt.preventDefault();

      this.mouseDown = false;
    },
  }, cameraMethods, yardMethods),
  mounted() {
    let container = document.getElementById("yard-container");
    this.setContainer(container);
    this.initialize();
    this.draw();
    this.render();
    this.addMouseHandler(container);
  },
  watch: {
    // zoom (newValue) {
    //   camera.position.z = newValue;
    //   camera.updateProjectionMatrix();
    // }
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
