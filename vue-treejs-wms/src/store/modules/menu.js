
const state = () => ({
    showMenu: false,
    zoom: {
        value: 1000
    },
    zoomMin: 0,
    zoomMax: 3000
})

const mutations = {
    updateZoom(state, payload){
        state.zoom = payload;
    },
    updateShowMenu(state, payload){
        state.showMenu = payload;
    }
}

const actions = {
    show(context, payload){
        context.commit('updateShowMenu', payload);
    }
}

const getters = {}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}