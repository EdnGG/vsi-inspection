<template>
  <v-card
    elevation="9"
    class="mx-auto ma-6 card-container"
    max-width="400"
  >
    <v-img
      class="white--text align-end"
      height="200px"
      :src="defaultImage"
    >
      <v-card-title>Valve Solutions Inc.</v-card-title>
    </v-img>

    <v-card-subtitle class="pb-0">
      {{id}}
    </v-card-subtitle>

    <v-card-text class="text--primary">
      <div>{{technicalName}} </div>

      <div>{{inspection}}</div>
    </v-card-text>

    <v-card-actions>
      <v-btn
        color="orange"
        text
      >
        See more
      </v-btn>

      <v-btn
        color="orange"
        text
      >
        Download PDF
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["id", "technicalName", "date", "inspection"],
  data() {
    return {
      defaultImage: "https://lenguajejs.com/javascript/logo.svg",
      title: "Inspectioon",
    };
  },
  methods: {
    ...mapActions('inspection',["getInspection"]),
  },
};
</script>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  margin: auto;
  margin-top: 20px;
  margin-bottom: 20px;
  padding: 20px;

  width: 100%;
  height: 100%;
}
</style>
