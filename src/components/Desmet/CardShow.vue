<template>
  <!-- <div> -->
    <!-- <v-col class="pb-5">
      <v-row class="d-flex justify-space-around"> -->
      <v-card-text class="text-subtitle-2">
        <h2 class="mt2">
          Assembly: {{ item.items }} Quantity: {{ item.quantity }}
        </h2>
      </v-card-text>
      <!-- </v-row>
    </v-col> -->
  <!-- </div> -->
</template>

<script>
export default {
  name: "CardShow",
  props: ["item"],
  data() {
    return {};
  },
};
</script>
