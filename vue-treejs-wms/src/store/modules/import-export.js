import axios from "axios";
const defaults = require("../.././config/default-yard-config").default;

if (!String.prototype.format) {
  String.prototype.format = function() {
    var args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
      return typeof args[number] != "undefined" ? args[number] : match;
    });
  };
}

const state = () => ({
  showImportDialog: false,
  showExportDialog: false,
  serviceUrl: "",
  file: "",
});

const mutations = {
  setShowImportDialog(state, payload) {
    state.showImportDialog = payload;
  },
  setServiceUrl(state, payload) {
    state.serviceUrl = payload;
  },
  setShowExportDialog(state, payload) {
    state.showExportDialog = payload;
  },
  setFile(state, payload) {
    state.file = payload;
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
      module.dispatch("yard/updateLocalStorage");
      module.dispatch("drawingYard/clearScene");
      module.dispatch("drawingYard/draw");
      context.commit("setShowImportDialog", false);
    })
    .catch(function(error) {
      console.log(error);
    });
}

function loadFromFile(context, module) {
  let reader = new FileReader();
  let file = context.state.file;
  reader.readAsText(file, "UTF-8");
  reader.onload = function(evt) {
    let content = JSON.parse(evt.target.result);
    let yards = content.yards;
    let areas = content.areas;
    let sections = content.sections;
    let zones = content.zones;
    module.commit("yard/setYards", yards);
    module.commit("yard/setAreas", areas);
    module.commit("yard/setSections", sections);
    module.commit("yard/setZones", zones);
    module.dispatch("yard/updateLocalStorage");
    module.dispatch("drawingYard/clearScene");
    module.dispatch("drawingYard/draw");
    context.commit("setShowImportDialog", false);
  };
  reader.onerror = function() {
    console.log("error reading file");
  };
}

function exportJson(context) {
  let jsonObj = {
    yards: context.rootState.yard.yards,
    areas: context.rootState.yard.areas,
    sections: context.rootState.yard.sections,
    zones: context.rootState.yard.zones,
  };
  let fileURL = window.URL.createObjectURL(new Blob([JSON.stringify(jsonObj)]));
  let fileLink = document.createElement("a");
  fileLink.href = fileURL;
  fileLink.setAttribute("download", "yard-structure.json");
  document.body.appendChild(fileLink);
  fileLink.click();
  document.body.removeChild(fileLink);
}

function formatYardScript(yard, script) {
  return script.format(
    yard.Zone,
    yard.YardType,
    yard.Description,
    yard.OffsetX,
    yard.OffsetY,
    yard.CameraOffsetX,
    yard.CameraOffsetY,
    yard.CameraOffsetZ,
    yard.CameraAngleXy,
    yard.CameraAngleYz
  );
}

function formatAreaScript(area, script) {
  return script.format(
    area.Zone,
    area.Yard,
    area.Description,
    area.OffsetX,
    area.OffsetY,
    area.CameraOffsetX,
    area.CameraOffsetY,
    area.CameraOffsetZ,
    area.CameraAngleXy,
    area.CameraAngleYz
  );
}

function formatSectionScript(section, script) {
  return script.format(
    section.Zone,
    section.Yard,
    section.Area,
    section.Description,
    section.OffsetX,
    section.OffsetY,
    section.CameraOffsetX,
    section.CameraOffsetY,
    section.CameraOffsetZ,
    section.CameraAngleXy,
    section.CameraAngleYz
  );
}

function formatZoneScript(zone, script) {
  let regex = /#([0-9a-zA-Z]{6})([0-9a-zA-Z]{2})/;
  let pattern = "#$2$1";
  return script.format(
    zone.IdZone,
    zone.Zone,
    zone.ZoneType,
    zone.Yard,
    zone.Area ? `'${zone.Area}'` : null,
    zone.Section ? `'${zone.Section}'` : null,
    zone.Status,
    zone.ColorBackground.replace(regex, pattern),
    zone.ColorForeground.replace(regex, pattern),
    zone.ColorFrame.replace(regex, pattern),
    zone.PosXMin,
    zone.PosXMax,
    zone.PosYMin,
    zone.PosYMax,
    zone.PosZMin,
    zone.PosZMax,
    (zone.Description || "").replace("null", ""),
    zone.IdZonePrevX,
    zone.IdZonePrevY,
    zone.IdZonePrevZ,
    zone.CameraOffsetX,
    zone.CameraOffsetY,
    zone.CameraOffsetZ,
    zone.CameraAngleXy,
    zone.CameraAngleYz,
    zone.PieceCountMax,
    zone.Priority,
    zone.XAlignment,
    zone.YAlignment,
    zone.RotateAngle,
    zone.TiltAngle,
    zone.GenEventEnter ? 1 : 0,
    zone.GenEventExit ? 1 : 0,
    zone.MaxStress,
    zone.MaxHeight
  );
}

