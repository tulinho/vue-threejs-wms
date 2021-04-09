
const state = () => ({
    showMenu: false,
    location: '',
    subLocations: [],
    subLocation: '',
    selLevel: 0,
    levels: [0,1,2,3,4,5,6,7]
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
    setSelLevel(state, payload){
        state.selLevel = payload;
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
        } else if(payload == 'A'){
            context.commit('setSubLocations', context.rootState.yard.areas);
        } else {
            context.commit('setSubLocations', context.rootState.yard.sections);
        }
    },
    setSubLocation(context, payload) {
        context.commit('setSubLocation', payload);
    },
    setSelectedLevel(context, payload) {
        context.commit('setSelLevel', payload);
    },
    focusSubLocation(context, payload){
        let subLocation = {};
        if(context.state.location == 'Y'){
            subLocation = context.rootState.yard.yards[0];
        } else if(context.state.location == 'A') {
            subLocation = context.rootState.yard.areas.find(m => m.IdZone == payload);
        } else {
            subLocation = context.rootState.yard.sections.find(m => m.IdZone == payload);
        }

        let point = calculateSubLocationCenter(context, subLocation);        
        this.dispatch('camera/moveCameraTo', point)
    },
    refreshYard(){
        this.dispatch('yard/refresh');
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