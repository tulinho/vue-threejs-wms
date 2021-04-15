<template>
  <v-app>
    <v-app-bar app dense>
      <v-toolbar-title class="headline"> Yard Management </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list>
          <v-list-item @click="showImportDataDialog(true)">
            <v-list-item-title>Import Yard Data</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
      <import-data/>
    </v-main>
  </v-app>
</template>

<script>
import { mapActions } from "vuex";
import ImportData from './components/ImportData.vue'

const methods = mapActions('importExport', ['showImportDataDialog'])

export default {
  components: { ImportData },
  setup() {
    
  },
  methods
}
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