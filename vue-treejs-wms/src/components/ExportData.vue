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
                  v-model="exportType"
                  :items="exportTypes"
                  color="primary"
                  label="Export Type"
                  dense
                ></v-select>
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
          <v-btn color="secondary white--text" text @click="exportData(exportType)"
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
});

const methods = mapActions('importExport', ['showExportDataDialog', 'exportData']);

export default {
  data() {
    return {
      exportType: "",
      exportTypes: ["json", "script insert", "script update"],
    };
  },
  computed: Object.assign({}, computedFromImportExport),
  methods,
};
</script>

<style>
</style>