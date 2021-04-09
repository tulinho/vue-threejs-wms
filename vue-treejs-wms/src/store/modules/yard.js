
import * as THREE from "three";
import axios from 'axios';

const state = () => ({
    zoneTypes:[{id:'Y', name:'Yard'},{id:'A', name:'Area'},{id:'S', name:'Section'},{id:'Z', name:'Zone'}],
    yards: [{
        IdZone:999999999,
        Zone:'YARD1',
        ZoneType:'Y',
        ColorBackground:'#F0F0F0',
        ColorForeground:'#000000',
        PosXMin: 12000,
        PosXMax: 432001,
        PosYMin: 0,
        PosYMax: 135001,
        PosZMin: -400,
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
        PosYMin: 99001,
        PosYMax: 135000,
        PosZMin: 0,
        PosZMax: 1250,
    },{
        IdZone:200000000,
        Zone:'AREA2',
        ZoneType:'A',
        ColorBackground:'#86FF86',
        ColorForeground:'#000000',
        PosXMin: 74001,
        PosXMax: 432000,
        PosYMin: 63001,
        PosYMax: 99000,
        PosZMin: 0,
        PosZMax: 1250,
    },{
        IdZone:300000000,
        Zone:'AREA3',
        ZoneType:'A',
        ColorBackground:'#8686FF',
        ColorForeground:'#000000',
        PosXMin: 12001,
        PosXMax: 408000,
        PosYMin: 36001,
        PosYMax: 63000,
        PosZMin: 0,
        PosZMax: 1250,
    },{
        IdZone:400000000,
        Zone:'AREA4',
        ZoneType:'A',
        ColorBackground:'#868686',
        ColorForeground:'#000000',
        PosXMin: 12001,
        PosXMax: 156000,
        PosYMin: 1,
        PosYMax: 36000,
        PosZMin: 0,
        PosZMax: 1250,
    }],
    sections:[],
    zones:[]
})

const mutations = {
    setYards(state, payload){
        state.yards = payload;
    },
    setAreas(state, payload){
        state.areas = payload;
    },
    setSections(state, payload){
        state.sections = payload;
    },
    setZones(state, payload){
        state.zones = payload;
    }
}

