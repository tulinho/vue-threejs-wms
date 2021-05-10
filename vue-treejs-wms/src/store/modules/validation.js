const state = () => ({
  message: "No errors",
  showDialog: false
});

const mutations = {
  setMessage(state, payload) {
    state.message = payload;
  },
  setShowDialog(state, payload) {
    state.showDialog = payload;
  },
};

const actions = {
  setShowDialog(context, payload){
    if(payload)
      context.dispatch('validate');
    context.commit('setShowDialog', payload);
  },
  validate(context){
    context.dispatch('getValidationMessage')
    .then((message) => context.commit('setMessage', message));
    
  },
  getValidationMessage(context) {
    let yards = context.rootState.yard.yards;
    let areas = context.rootState.yard.areas;
    let sections = context.rootState.yard.sections;
    let zones = context.rootState.yard.zones;

    let elements = [];
    elements = elements.concat(yards);
    elements = elements.concat(areas);
    elements = elements.concat(sections);
    elements = elements.concat(zones);

    let findDuplicatedIds = (arr) =>
      arr.filter((item1) =>
        arr.some(
          (item2) =>
            item2.IdZone == item1.IdZone &&
            arr.indexOf(item2) != arr.lastIndexOf(item1)
        )
      );
    let duplicatedIds = findDuplicatedIds(elements);

    let findDuplicatedZones = (arr) =>
      arr.filter((item1) =>
        arr.some(
          (item2) =>
            item2.Zone == item1.Zone &&
            arr.indexOf(item2) != arr.lastIndexOf(item1)
        )
      );
    let duplicatedZones = findDuplicatedZones(elements);

    let areasWithWrongDimmentions = [];
    let sectionsWithWrongDimmentions = [];
    let zonesWithWrongDimmentions = [];

    let fitInside = (parent, child) =>
      parseInt(parent.PosXMin) <= parseInt(child.PosXMin) &&
      parseInt(parent.PosXMax) >= parseInt(child.PosXMax) &&
      parseInt(parent.PosYMin) <= parseInt(child.PosYMin) &&
      parseInt(parent.PosYMax) >= parseInt(child.PosYMax);
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
      duplicatedIds.forEach(elem => messages.push(`  - ID: ${elem.IdZone}, Name: ${elem.Zone}`));
    }
    
    if(!duplicatedZones.length)
      messages.push("There's no duplicated names.");
    else{
      messages.push("The following names are duplicated:");
      duplicatedZones.forEach(elem => messages.push(`  - ID: ${elem.IdZone}, Name: ${elem.Zone}`));
    }    
    
    if(!areasWithWrongDimmentions.length)
      messages.push("All area's dimmentions are consistent.");
    else{
      messages.push("The following areas are inconsistent:");
      areasWithWrongDimmentions.forEach(elem => messages.push(`  - ID: ${elem.IdZone}, Name: ${elem.Zone}, Parent: ${elem.Yard}`));
    }    
    
    if(!sectionsWithWrongDimmentions.length)
      messages.push("All section's dimmentions are consistent.");
    else{
      messages.push("The following sections are inconsistent:");
      sectionsWithWrongDimmentions.forEach(elem => messages.push(`  - ID: ${elem.IdZone}, Name: ${elem.Zone}, Parent: ${elem.Area}`));
    }    
    
    if(!zonesWithWrongDimmentions.length)
      messages.push("All zone's dimmentions are consistent.");
    else{
      messages.push("The following zones are inconsistent:");
      zonesWithWrongDimmentions.forEach(elem => messages.push(`  - ID: ${elem.IdZone}, Name: ${elem.Zone}, Parent: ${elem.Section}`));
    }

    return messages.join('\n');

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
