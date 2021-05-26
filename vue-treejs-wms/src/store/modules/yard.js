const defaults = require("../.././config/default-yard-config").default;

const state = () => ({
	zoneTypes: [
		{ id: "Y", name: "Yard" },
		{ id: "A", name: "Area" },
		{ id: "S", name: "Section" },
		{ id: "Z", name: "Zone" },
		{ id: "D", name: "Device" },
		{ id: "V", name: "Virtual" },
		{ id: "B", name: "Borders" },
	],
	rotateAngleTypes: [
		{ id: 0, name: "0 degrees" },
		{ id: 1, name: "90 degrees" },
		{ id: 2, name: "180 degrees" },
		{ id: 3, name: "270 degrees" },
	],
	tiltAngleTypes: [
		{ id: 0, name: "0 degrees" },
		{ id: 1, name: "90 degrees" },
	],
	xAlignmentTypes: [
		{ id: 0, name: "downstream" },
		{ id: 1, name: "upstream" },
		{ id: 2, name: "center" },
	],
	yAlignmentTypes: [
		{ id: 0, name: "downstream" },
		{ id: 1, name: "upstream" },
		{ id: 2, name: "center" },
	],
	showYardEdition: false,
	editingYard: {},
	selectedYard: {},
	showAreaEdition: false,
	editingArea: {},
	selectedArea: {},
	showSectionEdition: false,
	editingSection: {},
	selectedSection: {},
	showZoneBatchEdition: false,
	showZoneEdition: false,
	editingZoneModel: {},
	editingZone: {},
	selectedZone: {},
	yards: [],
	areas: [],
	sections: [],
	zones: [],
	borders: [],
});

const mutations = {
	setYards(state, payload) {
		state.yards = payload;
	},
	setAreas(state, payload) {
		state.areas = payload;
	},
	setSections(state, payload) {
		state.sections = payload;
	},
	setZones(state, payload) {
		state.zones = payload;
	},
	setBorders(state, payload) {
		state.borders = payload;
	},
	setShowYardEdition(state, payload) {
		state.showYardEdition = payload;
	},
	setEditingYard(state, payload) {
		state.editingYard = payload;
	},
	setSelectedYard(state, payload) {
		state.selectedYard = payload;
	},
	setSelectedArea(state, payload) {
		state.selectedArea = payload;
	},
	setShowAreaEdition(state, payload) {
		state.showAreaEdition = payload;
	},
	setEditingArea(state, payload) {
		state.editingArea = payload;
	},
	setSelectedSection(state, payload) {
		state.selectedSection = payload;
	},
	setShowSectionEdition(state, payload) {
		state.showSectionEdition = payload;
	},
	setEditingSection(state, payload) {
		state.editingSection = payload;
	},
	setSelectedZone(state, payload) {
		state.selectedZone = payload;
	},
	setShowZoneBatchEdition(state, payload) {
		state.showZoneBatchEdition = payload;
	},
	setShowZoneEdition(state, payload) {
		state.showZoneEdition = payload;
	},
	setEditingZone(state, payload) {
		state.editingZone = payload;
	},
	setEditingZoneModel(state, payload) {
		state.editingZoneModel = payload;
	},
};

function initializeYardStructure(context, module) {
	let yards = JSON.parse(window.localStorage.getItem("yards"));
	let areas = JSON.parse(window.localStorage.getItem("areas"));
	let sections = JSON.parse(window.localStorage.getItem("sections"));
	let zones = JSON.parse(window.localStorage.getItem("zones"));

	zones = zones || [];
	let borders = zones.filter((m) => m.ZoneType == "B");
	//zones = zones.filter(m => m.ZoneType != 'B');

	context.commit("setYards", yards || []);
	context.commit("setAreas", areas || []);
	context.commit("setSections", sections || []);
	context.commit("setZones", zones || []);
	context.commit("setBorders", borders || []);
	module.dispatch("drawingYard/draw");
}

