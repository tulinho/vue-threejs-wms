
const state = () => ({
    showMenu: false,
    location: '',
    subLocations: [],
    subLocation: '',

    zoom: {
        value: 1000
    },
    zoomMin: 0,
    zoomMax: 4000
})

const mutations = {
    updateZoom(state, payload){
        state.zoom = payload;
    },
    updateShowMenu(state, payload){
        state.showMenu = payload;
    },
    setLocation(state, payload){
        state.location = payload;
    },
    setSubLocations(state, payload){
        state.subLocations = payload;
    },
    setSubLocation(state, payload){
        state.subLocation = payload;
    },
}

function calculateSubLocationCenter(context, subLocation){
    let yard = context.rootState.yard.yards[0];
    let scale = context.rootState.camera.scale;
    let zoom = context.rootState.camera.zoom;

    let width = (subLocation.PosXMax - subLocation.PosXMin) / scale;
    let height = (subLocation.PosYMax - subLocation.PosYMin) / scale;
    let yardWidth = (yard.PosXMax - yard.PosXMin) / scale;
    let yardHeight = (yard.PosYMax - yard.PosYMin) / scale;

    let offsetX = (subLocation.PosXMin - yard.PosXMin) / scale ;
    let offsetY = (subLocation.PosYMin - yard.PosYMin) / scale ;

    let x = 0 - yardWidth / 2 + offsetX + width / 2;
    let y = 0 - yardHeight / 2 + offsetY + height / 2;

    let yardMaxDim = yardWidth > yardHeight ? yardWidth : yardHeight;
    let subLocationMaxDim = width > height ? width : height;
    let z = zoom * subLocationMaxDim / yardMaxDim;
    return {
        x: x,
        y: y,
        z: z
    };
}

const actions = {
    show(context, payload){
        context.commit('updateShowMenu', payload);
    },
    setLocation(context, payload){
        context.commit('setLocation', payload);
        if(payload == 'Y'){
            context.commit('setSubLocations', context.rootState.yard.yards);
        } else {
            context.commit('setSubLocations', context.rootState.yard.areas);
        }
    },
    setSubLocation(context, payload) {
        context.commit('setSubLocation', payload);
    },
    focusSubLocation(context, payload){
        let subLocation = {};
        if(context.state.location == 'Y'){
            subLocation = context.rootState.yard.yards[0];
        } else {
            subLocation = context.rootState.yard.areas.find(m => m.IdZone == payload);
        }

        let point = calculateSubLocationCenter(context, subLocation);        
        this.dispatch('camera/moveCameraTo', point)
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