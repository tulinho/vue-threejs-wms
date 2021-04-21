<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="1000px">
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Section Zones</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-row>
              <v-col cols="3">
                <v-select
                  v-model="yard"
                  :items="yards"
                  color="primary"
                  item-text="Zone"
                  item-value="Zone"
                  label="Yard"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="area"
                  :items="areas"
                  color="primary"
                  item-text="Zone"
                  item-value="Zone"
                  label="Area"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-select
                  v-model="section"
                  :items="sections"
                  color="primary"
                  item-text="Zone"
                  return-object
                  label="Section"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Layer"
                  type="number"
                  v-model="layer"
                  dense
                ></v-text-field>
              </v-col>           
            </v-row>
            <v-row>
              <v-col cols="3">
                <v-text-field
                  label="Rows"
                  type="number"
                  v-model="rows"
                  dense
                ></v-text-field>
              </v-col>  
              <v-col cols="3">
                <v-text-field
                  label="Columns"
                  type="number"
                  v-model="columns"
                  dense
                ></v-text-field>
              </v-col>  
              <v-col cols="3">
                <v-text-field
                  label="Zone Id Pattern"
                  v-model="idZonePattern"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="3">
                <v-text-field
                  label="Zone Name Pattern"
                  v-model="zonePattern"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  label="Width"
                  type="number"
                  v-model="width"
                  dense
                ></v-text-field>
              </v-col>  
              <v-col cols="2">
                <v-text-field
                  label="Length"
                  type="number"
                  v-model="length"
                  dense
                ></v-text-field>
              </v-col>  
              <v-col cols="2">
                <v-text-field
                  label="Height"
                  type="number"
                  v-model="height"
                  dense
                ></v-text-field>
              </v-col>  
              <v-col cols="3">
                <v-text-field
                  label="Initial Row"
                  type="number"
                  v-model="initialRow"
                  dense
                ></v-text-field>
              </v-col> 
              <v-col cols="3">
                <v-text-field
                  label="Initial Column"
                  type="number"
                  v-model="initialColumn"
                  dense
                ></v-text-field>
              </v-col>              
            </v-row>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  label="Initial X"
                  type="number"
                  v-model="initialXCoord"
                  dense
                ></v-text-field>
              </v-col>  
              <v-col cols="2">
                <v-text-field
                  label="Initial Y"
                  type="number"
                  v-model="initialYCoord"
                  dense
                ></v-text-field>
              </v-col>  
              <v-col cols="2">
                <v-text-field
                  label="Initial Z"
                  type="number"
                  v-model="initialZCoord"
                  dense
                ></v-text-field>
              </v-col>  
              <v-col cols="3">
                <v-text-field
                  label="Row Gap"
                  type="number"
                  v-model="rowGap"
                  dense
                ></v-text-field>
              </v-col> 
              <v-col cols="3">
                <v-text-field
                  label="Column Gap"
                  type="number"
                  v-model="columnGap"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
              <v-col cols="12">
                <v-tabs center-active show-arrows>
                  <v-tab> <v-icon left>settings</v-icon>Properties </v-tab>
                  <v-tab-item>
                    <v-row>
                      <v-col cols="4">
                        <div class="mt-5 text-left">
                          <label class="ml-7 subtitle-1"
                            >Background Color</label
                          >
                          <v-color-picker
                            name="color-background"
                            v-model="zoneModel.ColorBackground"
                            mode="hexa"
                            class="ma-2"
                          ></v-color-picker>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="mt-5 text-left">
                          <label class="ml-7 subtitle-1"
                            >Foreground Color</label
                          >
                          <v-color-picker
                            name="color-background"
                            v-model="zoneModel.ColorForeground"
                            mode="hexa"
                            class="ma-2"
                          ></v-color-picker>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="mt-5 text-left">
                          <label class="ml-7 subtitle-1">Frame Color</label>
                          <v-color-picker
                            name="color-background"
                            v-model="zoneModel.ColorFrame"
                            mode="hexa"
                            class="ma-2"
                          ></v-color-picker>
                        </div>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                  <v-tab>
                    <v-icon left>settings_input_component</v-icon>Advanced
                  </v-tab>
                  <v-tab-item>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="zoneModel.OffsetX"
                          type="number"
                          label="Offset X"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="zoneModel.OffsetY"
                          type="number"
                          label="Offset Y"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="zoneModel.CameraOffsetX"
                          type="number"
                          label="Camera Offset X"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="zoneModel.CameraOffsetY"
                          type="number"
                          label="Camera Offset Y"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="zoneModel.CameraOffsetZ"
                          type="number"
                          label="Camera Offset Z"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="zoneModel.CameraAngleXy"
                          type="number"
                          label="Camera Angle XY"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="zoneModel.CameraAngleYz"
                          type="number"
                          label="Camera Angle YZ"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                </v-tabs>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="secondary white--text" text @click="cancelZoneBatchCreation"
            >Cancel</v-btn
          >
          <v-btn color="secondary white--text" text @click="generateZones"
            >Generate</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

