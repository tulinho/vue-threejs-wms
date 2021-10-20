import * as THREE from "three";

const state = () => ({
	visibleZoneTypes: []
});

const mutations = {
	setVisibleZoneTypes(state, payload) {
		state.visibleZoneTypes = payload;
	}
};

const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex);

const getChunksFromString = (st, chunkSize) =>
	st.match(new RegExp(`.{${chunkSize}}`, "g"));

const convertHexUnitTo256 = (hexStr) =>
	parseInt(hexStr.repeat(2 / hexStr.length), 16);

const getAlphafloat = (a, alpha) => {
	if (typeof a !== "undefined") {
		return a / 255;
	}
	if (typeof alpha != "number" || alpha < 0 || alpha > 1) {
		return 1;
	}
	return alpha;
};

const hexToRGBA = (hex, alpha) => {
	if (!isValidHex(hex)) {
		throw new Error("Invalid HEX");
	}
	const chunkSize = Math.floor((hex.length - 1) / 3);
	const hexArr = getChunksFromString(hex.slice(1), chunkSize);
	const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
	return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`;
};

const hexToRGBAObject = (hex) => {
	if (!isValidHex(hex)) {
		throw new Error("Invalid HEX");
	}
	const chunkSize = Math.floor((hex.length - 1) / 3);
	const hexArr = getChunksFromString(hex.slice(1), chunkSize);
	const [r, g, b, a] = hexArr.map(convertHexUnitTo256);
	return { r: r, g: g, b: b, a: a };
};

function getDefaultOptions(context) {
	let yard = context.rootState.yard.yards[0] || {};
	let maxX = yard.PosXMax;
	let maxY = yard.PosYMax;
	let scale = context.rootState.camera.scale;
	let options = {
		fontface: "Verdana",
		labelPercentage: 0.5,
		scale: scale,
		offsetX: maxX / (scale * 2),
		offsetY: maxY / (scale * 2),
		opacity: 1,
		transparent: false
	};
	return options;
}

//TODO: Fix for many yards
function createPlaceholderForYardElement(elem, options) {
	let defaults = {
		scale: 500,
		offsetX: 0,
		offsetY: 0,
		transparent: true,
		opacity: 1
	};
	options = Object.assign({}, defaults, options);

	let width = (elem.PosXMax - elem.PosXMin) / options.scale;
	let height = (elem.PosYMax - elem.PosYMin) / options.scale;

	let geometry = new THREE.BoxGeometry(width, height, 0.001);
	let material = new THREE.MeshBasicMaterial({
		transparent: options.transparent,
		opacity: options.opacity,
		depthTest: false,
		depthWrite: false,
		color: hexToRGBA(elem.ColorBackground),
		side: THREE.DoubleSide
	});
	let mesh = new THREE.Mesh(geometry, material);
	mesh.name = `${elem.ZoneType}_${elem.Zone}`;
	mesh.IdZone = elem.IdZone;

	mesh.position.y =
		elem.PosYMin / options.scale + height / 2 - options.offsetY;
	mesh.position.x =
		elem.PosXMin / options.scale + width / 2 - options.offsetX;
	mesh.position.z = elem.PosZMin / options.scale;

	var edges = new THREE.EdgesGeometry(mesh.geometry);
	var edgesMaterial = new THREE.LineBasicMaterial({
		color: hexToRGBA(elem.ColorFrame),
		linewidth: 1
	});
	var wireframe = new THREE.LineSegments(edges, edgesMaterial);
	wireframe.renderOrder = 4;
	mesh.add(wireframe);

	return mesh;
}

function createPlaceholderForElement(elem, options) {
	let defaults = {
		offsetX: 0,
		offsetY: 0
	};
	options = Object.assign({}, defaults, options);

	let width = (elem.PosXMax - elem.PosXMin) / options.scale;
	let height = (elem.PosYMax - elem.PosYMin) / options.scale;
	options.width = width;
	options.height = height;

	const texture = getLabelCanvasTexture({ elem, options });

	let geometry = new THREE.PlaneGeometry(width, height);
	let material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: options.transparent,
		opacity: options.opacity,
		depthTest: false,
		depthWrite: false,
		side: THREE.FrontSide
	});
	let mesh = new THREE.Mesh(geometry, material);
	mesh.name = `${elem.ZoneType}_${elem.Zone}`;
	mesh.IdZone = elem.IdZone;

	mesh.position.y =
		elem.PosYMin / options.scale + height / 2 - options.offsetY;
	mesh.position.x =
		elem.PosXMin / options.scale + width / 2 - options.offsetX;
	mesh.position.z = elem.PosZMin / options.scale;

	let rgba = hexToRGBAObject(elem.ColorFrame);
	var edges = new THREE.EdgesGeometry(mesh.geometry);
	var edgesMaterial = new THREE.LineBasicMaterial({
		color: `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`,
		opacity: rgba.a,
		linewidth: 5
	});
	var wireframe = new THREE.LineSegments(edges, edgesMaterial);
	wireframe.renderOrder = 4;
	mesh.add(wireframe);

	return mesh;
}

function getLabelCanvasTexture({ elem, options }) {
	var canvas = document.createElement("canvas");
	var canvasContext = canvas.getContext("2d");

	canvasContext.fillStyle = options.backgroundColor;
	canvasContext.fillRect(0, 0, canvas.width, canvas.height);

	canvasContext.fillStyle = elem.ColorForeground;
	canvasContext.font = options.fontsize + "pt " + options.fontface;

	let text = elem.Zone;
	let textWidth = canvasContext.measureText(text).width;
	let maxWidth = canvas.width * options.labelPercentage;
	textWidth = Math.min(textWidth, maxWidth);
	canvasContext.fillText(
		text,
		(canvas.width - textWidth) / 2,
		(canvas.height + options.fontsize) / 2,
		canvas.width * options.labelPercentage
	);
	var texture = new THREE.CanvasTexture(canvas);
	if ((options.width * 3) / 2 < options.height) {
		texture.center = new THREE.Vector2(0.5, 0.5);
		texture.rotation = Math.PI / 2;
	}
	return texture;
}

function createPlaceholderForBorderElement(elem, options) {
	let width = (elem.PosXMax - elem.PosXMin) / options.scale;
	let length = (elem.PosYMax - elem.PosYMin) / options.scale;
	let height = (elem.PosZMax - elem.PosZMin) / options.scale;
	let baseDimmention = width == 0 ? length : width;

	var canvas = document.createElement("canvas");
	canvas.height = canvas.height / 2;
	var context = canvas.getContext("2d");

	context.fillStyle = elem.ColorBackground;
	context.fillRect(0, 0, canvas.width, canvas.height);

	context.fillStyle = elem.ColorForeground;
	context.font = options.fontsize + "px " + options.fontface;

	let text = elem.Zone;
	let textWidth = context.measureText(text).width;
	context.fillText(
		text,
		(canvas.width - textWidth) / 2,
		(canvas.height + options.fontsize) / 2
	);
	var texture = new THREE.CanvasTexture(canvas);
	if (baseDimmention * 2 < height) {
		texture.center = new THREE.Vector2(0.5, 0.5);
		texture.rotation = Math.PI / 2;
	}

	let geometry = new THREE.PlaneGeometry(baseDimmention, height);
	geometry.rotateX(Math.PI / 2);
	let offsetX, offsetY, offsetZ;
	if (width == 0) {
		geometry.rotateZ(Math.PI / 2);
		offsetY = options.offsetY - baseDimmention / 2;
		offsetX = options.offsetX;
		offsetZ = height / 2;
	} else {
		offsetY = options.offsetY;
		offsetX = options.offsetX - baseDimmention / 2;
		offsetZ = height / 2;
	}

	let material = new THREE.MeshBasicMaterial({
		map: texture,
		transparent: options.transparent,
		opacity: options.opacity,
		depthTest: false,
		depthWrite: false,
		side: THREE.DoubleSide
	});
	let mesh = new THREE.Mesh(geometry, material);
	mesh.name = `${elem.ZoneType}_${elem.Zone}`;
	mesh.IdZone = elem.IdZone;

	mesh.position.y = elem.PosYMin / options.scale - offsetY;
	mesh.position.x = elem.PosXMin / options.scale - offsetX;
	mesh.position.z = elem.PosZMin / options.scale + offsetZ;

	let rgba = hexToRGBAObject(elem.ColorFrame);
	var edges = new THREE.EdgesGeometry(mesh.geometry);
	var edgesMaterial = new THREE.LineBasicMaterial({
		color: `rgb(${rgba.r}, ${rgba.g}, ${rgba.b})`,
		opacity: rgba.a,
		linewidth: 5
	});
	var wireframe = new THREE.LineSegments(edges, edgesMaterial);
	wireframe.renderOrder = 4;
	mesh.add(wireframe);

	return mesh;
}

function shouldDrawElementByZoneType(visibleZoneTypes, zoneType) {
	return (
		!visibleZoneTypes ||
		!visibleZoneTypes.length ||
		visibleZoneTypes.find((m) => m.id === zoneType)
	);
}

const actions = {
	draw(context) {
		let options = getDefaultOptions(context);
		context.dispatch("drawYard");
		//areas;
		context.dispatch("drawAreas", options);
		//sections
		options.opacity = 0;
		options.transparent = true;
		context.dispatch("drawSections", options);
		//zones
		let allZones = context.rootState.yard.zones;
		context.dispatch("drawZones", allZones);
		context.dispatch("drawBorders", options);
	},
	drawYard({ rootState, state }) {
		if (!shouldDrawElementByZoneType(state.visibleZoneTypes, "Y")) return;
		let options = getDefaultOptions({ rootState });
		rootState.yard.yards.forEach((yard) => {
			let yardPlaceholder = createPlaceholderForYardElement(
				yard,
				options
			);
			yardPlaceholder.renderOrder = 1;
			rootState.camera.scene.add(yardPlaceholder);
		});
	},
	drawAreas(context, options) {
		if (!shouldDrawElementByZoneType(context.state.visibleZoneTypes, "A"))
			return;

		options.fontsize = 20;
		context.rootState.yard.areas.forEach((area) => {
			options.backgroundColor = area.ColorBackground;
			let placeHolder = createPlaceholderForElement(area, options);
			placeHolder.renderOrder = 2;
			context.rootState.camera.scene.add(placeHolder);
		});
	},
	drawSections(context, options) {
		if (!shouldDrawElementByZoneType(context.state.visibleZoneTypes, "S"))
			return;

		options.fontsize = 30;
		options.opacity = 0.95;
		options.labelPercentage = 0.9;
		options.transparent = true;
		context.rootState.yard.sections.forEach((section) => {
			let areaBackgroung = context.rootState.yard.areas.find((m) =>
				section.Area.includes(m.Zone)
			).ColorBackground;
			options.backgroundColor = areaBackgroung;
			let placeHolder = createPlaceholderForElement(section, options);
			placeHolder.renderOrder = 3;
			context.rootState.camera.scene.add(placeHolder);
		});
	},
	drawZones(context, zones) {
		let visibleZoneTypes = context.state.visibleZoneTypes;
		zones = zones.filter((m) =>
			shouldDrawElementByZoneType(visibleZoneTypes, m.ZoneType)
		);

		let allZones = zones.sort((m, n) =>
			parseInt(m.IdZone) < parseInt(n.IdZone) ? -1 : 1
		);
		allZones = allZones.filter((m) => m.ZoneType != "B");

		let options = getDefaultOptions(context);
		options.opacity = 1;
		options.transparent = true;
		options.fontsize = 40;
		let renderOrder = 4;
		allZones.forEach((zone) => {
			options.backgroundColor = zone.ColorBackground;
			let placeHolder = createPlaceholderForElement(zone, options);
			placeHolder.renderOrder = renderOrder++;
			context.rootState.camera.scene.add(placeHolder);
		});
	},
	drawBorders(context, options) {
		let shouldDrawBorders =
			!context.state.visibleZoneTypes.length ||
			context.state.visibleZoneTypes.find((m) => m.id === "B");
		if (!shouldDrawBorders) return;
		options = options || getDefaultOptions(context);
		options.opacity = 1;
		options.transparent = true;
		options.fontsize = 40;
		options.fontface = "Verdana";
		let borders = context.rootState.yard.borders;
		borders.forEach((border) => {
			let placeHolder = createPlaceholderForBorderElement(
				border,
				options
			);
			placeHolder.renderOrder = 4;
			context.rootState.camera.scene.add(placeHolder);
		});
	},
	clearScene(context) {
		let scene = context.rootState.camera.scene;
		for (var i = scene.children.length - 1; i >= 0; i--) {
			let obj = scene.children[i];
			scene.remove(obj);
		}
	},
	refresh(context) {
		context.dispatch("clearScene");
		context.dispatch("draw");
	},
	filterZonesByLevel(context, level) {
		let scene = context.rootState.camera.scene;
		for (var i = scene.children.length - 1; i >= 0; i--) {
			let obj = scene.children[i];
			if (
				(!obj.name.match(/Z_*/) && !obj.name.match(/B_*/)) ||
				obj.IdZone % 10 == level
			)
				continue;
			scene.remove(obj);
		}
		let allZones = context.rootState.yard.zones.sort((m, n) =>
			m.IdZone < n.IdZone ? -1 : 1
		);
		let zones = allZones.filter((obj) => obj.IdZone % 10 == level);
		context.dispatch("drawZones", zones);
	},
	setVisibleZoneTypes(context, zoneTypes) {
		context.commit("setVisibleZoneTypes", zoneTypes || []);
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
