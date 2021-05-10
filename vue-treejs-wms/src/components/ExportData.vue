<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent scrollable max-width="400px">
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Export Data</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-select
                  v-model="selected"
                  :items="exportTypes"
                  color="primary"
                  label="Export Type"
                  dense
                ></v-select>
              </v-col>
            </v-row>
            <v-row v-if="isExportingFromService">
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
            @click="showExportDataDialog(false)"
            >Cancel</v-btn
          >
          <v-btn
            color="secondary white--text"
            text
            @click="exportData(exportType)"
            >Export</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";

const computedFromImportExport = mapState("importExport", {
  dialog: (state) => state.showExportDialog,
  url: (state) => state.serviceUrl,
});

const methods = mapActions("importExport", [
  "showExportDataDialog",
  "exportData",
  "setServiceUrl",
]);

export default {
  data() {
    return {
      exportType: "",
      isExportingFromService: false,
      exportTypes: ["json", "script insert", "script update", "using service"],
    };
  },
  computed: Object.assign(
    {
      selected: {
        get() {
          return this.exportType;
        },
        set(value) {
          this.exportType = value;
          if (this.exportType == "using service") {
            this.isExportingFromService = true;
          } else {
            this.isExportingFromService = false;
          }
        },
      },
      serviceUrl: {
        get() {
          return this.url;
        },
        set(value) {
          this.setServiceUrl(value);
        },
      },
    },
    computedFromImportExport
  ),
  methods,
};
</script>

<style>
</style>