const actions = {
	selectYard(context, payload) {
		context.commit("setSelectedYard", payload);
		context.dispatch("editYard");
	},
	addNewYard(context) {
		context.commit("setEditingYard", Object.assign({}, defaults.yard));
		context.commit("setShowYardEdition", true);
	},
	editYard(context) {
		context.commit(
			"setEditingYard",
			Object.assign({}, defaults.yard, context.state.selectedYard)
		);
		context.commit("setShowYardEdition", true);
	},
	cancelYardEdition(context) {
		context.commit("setEditingYard", {});
		context.commit("setShowYardEdition", false);
	},
	saveYard(context) {
		let existingYard = context.state.yards.find(
			(m) => m.IdZone == context.state.editingYard.IdZone
		);
		if (!existingYard) {
			context.state.yards.push(context.state.editingYard);
		} else {
			Object.assign(existingYard, context.state.editingYard);
		}
		context.commit("setEditingYard", {});
		context.commit("setShowYardEdition", false);
		context.dispatch("updateYardInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	excludeYards(context, payload) {
		let yards = [];
		context.state.yards.forEach((yard) => {
			if (payload.find((m) => m.IdZone == yard.IdZone)) return;
			yards.push(yard);
		});
		context.commit("setYards", yards);
		context.dispatch("updateYardInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	updateYardInTheStorage(context) {
		window.localStorage.setItem(
			"yards",
			JSON.stringify(context.state.yards)
		);
	},
	selectArea(context, payload) {
		context.commit("setSelectedArea", payload);
		context.dispatch("editArea");
	},
	addNewArea(context) {
		context.commit("setEditingArea", Object.assign({}, defaults.area));
		context.commit("setShowAreaEdition", true);
	},
	editArea(context) {
		context.commit(
			"setEditingArea",
			Object.assign({}, defaults.area, context.state.selectedArea)
		);
		context.commit("setShowAreaEdition", true);
	},
	cancelAreaEdition(context) {
		context.commit("setEditingArea", {});
		context.commit("setShowAreaEdition", false);
	},
	saveArea(context) {
		context.state.editingArea.Area = context.state.editingArea.Zone;
		let existingArea = context.state.areas.find(
			(m) => m.IdZone == context.state.editingArea.IdZone
		);
		if (!existingArea) {
			context.state.areas.push(context.state.editingArea);
		} else {
			Object.assign(existingArea, context.state.editingArea);
		}
		context.commit("setEditingArea", {});
		context.commit("setShowAreaEdition", false);
		context.dispatch("updateAreaInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	excludeAreas(context, payload) {
		let areas = [];
		context.state.areas.forEach((area) => {
			if (payload.find((m) => m.IdZone == area.IdZone)) return;
			areas.push(area);
		});
		context.commit("setAreas", areas);
		context.dispatch("updateAreaInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	updateAreaInTheStorage(context) {
		window.localStorage.setItem(
			"areas",
			JSON.stringify(context.state.areas)
		);
	},
	selectSection(context, payload) {
		context.commit("setSelectedSection", payload);
		context.dispatch("editSection");
	},
	addNewSection(context) {
		context.commit(
			"setEditingSection",
			Object.assign({}, defaults.section)
		);
		context.commit("setShowSectionEdition", true);
	},
	editSection(context) {
		context.commit(
			"setEditingSection",
			Object.assign({}, defaults.section, context.state.selectedSection)
		);
		context.commit("setShowSectionEdition", true);
	},
	cancelSectionEdition(context) {
		context.commit("setEditingSection", {});
		context.commit("setShowSectionEdition", false);
	},
	saveSection(context) {
		context.state.editingSection.Section =
			context.state.editingSection.Zone;
		let existingSection = context.state.sections.find(
			(m) => m.IdZone == context.state.editingSection.IdZone
		);
		if (!existingSection) {
			context.state.sections.push(context.state.editingSection);
		} else {
			Object.assign(existingSection, context.state.editingSection);
		}
		context.commit("setEditingSection", {});
		context.commit("setShowSectionEdition", false);
		context.dispatch("updateSectionInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	excludeSections(context, payload) {
		let sections = [];
		context.state.sections.forEach((section) => {
			if (payload.find((m) => m.IdZone == section.IdZone)) return;
			sections.push(section);
		});
		context.commit("setSections", sections);
		context.dispatch("updateSectionInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	updateSectionInTheStorage(context) {
		window.localStorage.setItem(
			"sections",
			JSON.stringify(context.state.sections)
		);
	},
	addNewZone(context) {
		context.commit("setEditingZone", Object.assign({}, defaults.zone));
		context.commit("setShowZoneEdition", true);
	},
	selectZone(context, payload) {
		context.commit("setSelectedZone", payload);
		context.dispatch("editZone");
	},
	addZonesByBatch(context) {
		context.commit("setEditingZoneModel", Object.assign({}, defaults.zone));
		context.commit("setShowZoneBatchEdition", true);
	},
	editZone(context) {
		context.commit(
			"setEditingZone",
			Object.assign({}, defaults.zone, context.state.selectedZone)
		);
		context.commit("setShowZoneEdition", true);
	},
	cancelZoneEdition(context) {
		context.commit("setEditingZone", {});
		context.commit("setShowZoneEdition", false);
	},
	cancelZoneBatchCreation(context) {
		context.commit("setEditingZoneModel", {});
		context.commit("setShowZoneBatchEdition", false);
	},
	saveZone(context) {
		let existingZone = context.state.zones.find(
			(m) => m.IdZone == context.state.editingZone.IdZone
		);
		if (!existingZone) {
			context.state.zones.push(context.state.editingZone);
			if (context.state.editingZone.ZoneType == "B")
				context.state.borders.push(context.state.editingZone);
		} else {
			Object.assign(existingZone, context.state.editingZone);
		}
		context.commit("setEditingZone", {});
		context.commit("setShowZoneEdition", false);
		context.dispatch("updateZonesInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	saveZones(context, zones) {
		zones.forEach((zone) => context.state.zones.push(zone));
		context.commit("setEditingZoneModel", {});
		context.commit("setShowZoneBatchEdition", false);
		context.dispatch("updateZonesInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	excludeZones(context, payload) {
		let zones = [];
		context.state.zones.forEach((zone) => {
			if (payload.find((m) => m.IdZone == zone.IdZone)) return;
			zones.push(zone);
		});
		context.commit("setZones", zones);
		context.dispatch("updateZonesInTheStorage");
		this.dispatch("drawingYard/refresh");
	},
	updateZonesInTheStorage(context) {
		window.localStorage.setItem(
			"zones",
			JSON.stringify(context.state.zones)
		);
	},
	updateLocalStorage(context) {
		window.localStorage.setItem(
			"yards",
			JSON.stringify(context.state.yards)
		);
		window.localStorage.setItem(
			"areas",
			JSON.stringify(context.state.areas)
		);
		window.localStorage.setItem(
			"sections",
			JSON.stringify(context.state.sections)
		);
		window.localStorage.setItem(
			"zones",
			JSON.stringify(context.state.zones)
		);
	},
	initializeYard(context) {
		initializeYardStructure(context, this);
	},
	selectZoneFromPosition(context, payload) {
		let selectedZone = context.state.zones.find(
			(zone) => zone.IdZone == payload.IdZone
		);
		if (!selectedZone) return;
		context.commit("setSelectedZone", selectedZone);
		context.dispatch("editZone");
	},
};

const getters = {};

export default {
	namespaced: true,
	state,
	getters,
	actions,
	mutations,
};
