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

    let elements = [];
    elements = elements.concat(yards);
    elements = elements.concat(areas);
    elements = elements.concat(sections);
    elements = elements.concat(zones);

    let findDuplicateIds = (arr) =>
      arr.filter((item1) =>
        arr.some(
          (item2) =>
            item2.IdZone == item1.IdZone &&
            arr.indexOf(item2) != arr.lastIndexOf(item1)
        )
      );
    let duplicatedIds = findDuplicateIds(elements);

    let findDuplicateZones = (arr) =>
      arr.filter((item1) =>
        arr.some(
          (item2) =>
            item2.Zone == item1.Zone &&
            arr.indexOf(item2) != arr.lastIndexOf(item1)
        )
      );
    let duplicatedZones = findDuplicateZones(elements);

    let areasWithWrongDimmentions = [];
    let sectionsWithWrongDimmentions = [];
    let zonesWithWrongDimmentions = [];

    let fitInside = (parent, child) =>
      parent.PosXMin <= child.PosXMin &&
      parent.PosXMax >= child.PosXMax &&
      parent.PosYMin <= child.PosYMin &&
      parent.PosYMax >= child.PosYMax;
    yards.forEach((yard) => {
      let areasAux = areas.filter(
        (item) => item.Yard == yard.Zone && !fitInside(yard, item)
      );
      areasWithWrongDimmentions = areasWithWrongDimmentions.concat(areasAux);
    });
    areas.forEach((area) => {
      let sectionsAux = sections.filter(
        (item) => item.Area == area.Zone && !fitInside(area, item)
      );
      sectionsWithWrongDimmentions = sectionsWithWrongDimmentions.concat(sectionsAux);
    });
    sections.forEach((section) => {
      let zonesAux = zones.filter(
        (item) => item.Section == section.Zone && !fitInside(section, item)
      );
      zonesWithWrongDimmentions = zonesWithWrongDimmentions.concat(zonesAux);
    });

    let messages = [];
    if(!duplicatedIds.length)
      messages.push("There's no duplicated IDs.");
    else{
      messages.push("The following IDs are duplicated:");
      duplicatedIds.forEach(elem => messages.push(`ID: ${elem.IdZone}, Name: ${elem.Zone}`));
    }
    
    if(!duplicatedZones.length)
      messages.push("There's no duplicated names.");
    else{
      messages.push("The following names are duplicated:");
      duplicatedZones.forEach(elem => messages.push(`ID: ${elem.IdZone}, Name: ${elem.Zone}`));
    }

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
