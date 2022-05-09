<template>
  <v-card class="text-center my-6 mx-auto" max-width="500">
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

    <v-expand-transition> 
      <transition-group name="fade" tag="ul" mode="out-in">
        <!--  -->
        <template v-if="show"> 
          <CardShow v-for="(items, i) in pallet.items" :key="i" :item="items" />
        </template>
        <!--  -->
      </transition-group>
    </v-expand-transition>
  </v-card>
</template>

<script>
import CardShow from "./CardShow.vue";
export default {
  name: "Card",
  components: { CardShow },
  props: ["pallet", "temporalUrl", "index"],
  data() {
    return {
      show: false,
    };
  },
  methods: {
    showCard(index) {
      console.log("index: ", index);
      this.show = !this.show;
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

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
