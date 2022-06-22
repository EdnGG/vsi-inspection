<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="itemsPerPage"
              class="my-4"
              :length="calculatePages"
              circle
            ></v-pagination>
          </v-container>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Index",
  props: ["totalInspections", "itemsPerPage"],
  data() {
    return {
      // page: itemsPerPage,
    };
  },
  computed: {
    calculatePages() {
      return Math.ceil(this.totalInspections / this.itemsPerPage);
    },
  },
};
</script>