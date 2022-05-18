<template>
  <v-card class="my-6 mx-auto relative" max-width="350">
    <v-img
      class="text-center mx-auto"
      :src="temporalUrl"
      height="300px"
      width="300px"
    ></v-img>

    <v-container>
      <v-card-title class="justify-center">
        <h1>Pallet # {{ pallet.palletNumber }}</h1>
      </v-card-title>
    </v-container>

    <v-card-actions>
      <v-btn color="orange lighten-2" text> More </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon @click="showCard(index)">
        <v-icon>{{ show ? "mdi-chevron-up" : "mdi-chevron-down" }}</v-icon>
      </v-btn>
    </v-card-actions>

    <div v-show="show" v-for="(items, i) in pallet.items" :key="i">
      <!-- <v-expand-transition>
        <transition-group name="fade" tag="ul" mode="out-in"> -->
      <v-card-text class="text-subtitle-2">
        <h2 class="mt2">
          Assembly: {{ items.items }} Quantity: {{ items.quantity }}
        </h2>
      </v-card-text>
      <!-- </transition-group>
      </v-expand-transition> -->
    </div>
    <div>
      {{ index }}
    </div>
  </v-card>
</template>

<script>
export default {
  name: "Card",
  props: ["pallet", "temporalUrl", "index"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showCard(index) {
      if (this.index === index) {
        console.log("index: ", index);
        console.log("this.index: ", this.index);
        this.show = !this.show;
      }
      // console.log("index: ", index);
      // only show the card that is clicked but not the others  (the others are hidden)
      // only show me the transition group card that is clicked but not the others  (the others are hidden)
      // this.show = !this.show; // toggle the show property

      // this.show = !this.show;

      // this.show = !this.show;
      // this.$emit("showCard2", index);
      // this.$parent.$children.forEach((child) => {
      //   if (child.index !== index) {
      //     child.show = false;
      //   }
      // });
    },
  },
};
</script>

<style scoped>
.text-subtitle-2 {
  font-size: 1.2rem;
}

.relative {
  position: relative;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