const computedFromYard = mapState("yard", {
  dialog: (state) => state.showZoneBatchEdition,
  zoneModel: (state) => state.editingZoneModel,
  yards: (state) => state.yards,
  areas: (state) => state.areas,
  sections: (state) => state.sections,
});

const computedFromZoneCreationBatch = mapState('zoneBatch',{
    getYard: (state) => state.yard,
    getArea: (state) => state.area,
    getSection: (state) => state.section,
    getLayer: (state) => state.layer,
    getRows: (state) => state.rows,
    getColumns: (state) => state.columns,
    getIdZonePattern: (state) => state.idZonePattern,
    getZonePattern: (state) => state.zonePattern,
    getWidth: (state) => state.width,
    getLength: (state) => state.length,
    getHeight: (state) => state.height,
    getInitialRow: (state) => state.initialRow,
    getInitialColumn: (state) => state.initialColumn,
    getInitialXCoord: (state) => state.initialXCoord,
    getInitialYCoord: (state) => state.initialYCoord,
    getInitialZCoord: (state) => state.initialZCoord,
    getRowGap: (state) => state.rowGap,
    getColumnGap: (state) => state.columnGap    
});

const methodsFromYard = mapActions("yard", ["cancelZoneBatchCreation"]);
const methodsFromZoneCreationBatch = mapActions("zoneBatch", [
    "setYard", 
    "setArea",
    "setSection",
    "setLayer",
    "setRows",
    "setColumns",
    "setIdZonePattern",
    "setZonePattern",
    "setInitialRow",
    "setInitialColumn",
    "setWidth",
    "setLength",
    "setHeight",
    "setInitialXCoord",
    "setInitialYCoord",
    "setInitialZCoord",
    "setRowGap",
    "setColumnGap",
    "generateZones",
    ]);

export default {
  data() {
    return {
    };
  },
  computed: Object.assign({
      yard:{
          get() { return this.getYard; },
          set(value) { this.setYard(value); }
      },
      area:{
          get() { return this.getArea; },
          set(value) { this.setArea(value); }
      },
      section:{
          get() { return this.getSection; },
          set(value) { this.setSection(value); }
      },
      layer:{
          get() { return this.getLayer; },
          set(value) { this.setLayer(value); }
      },
      rows:{
          get() { return this.getRows; },
          set(value) { this.setRows(value); }
      },
      columns:{
          get() { return this.getColumns; },
          set(value) { this.setColumns(value); }
      },
      idZonePattern:{
          get() { return this.getIdZonePattern; },
          set(value) { this.setIdZonePattern(value); }
      },
      zonePattern:{
          get() { return this.getZonePattern; },
          set(value) { this.setZonePattern(value); }
      },
      width:{
          get() { return this.getWidth; },
          set(value) { this.setWidth(value); }
      },
      length:{
          get() { return this.getLength; },
          set(value) { this.setLength(value); }
      },
      height:{
          get() { return this.getHeight; },
          set(value) { this.setHeight(value); }
      },
      initialRow:{
          get() { return this.getInitialRow; },
          set(value) { this.setInitialRow(value); }
      },
      initialColumn:{
          get() { return this.getInitialColumn; },
          set(value) { this.setInitialColumn(value); }
      },
      initialXCoord:{
          get() { return this.getInitialXCoord; },
          set(value) { this.setInitialXCoord(value); }
      },
      initialYCoord:{
          get() { return this.getInitialYCoord; },
          set(value) { this.setInitialYCoord(value); }
      },
      initialZCoord:{
          get() { return this.getInitialZCoord; },
          set(value) { this.setInitialZCoord(value); }
      },
      rowGap:{
          get() { return this.getRowGap; },
          set(value) { this.setRowGap(value); }
      },
      columnGap:{
          get() { return this.getColumnGap; },
          set(value) { this.setColumnGap(value); }
      },
  }, computedFromYard, computedFromZoneCreationBatch),
  methods: Object.assign({}, methodsFromYard, methodsFromZoneCreationBatch),
};
</script>

<style>
</style>