<template>
  <v-menu bottom left>
    <template v-slot:activator="{ on, attrs }">
      <v-btn icon v-bind="attrs" v-on="on">
        <v-icon>more_vert</v-icon>
      </v-btn>
    </template>

    <v-list>
      <v-list-item @click="showValidations">
        <v-list-item-title>Validate Model</v-list-item-title>
      </v-list-item>
      <v-list-item @click="showImportDataDialog(true)">
        <v-list-item-title>Import Yard Data</v-list-item-title>
      </v-list-item>
      <v-list-item @click="showExportDataDialog(true)">
        <v-list-item-title>Export Yard Data</v-list-item-title>
      </v-list-item>
    </v-list>
  </v-menu>
</template>

<script>
import { mapActions } from "vuex";

const methods = mapActions("importExport", ["showImportDataDialog", "showExportDataDialog"]);

export default {
  setup() {},
  methods: Object.assign({
    showValidations(){
      this.$store.dispatch('validation/setShowDialog', true);
    }
  },methods),
};
</script>

<style>
</style>