import axios from "axios";

const state = () => ({
  showImportDialog: false,
  serviceUrl: "",
});

const mutations = {
  setShowImportDialog(state, payload) {
    state.showImportDialog = payload;
  },
  setServiceUrl(state, payload) {
    state.serviceUrl = payload;
  },
};

function loadFromService(context, module) {
  axios
    .get(context.state.serviceUrl)
    .then(function(response) {
      let allZones = response.data.value;
      allZones.forEach((elem) => {
        elem.ColorForeground = elem.ColorForeground.replace(
          /#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,
          "#$2$1"
        );
        elem.ColorBackground = elem.ColorBackground.replace(
          /#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,
          "#$2$1"
        );
        elem.ColorFrame = elem.ColorFrame.replace(
          /#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,
          "#$2$1"
        );
      });
      let yards = allZones.filter((m) => m.ZoneType == "Y");
      let areas = allZones.filter((m) => m.ZoneType == "A");
      let sections = allZones.filter((m) => m.ZoneType == "S");
      let zones = allZones.filter((m) => m.ZoneType == "Z");
      module.commit("yard/setYards", yards);
      module.commit("yard/setAreas", areas);
      module.commit("yard/setSections", sections);
      module.commit("yard/setZones", zones);
      module.dispatch("drawingYard/draw");
      context.commit('setShowImportDialog', false);
    })
    .catch(function(error) {
      console.log(error);
    });
}

const actions = {
  showImportDataDialog(context, payload) {
    context.commit("setShowImportDialog", payload);
  },
  setServiceUrl(context, payload) {
    context.commit("setServiceUrl", payload);
  },
  loadFromService(context) {
    loadFromService(context, this);
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
