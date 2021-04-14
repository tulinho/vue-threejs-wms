import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'
import camera from './modules/camera'
import yard from './modules/yard'
import drawingYard from './modules/drawing-yard'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{menu,camera,yard,drawingYard},
  state: {
  },
  getters: {
  },
  mutations: {
  },
  actions: {
  }
})
