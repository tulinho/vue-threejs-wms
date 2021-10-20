import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

let INTERSECTED;

const state = () => ({
	camera: {},
	clearColor: "#fffafa",
	container: {},
	controls: {},
	far: 5000,
	height: 0,
	mouseX: 0,
	mouseY: 0,
	near: 0.001,
	pointer: {},
	raycaster: {},
	renderer: {},
	scale: 250,
	scene: {},
	width: 0,
	zoom: 1000
});

const mutations = {
	setContainer(state, payload) {
		state.container = payload;
		state.width = state.container.offsetWidth;
		state.height = state.container.offsetHeight;
	},
	setScene(state, payload) {
		state.scene = payload;
	},
	setCamera(state, payload) {
		state.camera = payload;
	},
	setRaycaster(state, payload) {
		state.raycaster = payload;
	},
	setRenderer(state, payload) {
		state.renderer = payload;
	},
	setControls(state, payload) {
		state.controls = payload;
	},
	setZoom(state, payload) {
		state.zoom = payload;
	}
};

function createAxesHelper() {
	const axesHelper = new THREE.AxesHelper(5);
	return axesHelper;
}

function addSceneLights(scene) {
	const dirLight1 = new THREE.DirectionalLight(0xffffff);
	dirLight1.position.set(100, 100, 100);
	scene.add(dirLight1);

	const dirLight2 = new THREE.DirectionalLight(0x002288);
	dirLight2.position.set(-100, -100, -100);
	scene.add(dirLight2);

	const ambientLight = new THREE.AmbientLight(0x222222);
	scene.add(ambientLight);
}

function createCamera(state) {
	let camera = new THREE.PerspectiveCamera(
		50,
		state.width / state.height,
		state.near,
		state.far
	);
	camera.position.y = state.zoom;
	camera.lookAt(new THREE.Vector3(0, 0, 0));
	return camera;
}

function createControls({ camera, container, near, far }) {
	const controls = new OrbitControls(camera, container);
	controls.enableDamping = true;
	controls.minDistance = near;
	controls.maxDistance = far;
	controls.maxPolarAngle = Math.PI / 2;
	return controls;
}

function createRenderer(state) {
	const renderer = new THREE.WebGLRenderer({ antialias: true });
	renderer.setClearColor(state.clearColor);
	renderer.setSize(
		state.container.offsetWidth - 2,
		state.container.offsetHeight - 10
	);
	state.container.appendChild(renderer.domElement);
	return renderer;
}

function toggleFullScreen(canvas) {
	if (!document.fullscreenElement) canvas.requestFullscreen();
	else document.exitFullscreen();
}

function render(context) {
	let raycaster = context.state.raycaster;
	let mouse = context.state.pointer;
	let camera = context.state.camera;
	let controls = context.state.controls;
	let scene = context.state.scene;

	raycaster.setFromCamera(mouse, camera);
	var intersects = raycaster.intersectObjects(scene.children);

	if (intersects.length > 0) {
		let intersected = intersects.reduce((m, n) => {
			if (m.object.name.startsWith("Z_")) return m;
			return m.object.IdZone > n.object.IdZone ? m : n;
		}).object;

		if (INTERSECTED != intersected) {
			if (INTERSECTED)
				INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

			INTERSECTED = intersected;
			INTERSECTED.currentHex = INTERSECTED.material.color.getHex();
			INTERSECTED.material.color.setHex(0xd2d2d7);
		}
	} else {
		if (INTERSECTED)
			INTERSECTED.material.color.setHex(INTERSECTED.currentHex);

		INTERSECTED = null;
	}

	controls.update();
	requestAnimationFrame(() => render(context));
	context.state.renderer.render(context.state.scene, context.state.camera);
}

const actions = {
	setContainer(context, payload) {
		context.commit("setContainer", payload);
	},
	initialize(context) {
		if (!context.state.container.id) return;
		const scene = new THREE.Scene();
		context.commit("setScene", scene);

		scene.add(createAxesHelper());
		addSceneLights(scene);

		const camera = createCamera(context.state);
		context.commit("setCamera", camera);

		const raycaster = new THREE.Raycaster();
		context.commit("setRaycaster", raycaster);

		const controls = createControls(context.state);
		context.commit("setControls", controls);

		const renderer = createRenderer(context.state);
		context.commit("setRenderer", renderer);

		scene.rotateOnAxis(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
	},
	render(context) {
		render(context);
	},

	zoomCamera(context, payload) {
		context.state.camera.position.z -=
			payload * (context.state.camera.position.z / context.state.zoom);
	},

	moveCameraTo(context, { x, y, z }) {
		context.state.camera.position.x = x;
		context.state.camera.position.y = y;
		context.state.camera.position.z = z;
	},

	clickElement({ state }, payload) {
		if (!INTERSECTED) {
			toggleFullScreen(state.container);
			return;
		}

		payload(INTERSECTED);
	},

	onResize({ state }, deviceRatio) {
		state.width = state.container.offsetWidth;
		state.height = state.container.offsetHeight;

		state.camera.aspect = state.width / state.height;
		state.camera.updateProjectionMatrix();

		state.renderer.setPixelRatio(Math.min(deviceRatio, 2));
		state.renderer.setSize(state.width - 2, state.height - 10);
	}
};

const getters = {};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations
};
