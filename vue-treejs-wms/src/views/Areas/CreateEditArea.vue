<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="1000px">
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Area</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-row>
              <v-col cols="2">
                <v-select
                  v-model="area.Yard"
                  :items="yards"
                  color="primary"
                  item-text="Zone"
                  item-value="Zone"
                  label="Yard"
                  dense
                ></v-select>
              </v-col>
              <v-col cols="2">
                <v-text-field
                  label="Id"
                  v-model="area.IdZone"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="8">
                <v-text-field
                  label="Name"
                  v-model="area.Zone"
                  dense
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  v-model="area.Description"
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
                            v-model="area.ColorBackground"
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
                            v-model="area.ColorForeground"
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
                            v-model="area.ColorFrame"
                            mode="hexa"
                            class="ma-2"
                          ></v-color-picker>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">
                        <v-text-field
                          v-model="area.PosXMin"
                          type="number"
                          label="Pos X Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="area.PosXMax"
                          type="number"
                          label="Pos X Max"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="area.PosYMin"
                          type="number"
                          label="Pos Y Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="area.PosYMax"
                          type="number"
                          label="Pos Y Max"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="area.PosZMin"
                          type="number"
                          label="Pos Z Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="area.PosZMax"
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
                      <v-col cols="6">
                        <v-text-field
                          v-model="area.OffsetX"
                          type="number"
                          label="Offset X"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="area.OffsetY"
                          type="number"
                          label="Offset Y"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="area.CameraOffsetX"
                          type="number"
                          label="Camera Offset X"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="area.CameraOffsetY"
                          type="number"
                          label="Camera Offset Y"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="area.CameraOffsetZ"
                          type="number"
                          label="Camera Offset Z"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="area.CameraAngleXy"
                          type="number"
                          label="Camera Angle XY"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="area.CameraAngleYz"
                          type="number"
                          label="Camera Angle YZ"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="area.MaxStress"
                          type="number"
                          label="Maximum Stress"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="area.MaxHeight"
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
          <v-btn color="secondary white--text" text @click="cancelAreaEdition"
            >Cancel</v-btn
          >
          <v-btn color="secondary white--text" text @click="saveArea"
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
  dialog: (state) => state.showAreaEdition,
  area: (state) => state.editingArea,
  yards: (state) => state.yards
});

const methods = mapActions("yard", ["cancelAreaEdition", "saveArea"]);

export default {
  data() {
    return {
    };
  },
  computed,
  methods,
};
</script>

<style>
</style>