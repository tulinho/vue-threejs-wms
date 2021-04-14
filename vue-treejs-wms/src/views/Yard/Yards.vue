<template>
  <v-row class="mt-2">
    <v-col cols="12">
      <v-row justify="end">
        <v-col cols="1" class="text--left">
          <v-btn icon color="primary" @click="addNewYard">
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
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            :label="searchLabel"
            single-line
            hide-details
            dense
          ></v-text-field>
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
      <create-edit-yard />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreateEditYard from "./CreateEditYard.vue";

const computed = mapState('yard', {
  items: (state) => state.yards,
  selectedYard: (state) => state.selectedYard
});

const methods = mapActions('yard', ['addNewYard', 'selectYard', 'excludeYards'])

export default {
  components: { CreateEditYard },
  data() {
    return {
      search: '',
      title: 'Yards',
      searchLabel: "Search",
      headers: [
        { text: 'Id Yard', align: 'start', width: 50, value: 'IdZone' },
        { text: 'Yard', align: 'start', value: 'Zone' },
      ],
      selected: []
    };
  },
  computed,
  methods: Object.assign({
    select(value){
        this.selectYard(value);       
    },
    exclude(){
      this.excludeYards(this.selected);
    }
  }, methods)
};
</script>

<style>
</style>