import * as THREE from "three";

const state = () => ({
    clearColor:"#fffafa",
    scale: 400,
    camera:{},
    scene: {},
    renderer: {},
    container: {},
    mouseX: 0,
    mouseY: 0,
    zoom: 1000
})

const mutations = {
    setContainer(state, payload){
        state.container = payload;
    },
    setScene(state, payload){
        state.scene = payload;
    },
    setCamera(state, payload){
        state.camera = payload;
    },
    setRenderer(state, payload){
        state.renderer = payload;
    },
    setZoom(state, payload){
        state.zoom = payload;
    }
}

function createCamera(context){
    return new THREE.PerspectiveCamera(
        50,
        context.state.container.offsetWidth / context.state.container.offsetHeight,
        0.1,
        4000
    );
}

function render(context) {
  requestAnimationFrame(() => render(context));
  context.state.renderer.render(context.state.scene, context.state.camera);
}

const actions = {
    setContainer(context, payload){
        context.commit('setContainer', payload);
    },
    initialize(context){
        if(!context.state.container.id)
            return;
        let scene = new THREE.Scene();

        let camera = createCamera(context);
        camera.position.z = context.state.zoom;

        let renderer = new THREE.WebGLRenderer({ antialias: true });
        renderer.setClearColor(context.state.clearColor);
        renderer.setSize(context.state.container.offsetWidth - 2, context.state.container.offsetHeight - 50);
  
        context.state.container.appendChild(renderer.domElement);

        
        context.commit('setScene', scene);
        context.commit('setCamera', camera);
        context.commit('setRenderer', renderer);
    },
    render(context){
        render(context);
    },

    zoomCamera(context, payload) {
        context.state.camera.position.z -= payload * context.state.scale / context.state.zoom;
    },

    rotateScene(context, {deltaX, deltaY}) {
        context.state.scene.rotation.x += deltaY / 500;
        context.state.scene.rotation.z += deltaX / 500;
    },

    moveCamera(context, {deltaX, deltaY}) {
        context.state.camera.position.x -= deltaX / 1;
        context.state.camera.position.y += deltaY / 1;
    },

    moveCameraTo(context, {x, y, z}) {
        context.state.camera.position.x = x;
        context.state.camera.position.y = y;
        context.state.camera.position.z = z;
    },
}

const getters = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}