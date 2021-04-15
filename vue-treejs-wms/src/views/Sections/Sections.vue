<template>
  <v-row class="mt-2">
    <v-col cols="12">
      <v-row justify="end">
        <v-col cols="1" class="text--left">
          <v-btn icon color="primary" @click="addNewSection">
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
      <create-edit-section />
    </v-col>
  </v-row>
</template>

<script>
import { mapState, mapActions } from "vuex";
import CreateEditSection from './CreateEditSection.vue';

const computed = mapState('yard', {
  items: (state) => state.sections
});

const methods = mapActions('yard', ['addNewSection', 'selectSection', 'excludeSections'])

export default {
  components: { CreateEditSection },
  data() {
    return {
      search: '',
      title: 'Section',
      searchLabel: "Search",
      headers: [
        { text: 'Id Section', align: 'start', width: 100, value: 'IdZone' },
        { text: 'Yard', align: 'start', value: 'Yard' },
        { text: 'Area', align: 'start', value: 'Area' },
        { text: 'Section', align: 'start', value: 'Zone' },
      ],
      selected: []
    };
  },
  computed,
  methods: Object.assign({
    select(value){
        this.selectSection(value);       
    },
    exclude(){
      this.excludeSections(this.selected);
    }
  }, methods)
};
</script>

<style>
</style>