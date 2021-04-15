<template>
  <v-row>
    <v-col cols="4">
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
          <v-expansion-panel-header>AREAS</v-expansion-panel-header>
          <v-expansion-panel-content>
            <areas />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>SECTIONS</v-expansion-panel-header>
          <v-expansion-panel-content>
            <sections />
          </v-expansion-panel-content>
        </v-expansion-panel>
        <v-expansion-panel>
          <v-expansion-panel-header>ZONES</v-expansion-panel-header>
          <v-expansion-panel-content></v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-col>
    <v-col cols="8">
      <yard-control />
    </v-col>
  </v-row>
</template>

<script>
import YardControl from "../components/YardControl.vue";
import Areas from './Areas/Areas.vue';
import Sections from './Sections/Sections.vue';
import Yards from "./Yard/Yards.vue";
export default {
  components: { YardControl, Yards, Areas, Sections },
};
</script>

<style>
</style>