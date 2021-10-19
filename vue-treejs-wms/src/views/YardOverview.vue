<template>
  <v-row>
    <v-col cols="4" class="mt-1 sidebar-menu">
      <v-expansion-panels accordion>
        <v-expansion-panel>
          <v-expansion-panel-header color="primary white--text">
            <template v-slot:actions>
              <v-icon color="white"> $expand </v-icon>
            </template>
            <div class="white--text">YARDS</div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <yards />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="primary white--text">
            <template v-slot:actions>
              <v-icon color="white"> $expand </v-icon>
            </template>
            <div class="white--text">AREAS</div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <areas />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="primary white--text">
            <template v-slot:actions>
              <v-icon color="white"> $expand </v-icon>
            </template>
            <div class="white--text">SECTIONS</div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <sections />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header color="primary white--text">
            <template v-slot:actions>
              <v-icon color="white"> $expand </v-icon>
            </template>
            <div class="white--text">ZONES</div>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <zones />
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <create-edit-zone />
    </v-col>
    <v-col cols="8">
      <yard-control />
    </v-col>
  </v-row>
</template>

<script>
import YardControl from "../components/YardControl.vue";
import Areas from "./Areas/Areas.vue";
import Sections from "./Sections/Sections.vue";
import Yards from "./Yard/Yards.vue";
import Zones from "./Zones/Zones.vue";
import CreateEditZone from "./Zones/CreateEditZone.vue";
export default {
  components: { YardControl, Yards, Areas, Sections, Zones, CreateEditZone },
};
</script>

<style>
.sidebar-menu {
  overflow-y: auto;
  max-height: calc(100vh - 50px);
}
.sidebar-menu::-webkit-scrollbar-track {
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  border-radius: 8px;
  background-color: #f5f5f5;
}

.sidebar-menu::-webkit-scrollbar {
  width: 8px;
  background-color: #f5f5f5;
}

.sidebar-menu::-webkit-scrollbar-thumb {
  border-radius: 8px;
  -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: #b3babe;
}
</style>