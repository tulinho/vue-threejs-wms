import Vue from "vue";
import Vuex from "vuex";
import menu from "./modules/menu";
import camera from "./modules/camera";
import yard from "./modules/yard";
import drawingYard from "./modules/drawing-yard";
import importExport from "./modules/import-export";
import zoneBatch from "./modules/zone-batch";
import validation from "./modules/validation";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    menu,
    camera,
    yard,
    drawingYard,
    importExport,
    zoneBatch,
    validation,
  },
  state: {},
  getters: {},
  mutations: {},
  actions: {},
});
