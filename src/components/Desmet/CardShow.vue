<template>
  <v-card-text class="text-subtitle-2">
    <h2 class="mt2">
      Assembly: {{ item.items }} Quantity: {{ item.quantity }}
    </h2>
  </v-card-text>
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
