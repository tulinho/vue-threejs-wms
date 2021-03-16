import Vue from 'vue'
import Vuex from 'vuex'
import menu from './modules/menu'

Vue.use(Vuex)

export default new Vuex.Store({
  modules:{menu},
  state: {
    areas : [{
      IdZone:100000000,
      Zone:'AREA1',
      ZoneType:'A',
      ColorBackground:'#FF8686',
      ColorForeground:'#000000',
      PosXMin: 72001,
      PosXMax: 228000,
      PosYmin: 99001,
      PosYMax: 135000,
      PosZmin: 0,
      PosZMax: 1250,
  },{
      IdZone:200000000,
      Zone:'AREA2',
      ZoneType:'A',
      ColorBackground:'#86FF86',
      ColorForeground:'#000000',
      PosXMin: 74001,
      PosXMax: 432000,
      PosYmin: 63001,
      PosYMax: 99000,
      PosZmin: 0,
      PosZMax: 1250,
  },{
      IdZone:300000000,
      Zone:'AREA3',
      ZoneType:'A',
      ColorBackground:'#8686FF',
      ColorForeground:'#000000',
      PosXMin: 12001,
      PosXMax: 408000,
      PosYmin: 36001,
      PosYMax: 63000,
      PosZmin: 0,
      PosZMax: 1250,
  },{
      IdZone:400000000,
      Zone:'AREA4',
      ZoneType:'A',
      ColorBackground:'#868686',
      ColorForeground:'#000000',
      PosXMin: 12001,
      PosXMax: 156000,
      PosYmin: 1,
      PosYMax: 36000,
      PosZmin: 0,
      PosZMax: 1250,
  }]
  },
  getters: {
    areas: (state) => state.areas
  },
  mutations: {
  },
  actions: {
  }
})
