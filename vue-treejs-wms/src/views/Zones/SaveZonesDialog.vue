<template>
  <v-row justify="start">
    <v-dialog v-model="dialog" persistent scrollable max-width="500px">
      <v-card>
        <v-toolbar class="primary" dark>
          <v-toolbar-title>Save Zones</v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="mt-5">
          <v-container class="text-left">
            <v-row>
                <v-col cols="12">
                    <h3>Zones To Be Saved</h3>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                    <div>{{zones}}</div>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                <v-text-field
                  label="Service Url"
                  v-model="serviceUrl"
                  dense
                ></v-text-field>
                </v-col>
            </v-row>
            <v-row>
                <v-col cols="12">
                <h3>Result</h3>
                </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div class="result-pre">{{ message }}</div>
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
            @click="showDialog(false)"
            >Cancel</v-btn
          >
          <v-btn
            color="secondary white--text"
            text
            @click="save()"
            >Save</v-btn
          >
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  data() {
    return { };
  },
  computed: {
      dialog: (state) => state.$store.state.importExport.showSaveZonesDialog,
      url: (state) => state.$store.state.importExport.serviceUrl,
      zones: (state) => state.$store.state.importExport.selectedZonesToSave.map(m => m.Zone).join(', '),
      message: (state) => state.$store.state.importExport.saveZonesResponse,   
      serviceUrl: {
        get() {
          return this.url;
        },
        set(value) {
          this.setUrl(value);
        },
      },   
  },
  methods: {
    showDialog: function (value) { this.$store.dispatch("importExport/showSaveZonesDialog", value); },
    save: function () { this.$store.dispatch("importExport/exportZones"); },
    setUrl: function(value){ this.$store.dispatch("importExport/setServiceUrl", value); }
  },
};
</script>

<style>
.result-pre {
  white-space: pre-wrap;
  word-wrap: break-word;
  font-family: inherit;
  text-align: justify;
}
</style>