function buildInsertScriptFileContent(context) {
  let sqlScripts = {
    yardScript: defaults.InsertYardScript,
    areaScript: defaults.InsertAreaScript,
    sectionScript: defaults.InsertSectionScript,
    zoneScript: defaults.InsertZoneScript,
  };
  return buildScript(context, sqlScripts);
}

function buildUpdateScriptFileContent(context) {
  let sqlScripts = {
    yardScript: defaults.UpdateYardScript,
    areaScript: defaults.UpdateAreaScript,
    sectionScript: defaults.UpdateSectionScript,
    zoneScript: defaults.UpdateZoneScript,
  };
  return buildScript(context, sqlScripts);
}

function buildScript(context, sqlScripts) {
  let script = [];
  script.push(` -- YARDS`);
  context.rootState.yard.yards.forEach((yard) => {
    yard = Object.assign({}, defaults.yard, yard);
    let sql = formatYardScript(yard, sqlScripts.yardScript);
    script.push(sql);
    sql = formatZoneScript(yard, sqlScripts.zoneScript);
    script.push(sql);
  });

  script.push(` -- AREAS`);
  context.rootState.yard.areas.forEach((area) => {
    area = Object.assign({}, defaults.area, area);
    let sql = formatAreaScript(area, sqlScripts.areaScript);
    script.push(sql);
    sql = formatZoneScript(area, sqlScripts.zoneScript);
    script.push(sql);
  });

  script.push(` -- SECTIONS`);
  context.rootState.yard.sections.forEach((section) => {
    section = Object.assign({}, defaults.section, section);
    section.Section = section.Zone;
    let sql = formatSectionScript(section, sqlScripts.sectionScript);
    script.push(sql);
    sql = formatZoneScript(section, sqlScripts.zoneScript);
    script.push(sql);
  });

  script.push(` -- ZONES`);
  let currentSection = "##";
  let zones = context.rootState.yard.zones.sort((m, n) =>
    m.IdZone < n.IdZone ? -1 : 1
  );
  zones.forEach((zone) => {
    zone = Object.assign({}, defaults.zone, zone);
    if (currentSection != zone.Section) {
      currentSection = zone.Section;
      script.push(` -- Zones of ${zone.Section}`);
    }
    let sql = formatZoneScript(zone, sqlScripts.zoneScript);
    script.push(sql);
  });
  return script.join("\n");
}

function exportInsertScript(context) {
  let script = buildInsertScriptFileContent(context);
  exportScriptFile(script);
}

function exportUpdateScript(context) {
  let script = buildUpdateScriptFileContent(context);
  exportScriptFile(script);
}

function exportScriptFile(script) {
  let fileURL = window.URL.createObjectURL(new Blob([script]));
  let fileLink = document.createElement("a");
  fileLink.href = fileURL;
  fileLink.setAttribute("download", "yard-structure.sql");
  document.body.appendChild(fileLink);
  fileLink.click();
  document.body.removeChild(fileLink);
}

const actions = {
  showImportDataDialog(context, payload) {
    context.commit("setShowImportDialog", payload);
    context.commit("setFile", "");
    context.commit("setServiceUrl", "");
  },
  setServiceUrl(context, payload) {
    context.commit("setServiceUrl", payload);
  },
  loadFromService(context) {
    loadFromService(context, this);
  },
  setFile(context, payload) {
    context.commit("setFile", payload);
  },
  loadFromFile(context) {
    loadFromFile(context, this);
  },
  showExportDataDialog(context, payload) {
    context.commit("setShowExportDialog", payload);
  },
  exportData(context, payload) {
    if (payload == "json") exportJson(context);
    else if (payload == "script insert") exportInsertScript(context);
    else exportUpdateScript(context);
    context.dispatch("showExportDataDialog", false);
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
