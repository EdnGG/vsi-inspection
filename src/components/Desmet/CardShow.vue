<template>

  <v-expand-transition>
    <transition-group name="fade" tag="ul" mode="out-in">
      <v-card-text class="text-subtitle-2">
        <h2 class="mt2">
          Assembly: {{ item.items }} Quantity: {{ item.quantity }}
        </h2>
      </v-card-text>
    </transition-group>
  </v-expand-transition>


</template>

<script>
export default {
  name: "CardShow",
  props: ["item", "index"],
  data() {
    return {};
  },
  methods: {
    showCard(index) {
      console.log("index: ", index);
      // only show the card that is clicked but not the others  (the others are hidden)
    },
  },
};
</script>