function initializeYardStructure(context){
    axios.get("http://localhost:8081/YardService.svc/TrackZones")
    .then(function (response) {
        let allZones = response.data.value;
        allZones.forEach(elem => {
            elem.ColorForeground = hexToRGBA(elem.ColorForeground.replace(/#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,'#$2'));
            elem.ColorBackground = hexToRGBA(elem.ColorBackground.replace(/#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,'#$2'));
            elem.ColorFrame = elem.ColorFrame.replace(/#([0-9a-zA-Z]{2})([0-9a-zA-Z]{6})/,'#$2');
        });
        let yards = allZones.filter(m => m.ZoneType == 'Y');
        let areas = allZones.filter(m => m.ZoneType == 'A');
        let sections = allZones.filter(m => m.ZoneType == 'S');
        let zones = allZones.filter(m => m.ZoneType == 'Z');
        context.commit('setYards', yards);
        context.commit('setAreas', areas);
        context.commit('setSections', sections);
        context.commit('setZones', zones);
        context.dispatch('draw');
    })
    .catch(function (error) {
        console.log(error);
    })
}

const isValidHex = (hex) => /^#([A-Fa-f0-9]{3,4}){1,2}$/.test(hex)

const getChunksFromString = (st, chunkSize) => st.match(new RegExp(`.{${chunkSize}}`, "g"))

const convertHexUnitTo256 = (hexStr) => parseInt(hexStr.repeat(2 / hexStr.length), 16)

const getAlphafloat = (a, alpha) => {
    if (typeof a !== "undefined") {return a / 255}
    if ((typeof alpha != "number") || alpha <0 || alpha >1){
      return 1
    }
    return alpha
}

const hexToRGBA = (hex, alpha) => {
    if (!isValidHex(hex)) {throw new Error("Invalid HEX")}
    const chunkSize = Math.floor((hex.length - 1) / 3)
    const hexArr = getChunksFromString(hex.slice(1), chunkSize)
    const [r, g, b, a] = hexArr.map(convertHexUnitTo256)
    return `rgba(${r}, ${g}, ${b}, ${getAlphafloat(a, alpha)})`
}

function createPlaceholderForYardElement(elem, options){
    let defaults = {
        scale: 500,
        offsetX: 0,
        offsetY: 0,
        transparent: true,
        opacity: 1
    }
    options = Object.assign({},defaults,options);

    let width = (elem.PosXMax - elem.PosXMin) / options.scale;
    let height = (elem.PosYMax - elem.PosYMin) / options.scale;

    let geometry = new THREE.BoxGeometry(width, height, 0.001);
    let material = new THREE.MeshBasicMaterial({
        transparent: options.transparent,
        opacity: options.opacity,
        depthTest: false,
        depthWrite: false,
        color: elem.ColorBackground,
        side: THREE.DoubleSide,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = `${elem.ZoneType}_${elem.Zone}`;
    mesh.IdZone = elem.IdZone;

    mesh.position.y = elem.PosYMin / options.scale + height / 2 - options.offsetY;
    mesh.position.x = elem.PosXMin / options.scale + width / 2 - options.offsetX;
    mesh.position.z = elem.PosZMin / options.scale;

    var edges = new THREE.EdgesGeometry( mesh.geometry );
    var edgesMaterial = new THREE.LineBasicMaterial( { color: elem.ColorFrame, linewidth: 1 } );
    var wireframe = new THREE.LineSegments( edges, edgesMaterial );
    wireframe.renderOrder = 4; 
    mesh.add( wireframe );

    return mesh;
}

function createAreaLabel(text, parameters)
{
    let defaults = {
        color: "#000000",
        fontface: 'Arial',
        fontsize: 15,
        backgroundColor: "#ffffff"
    };
    parameters = Object.assign({}, defaults, parameters);
	if ( parameters === undefined ) parameters = {};
	
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');

    context.fillStyle = parameters.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = parameters.color;
    context.font = "Bold " + parameters.fontsize + "em " + parameters.fontface;
	context.fillText(text, 0, (canvas.height - parameters.fontsize), canvas.width);

	var texture = new THREE.CanvasTexture(canvas);
	var material = new THREE.MeshBasicMaterial({ map: texture });        
    let geometry = new THREE.BoxGeometry(72, 36, 0.001);
    let mesh = new THREE.Mesh(geometry, material);    

	return mesh;	
}

function createSectionLabel(text, parameters)
{
    let defaults = {
        color: "#000000",
        fontface: 'Arial',
        fontsize: 15,
        backgroundColor: "#ffffff"
    };
    parameters = Object.assign({}, defaults, parameters);
	if ( parameters === undefined ) parameters = {};
	
	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');

    context.fillStyle = parameters.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = parameters.color;
    context.font = parameters.fontsize + "em " + parameters.fontface;
	context.fillText(text, 0, (canvas.height - parameters.fontsize), canvas.width);

	var texture = new THREE.CanvasTexture(canvas);
	var material = new THREE.MeshBasicMaterial({ map: texture });        
    let geometry = new THREE.BoxGeometry(parameters.width, parameters.height, 0.001);
    let mesh = new THREE.Mesh(geometry, material);    

	return mesh;	
}



function createPlaceholderForZoneElement(elem, options){
    let defaults = {
        scale: 100,
        offsetX: 0,
        offsetY: 0,
        transparent: true,
        opacity: 1
    }
    options = Object.assign({},defaults,options);

    let width = (elem.PosXMax - elem.PosXMin) / options.scale;
    let height = (elem.PosYMax - elem.PosYMin) / options.scale;


	var canvas = document.createElement('canvas');
	var context = canvas.getContext('2d');

    context.fillStyle = options.backgroundColor;
    context.fillRect(0, 0, canvas.width, canvas.height);
    context.fillStyle = options.color;
    context.font = options.fontsize + "em " + options.fontface;

    let text = elem.Zone.replace(elem.Section, '');
    let textWidth = context.measureText(text).width;
	context.fillText(text, (canvas.width - textWidth) / 2, (canvas.height - (options.fontsize * 12)/2));
	var texture = new THREE.CanvasTexture(canvas);

    let geometry = new THREE.PlaneGeometry(width, height);
    let material = new THREE.MeshBasicMaterial({
        map: texture,
        transparent: options.transparent,
        opacity: options.opacity,
        depthTest: false,
        depthWrite: false,
        side: THREE.FrontSide,
    });
    let mesh = new THREE.Mesh(geometry, material);
    mesh.name = `${elem.ZoneType}_${elem.Zone}`;
    mesh.IdZone = elem.IdZone;

    

    mesh.position.y = elem.PosYMin / options.scale + height / 2 - options.offsetY;
    mesh.position.x = elem.PosXMin / options.scale + width / 2 - options.offsetX;
    mesh.position.z = elem.PosZMin / options.scale;

    var edges = new THREE.EdgesGeometry( mesh.geometry );
    var edgesMaterial = new THREE.LineBasicMaterial( { color: elem.ColorFrame, linewidth: 1 } );
    var wireframe = new THREE.LineSegments( edges, edgesMaterial );
    wireframe.renderOrder = 4; 
    mesh.add( wireframe );

    return mesh;
}


const actions = {
    initializeYard(context){
        initializeYardStructure(context);
    },
    draw(context){
        let yard = context.state.yards[0];
        let maxX = yard.PosXMax;
        let maxY = yard.PosYMax;
        let scale = context.rootState.camera.scale;
        let options = {
            scale: scale, 
            offsetX: maxX / (scale * 2), 
            offsetY: maxY / (scale * 2),
            transparent: false
        };

        let yardPlaceholder = createPlaceholderForYardElement(yard, options);
        yardPlaceholder.renderOrder = 1; 
        context.rootState.camera.scene.add(yardPlaceholder);
  
        //areas;
        let areaBackgroung = '';
        context.state.areas.forEach((area => {
            let placeHolder = createPlaceholderForYardElement(area, options);
            placeHolder.renderOrder = 2; 
            context.rootState.camera.scene.add(placeHolder);

            let parameters = { fontsize: 14, color: area.ColorForeground, backgroundColor: area.ColorBackground };
            let label = createAreaLabel( area.Zone, parameters);
            label.renderOrder = 3; 
            placeHolder.add( label );
            areaBackgroung = area.ColorBackground;
        }));

        options.opacity = 0;
        options.transparent = true;        
        //sections
        context.state.sections.forEach((section => {
            let placeHolder = createPlaceholderForYardElement(section, options);
            placeHolder.renderOrder = 3; 
            context.rootState.camera.scene.add(placeHolder);

            let fontSize = 14;//18 < (section.PosYMax - section.PosYMin)/scale ? 18 : (section.PosYMax - section.PosYMin)/scale;
            let parameters = { 
                fontsize: fontSize, 
                color: section.ColorForeground, 
                backgroundColor: areaBackgroung,
                width: fontSize * 0.75 * section.Zone.length,// (section.PosXMax - section.PosXMin) / (scale * 4),
                height: fontSize,//(section.PosYMax - section.PosYMin) / (scale)
            };
            let label = createSectionLabel( section.Zone, parameters);
            label.renderOrder = 3; 
            placeHolder.add( label );
        }));

        //zones
        let allZones = context.state.zones.sort((m,n) => m.IdZone < n.IdZone ? -1 : 1);
        context.dispatch('drawZones', allZones);
    },
    drawZones(context, zones){
        let yard = context.state.yards[0];
        let maxX = yard.PosXMax;
        let maxY = yard.PosYMax;
        let scale = context.rootState.camera.scale;
        let options = {
            scale: scale, 
            offsetX: maxX / (scale * 2), 
            offsetY: maxY / (scale * 2),
            transparent: false
        };
        options.opacity = 1;
        options.transparent = false;
        zones.forEach((zone => {           
            options.fontsize = 10; 
            options.fontface = "Calibri"; 
            options.color = zone.ColorForeground; 
            options.backgroundColor = zone.ColorBackground;
            let placeHolder = createPlaceholderForZoneElement(zone, options);
            placeHolder.renderOrder = 4; 
            context.rootState.camera.scene.add(placeHolder);
        }));
    },
    clearScene(context){
        let scene = context.rootState.camera.scene;
        for( var i = scene.children.length - 1; i >= 0; i--) { 
            let obj = scene.children[i];
            scene.remove(obj); 
        }
    },
    refresh(context){
        context.dispatch('clearScene');
        context.dispatch('draw');
    },
    filterZonesByLevel(context, level){
        let scene = context.rootState.camera.scene;
        for( var i = scene.children.length - 1; i >= 0; i--) { 
            let obj = scene.children[i];
            if(!obj.name.match(/Z_*/) || obj.IdZone % 10 == level)
                continue;
            scene.remove(obj); 
        }
        let allZones = context.state.zones.sort((m,n) => m.IdZone < n.IdZone ? -1 : 1);
        let zones = allZones.filter(obj => obj.IdZone % 10 == level);        
        context.dispatch('drawZones', zones);

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