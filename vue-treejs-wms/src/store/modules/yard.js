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
  showSectionEdition: false,
  editingSection: {},
  selectedSection: {},
  yards: [],
  areas: [],
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
  setSelectedSection(state, payload) {
    state.selectedSection = payload;
  },
  setShowSectionEdition(state, payload) {
    state.showSectionEdition = payload;
  },
  setEditingSection(state, payload) {
    state.editingSection = payload;
  },
};

function initializeYardStructure(context, module) {
  let yards = JSON.parse(window.localStorage.getItem("yards"));
  let areas = JSON.parse(window.localStorage.getItem("areas"));
  let sections = JSON.parse(window.localStorage.getItem("sections"));
  
  context.commit("setYards", yards || []);
  context.commit("setAreas", areas || []);
  context.commit("setSections", sections || []);
  context.commit("setZones", []);
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
    context.dispatch("updateAreaInTheStorage");
    this.dispatch("drawingYard/refresh");
  },
  updateAreaInTheStorage(context) {
    window.localStorage.setItem("areas", JSON.stringify(context.state.areas));
  },



  
  selectSection(context, payload) {
    context.commit("setSelectedSection", payload);
    context.dispatch("editSection");
  },
  addNewSection(context) {
    context.commit("setEditingSection", Object.assign({}, defaults.section));
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
    let existingSection = context.state.sections.find(
      (m) => m.IdZone == context.state.editingSection.IdZone
    );
    if (!existingSection) {
      context.state.sections.push(context.state.editingSection);
    } else {
      Object.assign(existingSection, context.state.editingSection);
    }
    context.commit("setEditingSectino", {});
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
    window.localStorage.setItem("sections", JSON.stringify(context.state.sections));
  },




  initializeYard(context) {
    initializeYardStructure(context, this);
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
