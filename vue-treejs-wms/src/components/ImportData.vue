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
              <v-col cols="3">
                <v-select
                  :items="sources"
                  v-model="selected"
                  dense
                  label="Source"
                ></v-select>
              </v-col>
              <v-col cols="9">
                <v-file-input
                  v-if="isImportingFromFile"
                  label="File"
                  v-model="filePath"
                  dense
                ></v-file-input>
                <v-text-field
                  v-if="isImportingFromService"
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
          <v-btn color="secondary white--text" text v-if="isImportingFromService" @click="loadFromService"
            >Import</v-btn
          >
          <v-btn color="secondary white--text" text v-if="isImportingFromFile" @click="loadFromFile"
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
  file: (state) => state.file,
});

const methods = mapActions("importExport", [
  "showImportDataDialog",
  "setServiceUrl",
  "loadFromService",
  "setFile",
  "loadFromFile",
]);

export default {
  data() {
    return {
      selectedSource: "file",
      sources: ["file", "service"],
      isImportingFromFile: true,
      isImportingFromService: false,
    };
  },
  computed: Object.assign(
    {
      selected: {
        get() {
          return this.selectedSource;
        },
        set(value) {
          this.selectedSource = value;
          if (this.selectedSource == "file") {
            this.isImportingFromFile = true;
            this.isImportingFromService = false;
          } else {
            this.isImportingFromFile = false;
            this.isImportingFromService = true;
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
      filePath: {
        get() {
          return this.file;
        },
        set(value) {
          this.setFile(value);
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