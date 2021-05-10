<template>
  <v-row justify="start">
    <v-dialog v-model="dialog" persistent scrollable max-width="500px">
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Yard Structure Validation</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-row>
              <v-col cols="12">
                <div class="validation-pre">{{ message }}</div>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="secondary white--text"
            text
            @click="setShowDialog(false)"
            >OK</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

const computedFromImportExport = mapState("validation", {
  dialog: (state) => state.showDialog,
  message: (state) => state.message,
});

const methods = mapActions("validation", ["validate", "setShowDialog"]);

export default {
  data() {
    return {
      //dialog: this.$store.state['validation/showDialog']
    };
  },
  computed: Object.assign({}, computedFromImportExport),
  methods,
};
</script>

<style>
.validation-pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
  text-align: justify;
}
</style>