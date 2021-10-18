const defaults = require("../.././config/default-yard-config").default;

const state = () => ({
	yard: "",
	area: "",
	section: undefined,
	layer: 0,
	rows: 1,
	columns: 1,
	idZonePattern: "",
	zonePattern: "",
	initialRow: 1,
	initialColumn: 1,
	width: 1000,
	length: 1000,
	height: 1000,
	initialXCoord: 0,
	initialYCoord: 0,
	initialZCoord: 0,
	rowGap: 0,
	columnGap: 0,
	zones: [],
});

const mutations = {
	setYard(state, payload) {
		state.yard = payload;
	},
	setArea(state, payload) {
		state.area = payload;
	},
	setSection(state, payload) {
		state.section = payload;
		state.idZonePattern = `${`${payload.IdZone}`.substr(0, 4)}$cc$$rr$$l$`;
		state.zonePattern = `${payload.Zone}$r$-$c$`;
		state.initialXCoord = payload.PosXMin;
		state.initialYCoord = payload.PosYMin;
		state.initialZCoord = payload.PosZMin;
	},
	setLayer(state, payload) {
		state.layer = payload;
	},
	setRows(state, payload) {
		state.rows = payload;
	},
	setColumns(state, payload) {
		state.columns = payload;
	},
	setIdZonePattern(state, payload) {
		state.idZonePattern = payload;
	},
	setZonePattern(state, payload) {
		state.zonePattern = payload;
	},
	setInitialRow(state, payload) {
		state.initialRow = payload;
	},
	setInitialColumn(state, payload) {
		state.initialColumn = payload;
	},
	setWidth(state, payload) {
		state.width = payload;
	},
	setLength(state, payload) {
		state.length = payload;
	},
	setHeight(state, payload) {
		state.height = payload;
	},
	setInitialXCoord(state, payload) {
		state.initialXCoord = payload;
	},
	setInitialYCoord(state, payload) {
		state.initialYCoord = payload;
	},
	setInitialZCoord(state, payload) {
		state.initialZCoord = payload;
	},
	setRowGap(state, payload) {
		state.rowGap = payload;
	},
	setColumnGap(state, payload) {
		state.columnGap = payload;
	},
	setZones(state, payload) {
		state.zones = payload;
	},
};

const zeroPad = (num, places) => String(num).padStart(places, "0");

const generateIdZone = (pattern, row, col, layer) => {
	row = parseInt(row);
	col = parseInt(col);
	layer = parseInt(layer);
	pattern = pattern.replace("$rr$", zeroPad(row, 2));
	pattern = pattern.replace("$r$", zeroPad(row, 1));
	pattern = pattern.replace("$cc$", zeroPad(col, 2));
	pattern = pattern.replace("$c$", zeroPad(col, 1));
	pattern = pattern.replace("$ll$", zeroPad(layer, 2));
	pattern = pattern.replace("$l$", zeroPad(layer, 1));
	return parseInt(pattern);
};

const generateZoneName = (pattern, row, col, layer) => {
	row = parseInt(row);
	col = parseInt(col);
	layer = parseInt(layer);
	pattern = pattern.replace("$rr$", zeroPad(row, 2));
	pattern = pattern.replace("$r$", zeroPad(row, 1));
	pattern = pattern.replace("$rl$", String.fromCharCode(64 + row));
	pattern = pattern.replace("$cc$", zeroPad(col, 2));
	pattern = pattern.replace("$c$", zeroPad(col, 1));
	pattern = pattern.replace("$cl$", String.fromCharCode(64 + col));
	pattern = pattern.replace("$ll$", zeroPad(layer, 2));
	pattern = pattern.replace("$l$", zeroPad(layer, 1));
	return pattern;
};

const actions = {
	setYard(context, payload) {
		context.commit("setYard", payload);
	},
	setArea(context, payload) {
		context.commit("setArea", payload);
	},
	setSection(context, payload) {
		context.commit("setSection", payload);
	},
	setLayer(context, payload) {
		context.commit("setLayer", payload);
	},
	setRows(context, payload) {
		context.commit("setRows", payload);
	},
	setColumns(context, payload) {
		context.commit("setColumns", payload);
	},
	setIdZonePattern(context, payload) {
		context.commit("setIdZonePattern", payload);
	},
	setZonePattern(context, payload) {
		context.commit("setZonePattern", payload);
	},
	setInitialRow(context, payload) {
		context.commit("setInitialRow", payload);
	},
	setInitialColumn(context, payload) {
		context.commit("setInitialColumn", payload);
	},
	setWidth(context, payload) {
		context.commit("setWidth", payload);
	},
	setLength(context, payload) {
		context.commit("setLength", payload);
	},
	setHeight(context, payload) {
		context.commit("setHeight", payload);
	},
	setInitialXCoord(context, payload) {
		context.commit("setInitialXCoord", payload);
	},
	setInitialYCoord(context, payload) {
		context.commit("setInitialYCoord", payload);
	},
	setInitialZCoord(context, payload) {
		context.commit("setInitialZCoord", payload);
	},
	setRowGap(context, payload) {
		context.commit("setRowGap", payload);
	},
	setColumnGap(context, payload) {
		context.commit("setColumnGap", payload);
	},
	generateZones(context) {
		let iniCol = parseInt(context.state.initialColumn);
		let iniRow = parseInt(context.state.initialRow);
		let rows = parseInt(context.state.rows);
		let columns = parseInt(context.state.columns);
		let layer = parseInt(context.state.layer);
		for (let countRows = 0; countRows < rows; countRows++) {
			for (let countCols = 0; countCols < columns; countCols++) {
				let newZone = Object.assign(
					{},
					context.rootState.yard.editingZoneModel
				);
				newZone.Yard = context.state.yard;
				newZone.Area = context.state.area;
				newZone.Section = context.state.section.Zone;
				newZone.IdZone = generateIdZone(
					context.state.idZonePattern,
					countRows + iniRow,
					countCols + iniCol,
					layer
				);
				newZone.Zone = generateZoneName(
					context.state.zonePattern,
					countRows + iniRow,
					countCols + iniCol,
					layer
				);
				let initX = parseInt(context.state.initialXCoord);
				let initY = parseInt(context.state.initialYCoord);
				let initZ = parseInt(context.state.initialZCoord);
				let rowGap = parseInt(context.state.rowGap);
				let colGap = parseInt(context.state.columnGap);
				let width = parseInt(context.state.width);
				let length = parseInt(context.state.length);
				let height = parseInt(context.state.height);
				newZone.PosXMin = initX + countCols * (width + colGap);
				newZone.PosXMax = initX + countCols * (width + colGap) + width;
				newZone.PosYMin =
					initY +
					defaults.ZoneBatchRowDirection *
						countRows *
						(length + rowGap);
				newZone.PosYMax =
					initY +
					defaults.ZoneBatchRowDirection *
						countRows *
						(length + rowGap) +
					length;
				newZone.PosZMin = initZ;
				newZone.PosZMax = initZ + height;
				context.state.zones.push(newZone);
			}
		}
		this.dispatch("yard/saveZones", context.state.zones);
		context.commit("setZones", []);
		this.dispatch("drawingYard/refresh");
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
