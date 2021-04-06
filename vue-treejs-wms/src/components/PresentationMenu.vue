<template>
  <div class="presentation-menu-class">
    <v-navigation-drawer
      absolute
      temporary
      right
      v-model="drawer"
    >
      <template v-slot:prepend>
        <v-list-item two-line>
          <v-list-item-avatar>
            <img src="https://randomuser.me/api/portraits/women/81.jpg">
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>Jane Smith</v-list-item-title>
            <v-list-item-subtitle>Logged In</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </template>

      <v-divider></v-divider>

      <v-list dense>
        <v-list-item>
          <v-list-item-content>
            <v-select
              :items="zoneTypes"
              v-model="location"
              item-text="name"
              item-value="id"
              label="Location"
              dense
            ></v-select>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-select
              :items="subLocations"
              v-model="subLocation"
              item-text="Zone"
              item-value="IdZone"
              label="Sub-Location"
              dense
            ></v-select>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const computedFromMenu = mapState("menu", {
  showMenu: (state) => state.showMenu,
  selLocation: (state) => state.location,
  subLocations: (state) => state.subLocations,
  selSubLocation: (state) => state.subLocation
});
const computedFromYard = mapState("yard", {
  zoneTypes: (state) => state.zoneTypes
});

const menuMethods = mapActions("menu", ["show", "setLocation", "setSubLocation", "focusSubLocation"]);
const yardMethods = mapActions("yard", []);

export default {
  computed: Object.assign({ 
    drawer:{
      get(){ return this.showMenu;},
      set(value){ this.show(value);}
    },
    location:{
      get(){ return this.selLocation; },
      set(value){ this.setLocation(value); }
    },
    subLocation:{
      get(){ this.selSubLocation; },
      set(value) { 
        this.setSubLocation(value); 
        this.focusSubLocation(value);
      }
    }
  }, computedFromMenu, computedFromYard),
  methods: Object.assign({}, menuMethods, yardMethods),
  setup() {},
  data() {
    return {

    };
  },
};
</script>

<style scoped>
.presentation-menu-class{
  height: 600px;
  position: fixed;
  right: 50px;
  top: 100px;
  width: 250px;
}
</style>
