<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="1000px">
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Yard</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-row>
              <v-col cols="2">
                <v-text-field
                  label="Id"
                  v-model="yard.IdZone"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  label="Name"
                  v-model="yard.Zone"
                  dense
                ></v-text-field>
              </v-col>
              <v-col cols="4">
                <v-select
                  v-model="yard.YardType"
                  :items="yardTypes"
                  color="primary"
                  item-text="description"
                  item-value="id"
                  label="Yard Type"
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Description"
                  v-model="yard.Description"
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
                            v-model="yard.ColorBackground"
                            mode="hexa"
                            class="ma-2"
                            hide-canvas
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
                            v-model="yard.ColorForeground"
                            mode="hexa"
                            class="ma-2"
                            hide-canvas
                          ></v-color-picker>
                        </div>
                      </v-col>
                      <v-col cols="4">
                        <div class="mt-5 text-left">
                          <label class="ml-7 subtitle-1">Frame Color</label>
                          <v-color-picker
                            name="color-background"
                            v-model="yard.ColorFrame"
                            mode="hexa"
                            class="ma-2"
                            hide-canvas
                          ></v-color-picker>
                        </div>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="2">
                        <v-text-field
                          v-model="yard.PosXMin"
                          type="number"
                          label="Pos X Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="yard.PosXMax"
                          type="number"
                          label="Pos X Max"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="yard.PosYMin"
                          type="number"
                          label="Pos Y Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="yard.PosYMax"
                          type="number"
                          label="Pos Y Max"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="yard.PosZMin"
                          type="number"
                          label="Pos Z Min"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="2">
                        <v-text-field
                          v-model="yard.PosZMax"
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
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="yard.OffsetX"
                          type="number"
                          label="Offset X"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="yard.OffsetY"
                          type="number"
                          label="Offset Y"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="4">
                        <v-text-field
                          v-model="yard.CameraOffsetX"
                          type="number"
                          label="Camera Offset X"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="yard.CameraOffsetY"
                          type="number"
                          label="Camera Offset Y"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="4">
                        <v-text-field
                          v-model="yard.CameraOffsetZ"
                          type="number"
                          label="Camera Offset Z"
                          dense
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <v-row>
                      <v-col cols="6">
                        <v-text-field
                          v-model="yard.CameraAngleXy"
                          type="number"
                          label="Camera Angle XY"
                          dense
                        ></v-text-field>
                      </v-col>
                      <v-col cols="6">
                        <v-text-field
                          v-model="yard.CameraAngleYz"
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
          <v-btn color="secondary white--text" text @click="cancelYardEdition"
            >Cancel</v-btn
          >
          <v-btn color="secondary white--text" text @click="saveYard"
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
  dialog: (state) => state.showYardEdition,
  yard: (state) => state.editingYard,
});

const methods = mapActions("yard", ["cancelYardEdition", "saveYard"]);

export default {
  data() {
    return {
      yardTypes: [
        { id: "S", description: "Slab" },
        { id: "P", description: "Plate" },
        { id: "C", description: "Coil" },
      ],
    };
  },
  computed,
  methods,
};
</script>

<style>
</style>