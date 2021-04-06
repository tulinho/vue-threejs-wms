
import * as THREE from "three";

const state = () => ({
    yards: [{
        IdZone:999999999,
        Zone:'YARD1',
        ZoneType:'Y',
        ColorBackground:'#F0F0F0',
        ColorForeground:'#000000',
        PosXMin: 12000,
        PosXMax: 432001,
        PosYmin: 0,
        PosYMax: 135001,
        PosZmin: -400,
        PosZMax: 1250,
    }],
    areas:[{
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
})

const mutations = {
}

function createMeshForYardElement(elem, scale, offsetX, offsetY){
    let width = (elem.PosXMax - elem.PosXMin) / scale;
    let height = (elem.PosYMax - elem.PosYmin) / scale;

    let geometry = new THREE.BoxGeometry(width, height, 0.001);
    let material = new THREE.MeshBasicMaterial({
    color: elem.ColorBackground,
    side: THREE.DoubleSide,
    });
    let mesh = new THREE.Mesh(geometry, material);

    mesh.position.y = elem.PosYmin / scale + height / 2 - offsetY;
    mesh.position.x = elem.PosXMin / scale + width / 2 - offsetX;
    mesh.position.z = elem.PosZmin / scale;

    return mesh;
}

const actions = {
    draw(context){
        let yard = context.state.yards[0];
        let maxX = yard.PosXMax;
        let maxY = yard.PosYMax;
        let scale = context.rootState.camera.scale;
  
        var offsetX = maxX / scale / 2;
        var offsetY = maxY / scale / 2;

        let yardMesh = createMeshForYardElement(yard, scale, offsetX, offsetY);
        context.rootState.camera.scene.add(yardMesh);
  
        context.state.areas.forEach((area => {
            let mesh = createMeshForYardElement(area, scale, offsetX, offsetY);
            context.rootState.camera.scene.add(mesh);
        }));
  
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