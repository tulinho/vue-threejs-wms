<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      scrollable
      max-width="600px"
      @click:outside="show(false)"
    >
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Presentation Menu</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-slider
                  v-model="zoom.value"
                  :max="max"
                  :min="min"
                  label="Zoom"
                  hide-details
                  class="align-center"
                >
                </v-slider>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="show(false)">Close</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

const computed = mapState("menu", {
  dialog: (state) => state.showMenu,
  zoom: (state) => state.zoom,
  min: (state) => state.zoomMin,
  max: (state) => state.zoomMax,
});
const methods = mapActions("menu", ["show"]);

export default {
  computed,
  methods,
  setup() {},
  data() {
    return {};
  },
};
</script>
