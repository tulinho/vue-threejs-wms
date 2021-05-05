import * as THREE from "three";

const state = () => ({
  message: "No errors",
});

const mutations = {
  setMessage(state, payload) {
    state.message = payload;
  },
};

const actions = {
  validate(context, payload) {
      let yards = context.rootState.yard.yards;
      let areas = context.rootState.yard.areas;
      let sections = context.rootState.yard.yards;
      let zones = context.rootState.yard.yards;
    context.commit("setContainer", payload);
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
