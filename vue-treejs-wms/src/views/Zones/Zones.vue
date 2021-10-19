<template>
  <v-row class="mt-2">
    <v-col cols="12">
      <v-row justify="end">
        <v-col cols="8">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="searchLabel"
            single-line
            hide-details
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="1" class="text--left">
          <v-btn icon color="primary" @click="exportZones">
            <v-icon dark> file_upload </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1" class="text--left">
          <v-btn icon color="primary" @click="addZonesByBatch">
            <v-icon dark> add_to_photos </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1" class="text--left">
          <v-btn icon color="primary" @click="addNewZone">
            <v-icon dark> add </v-icon>
          </v-btn>
        </v-col>
        <v-col cols="1" class="text--left">
          <v-btn icon color="red" @click="exclude">
            <v-icon dark> close </v-icon>
          </v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table
            :headers="headers"
            :items="items"
            :search="search"
            v-model="selected"
            @click:row="select"
            show-select
            item-key="IdZone"
          ></v-data-table>
        </v-col>
      </v-row>
      <create-zones-by-batch />
      <save-zones-dialog />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreateZonesByBatch from './CreateZonesByBatch.vue';
import SaveZonesDialog from './SaveZonesDialog.vue';

const computed = mapState('yard', {
  items: (state) => state.zones
});

const methods = mapActions('yard', ['addNewZone','addZonesByBatch', 'selectZone', 'excludeZones'])

export default {
  components: { CreateZonesByBatch, SaveZonesDialog},
  data() {
    return {    
      search: '',
      title: 'Section',
      searchLabel: "Search",
      headers: [
        { text: 'Id Zone', align: 'start', width: 100, value: 'IdZone' },
        { text: 'Yard', align: 'start', value: 'Yard' },
        { text: 'Area', align: 'start', value: 'Area' },
        { text: 'Section', align: 'start', value: 'Section' },
        { text: 'Zone', align: 'start', value: 'Zone' },
      ],
      selected: []
    };
  },
  computed,
  methods: Object.assign({
    select(value){
        this.selectZone(value);       
    },
    exclude(){
      this.excludeZones(this.selected);
    },
    exportZones(){
      this.$store.dispatch("importExport/selectZonesToBeSaved", this.selected);
      this.$store.dispatch("importExport/showSaveZonesDialog", true);
    }
  }, methods)
};
</script>

<style>
</style>