import axios from "axios";

const defaults = require("../.././config/default-yard-config").default;

const state = () => ({
  zoneTypes: [
    { id: "Y", name: "Yard" },
    { id: "A", name: "Area" },
    { id: "S", name: "Section" },
    { id: "Z", name: "Zone" },
  ],
  showYardEdition: false,
  editingYard: {},
  selectedYard: {},
  showAreaEdition: false,
  editingArea: {},
  selectedArea: {},
  yards: [
    {
      IdZone: 999999999,
      Zone: "YARD1",
      ZoneType: "Y",
      ColorBackground: "#F0F0F0",
      ColorForeground: "#000000",
      PosXMin: 12000,
      PosXMax: 432001,
      PosYMin: 0,
      PosYMax: 135001,
      PosZMin: -400,
      PosZMax: 1250,
    },
  ],
  areas: [
    {
      IdZone: 100000000,
      Zone: "AREA1",
      ZoneType: "A",
      ColorBackground: "#FF8686",
      ColorForeground: "#000000",
      PosXMin: 72001,
      PosXMax: 228000,
      PosYMin: 99001,
      PosYMax: 135000,
      PosZMin: 0,
      PosZMax: 1250,
    },
    {
      IdZone: 200000000,
      Zone: "AREA2",
      ZoneType: "A",
      ColorBackground: "#86FF86",
      ColorForeground: "#000000",
      PosXMin: 74001,
      PosXMax: 432000,
      PosYMin: 63001,
      PosYMax: 99000,
      PosZMin: 0,
      PosZMax: 1250,
    },
    {
      IdZone: 300000000,
      Zone: "AREA3",
      ZoneType: "A",
      ColorBackground: "#8686FF",
      ColorForeground: "#000000",
      PosXMin: 12001,
      PosXMax: 408000,
      PosYMin: 36001,
      PosYMax: 63000,
      PosZMin: 0,
      PosZMax: 1250,
    },
    {
      IdZone: 400000000,
      Zone: "AREA4",
      ZoneType: "A",
      ColorBackground: "#868686",
      ColorForeground: "#000000",
      PosXMin: 12001,
      PosXMax: 156000,
      PosYMin: 1,
      PosYMax: 36000,
      PosZMin: 0,
      PosZMax: 1250,
    },
  ],
  sections: [],
  zones: [],
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
};

function initializeYardStructure(context, module) {
  let yards = JSON.parse(window.localStorage.getItem("yards"));
  let areas = JSON.parse(window.localStorage.getItem("areas"));
  
  context.commit("setYards", yards || []);
  context.commit("setAreas", areas || []);
  context.commit("setSections", []);
  context.commit("setZones", []);
  module.dispatch("drawingYard/draw");
}

function loadFromDataBase(context, module) {
  axios
    .get("http://localhost:8081/YardService.svc/TrackZones")
    .then(function(response) {
      let allZones = response.data.value;
      allZones.forEach((elem) => {
        elem.ColorForeground = hexToRGBA(
          elem.ColorForeground.replace(
            /#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,
            "#$2"
          )
        );
        elem.ColorBackground = hexToRGBA(
          elem.ColorBackground.replace(
            /#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,
            "#$2"
          )
        );
        elem.ColorFrame = elem.ColorFrame.replace(
          /#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,
          "#$2"
        );
      });
      let yards = allZones.filter((m) => m.ZoneType == "Y");
      let areas = allZones.filter((m) => m.ZoneType == "A");
      let sections = allZones.filter((m) => m.ZoneType == "S");
      let zones = allZones.filter((m) => m.ZoneType == "Z");
      context.commit("setYards", yards);
      context.commit("setAreas", areas);
      context.commit("setSections", sections);
      context.commit("setZones", zones);
      module.dispatch("drawingYard/draw");
    })
    .catch(function(error) {
      console.log(error);
    });
}

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
    window.localStorage.setItem("yards", JSON.stringify(context.state.yards));
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
    context.dispatch("updateAreasInTheStorage");
    this.dispatch("drawingYard/refresh");
  },
  updateAreaInTheStorage(context) {
    window.localStorage.setItem("areas", JSON.stringify(context.state.areas));
  },
  initializeYard(context) {
    initializeYardStructure(context, this);
  },
  loadFromDataBase(context) {
    loadFromDataBase(context, this);
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
