<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title class="headline"> Yard Management </v-toolbar-title>
      <v-spacer></v-spacer>
      <toolbar-menu />
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <import-data />
      <export-data />
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import ExportData from "./components/ExportData.vue";
import ImportData from "./components/ImportData.vue";
import ToolbarMenu from "./components/ToolbarMenu.vue";

const methods = mapActions("importExport", ["showImportDataDialog"]);

export default {
  components: { ImportData, ToolbarMenu, ExportData },
  setup() {},
  methods,
};
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>