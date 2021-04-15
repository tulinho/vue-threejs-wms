<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="800px">
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Import Data</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  label="Service Url"
                  v-model="serviceUrl"
                  dense
                ></v-text-field>
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
            @click="showImportDataDialog(false)"
            >Cancel</v-btn
          >
          <v-btn color="secondary white--text" text @click="loadFromService"
            >Import</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

const computedFromImportExport = mapState("importExport", {
  dialog: (state) => state.showImportDialog,
  url: (state) => state.serviceUrl,
});

const methods = mapActions("importExport", [
  "showImportDataDialog",
  "setServiceUrl",
  "loadFromService",
]);

export default {
  data() {
    return {};
  },
  computed: Object.assign({
    serviceUrl: {
      get() {
        return this.url;
      },
      set(value) {
        this.setServiceUrl(value);
      },
    }
  }, computedFromImportExport),
  methods,
};
</script>

<style>
</style>