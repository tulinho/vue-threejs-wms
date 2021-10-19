<template>
  <div class="yard-main">
    <div id="yard-container" class="yard-container">
      <presentation-menu />
      <v-btn
        v-if="!showMenu"
        absolute
        top
        right
        color="primary white--text"
        @click="show(true)"
        >Presentation Menu</v-btn
      >
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import PresentationMenu from "./PresentationMenu";

const computedFromMenu = mapState("menu", {
  showMenu: (state) => state.showMenu,
});

const computedFromCamera = mapState("camera", {
  pointer: (state) => state.pointer,
  container: (state) => state.container,
  renderer: (state) => state.renderer,
});

const cameraMethods = mapActions("camera", [
  "setContainer",
  "initialize",
  "render",
  "rotateScene",
  "moveCamera",
  "zoomCamera",
  "clickElement"
]);
const yardMethods = mapActions("yard", [
  "initializeYard",
  "selectZoneFromPosition",
]);
const menuMethods = mapActions("menu", ["show"]);

export default {
  components: { PresentationMenu },
  computed: Object.assign({}, computedFromMenu, computedFromCamera),
  setup() {},
  data() {
    return {
      mouseDown: false,
      mouseX: 0,
      mouseY: 0,
    };
  },
  methods: Object.assign(
    {
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
        canvas.addEventListener(
          "mousewheel",
          function (event) {
            self.zoomCamera(event.wheelDeltaY);
          },
          false
        );
        canvas.addEventListener(
          "dblclick",
          function (e) {
            self.onDoubleClick(e);
          },
          false
        );
      },

      onMouseMove(evt) {
        let canvasBounds = this.renderer.context.canvas.getBoundingClientRect();
        this.pointer.x =
          ((evt.clientX - canvasBounds.left) /
            (canvasBounds.right - canvasBounds.left)) *
            2 -
          1;
        this.pointer.y =
          -(
            (evt.clientY - canvasBounds.top) /
            (canvasBounds.bottom - canvasBounds.top)
          ) *
            2 +
          1;        

        if (!this.mouseDown) {
          return;
        }

        evt.preventDefault();

        let deltaX = evt.clientX - this.mouseX,
          deltaY = evt.clientY - this.mouseY;
        this.mouseX = evt.clientX;
        this.mouseY = evt.clientY;

        if (evt.shiftKey) {
          this.rotateScene({ deltaX, deltaY });
        } else {
          this.moveCamera({ deltaX, deltaY });
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

      onDoubleClick(evt) {
        evt.preventDefault();
        this.clickElement(this.selectZoneFromPosition);
      },
    },
    cameraMethods,
    menuMethods,
    yardMethods
  ),
  mounted() {
    let container = document.getElementById("yard-container");
    this.setContainer(container);
    this.initialize();
    this.initializeYard();
    this.render();
    this.addMouseHandler(container);
  },
  watch: {},
};
</script>

<style>
canvas {
  display: block;
  cursor: grab;
}

canvas:active{
  cursor: grabbing;
}

.yard-container {
  background-color: snow;
  border: 1px;
  border-color: thistle;
  border-style: solid;
  height: calc(100vh - 200px);
  margin: auto;
  margin-top: 10px;
  position: relative;
  width: 100%;
}
</style>
