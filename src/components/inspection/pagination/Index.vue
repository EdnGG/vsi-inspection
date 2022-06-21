<template>
  <div class="text-center">
    <v-container>
      <v-row justify="center">
        <v-col cols="8">
          <v-container class="max-width">
            <v-pagination
              v-model="page"
              class="my-4"
              :length="15"
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
  props: {
    // page: {
    //   type: Number,
    //   default: 1,
    // },
  },
  data() {
    return {
      page: 1,
    };
  },
};
</script>