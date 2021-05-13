<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="1000px">
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Zone</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-row>
              <v-col cols="2">
                <v-select
                  v-model="zone.Yard"
                  :items="yards"
                  color="primary"
                  item-text="Zone"
                  item-value="Zone"
                  label="Yard"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="zone.Area"
                  :items="areas"
                  color="primary"
                  item-text="Zone"
                  item-value="Zone"
                  label="Area"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-select
                  v-model="zone.Section"
                  :items="sections"
                  color="primary"
                  item-text="Zone"
                  item-value="Zone"
                  label="Section"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="Id"
                  v-model="zone.IdZone"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-text-field
                  label="Name"
                  v-model="zone.Zone"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="10">
                <v-text-field
                  label="Description"
                  v-model="zone.Description"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="2">
                <v-select
                  :items="zoneTypes"
                  v-model="zone.ZoneType"
                  item-text="name"
                  item-value="id"
                  color="primary"
                  label="Zone Type"
                  dense
                ></v-select>
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
                            v-model="zone.ColorBackground"
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
                            v-model="zone.ColorForeground"
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
                            v-model="zone.ColorFrame"
                            mode="hexa"
                            class="ma-2"
                          ></v-color-picker>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">
                        <v-text-field
                          v-model="zone.PosXMin"
                          type="number"
                          label="Pos X Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="zone.PosXMax"
                          type="number"
                          label="Pos X Max"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="zone.PosYMin"
                          type="number"
                          label="Pos Y Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="zone.PosYMax"
                          type="number"
                          label="Pos Y Max"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="zone.PosZMin"
                          type="number"
                          label="Pos Z Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="zone.PosZMax"
                          type="number"
                          label="Pos Z Max"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-tab-item>
                  <v-tab>
                    <v-icon left>settings_input_component</v-icon>Advanced
                  </v-tab>
                  <v-tab-item>
                    <v-row class="mt-5">
                      <v-col cols="3">
                        <v-select
                          v-model="zone.XAlignment"
                          :items="xAlignments"
                          color="primary"
                          item-text="name"
                          item-value="id"
                          label="Alignment in x-direction"
                          dense
                        ></v-select>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="zone.YAlignment"
                          :items="yAlignments"
                          color="primary"
                          item-text="name"
                          item-value="id"
                          label="Alignment in y-direction"
                          dense
                        ></v-select>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="zone.RotateAngle"
                          :items="rotateAngles"
                          color="primary"
                          item-text="name"
                          item-value="id"
                          label="Rotate Angles"
                          dense
                        ></v-select>
                      </v-col>
                      <v-col cols="3">
                        <v-select
                          v-model="zone.TiltAngle"
                          :items="tiltAngles"
                          color="primary"
                          item-text="name"
                          item-value="id"
                          label="Tilt Angles"
                          dense
                        ></v-select>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="3">
                        <v-text-field
                          v-model="zone.CameraOffsetX"
                          type="number"
                          label="Camera Offset X"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="zone.CameraOffsetY"
                          type="number"
                          label="Camera Offset Y"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="zone.CameraOffsetZ"
                          type="number"
                          label="Camera Offset Z"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="3">
                        <v-text-field
                          v-model="zone.PieceCountMax"
                          type="number"
                          label="Piece Count Max"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="zone.CameraAngleXy"
                          type="number"
                          label="Camera Angle XY"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="zone.CameraAngleYz"
                          type="number"
                          label="Camera Angle YZ"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="zone.MaxStress"
                          type="number"
                          label="Maximum Stress"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="zone.MaxHeight"
                          type="number"
                          label="Maximum Height"
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
          <v-btn color="secondary white--text" text @click="cancelZoneEdition"
            >Cancel</v-btn
          >
          <v-btn color="secondary white--text" text @click="saveZone"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

const computed = mapState("yard", {
  dialog: (state) => state.showZoneEdition,
  zone: (state) => state.editingZone,
  yards: (state) => state.yards,
  areas: (state) => state.areas,
  sections: (state) => state.sections,
  zoneTypes: (state) => state.zoneTypes,
  xAlignments: (state) => state.xAlignmentTypes,
  yAlignments: (state) => state.yAlignmentTypes,
  rotateAngles: (state) => state.rotateAngleTypes,
  tiltAngles: (state) => state.tiltAngleTypes,
});

const methods = mapActions("yard", ["cancelZoneEdition", "saveZone"]);

export default {
  data() {
    return {};
  },
  computed,
  methods,
};
</script>

<style>
</style>