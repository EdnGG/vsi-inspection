<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
        {{ title }} 
        </v-subheader>
      </v-col>
      <v-col cols="6">
        <!-- capturar selec.state --> 
        <v-select
          v-model="computedState"
          :value="value"
          :items="items"
          item-text="state"
          persistent-hint
          return-object
          single-line
          :hint="computedState ? computedState.value : null"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
export default {
  props: ["title", "value"],
  data() {
    return {
      items: [
        { state: "Good", item: "Looks good" },
        { state: "Bad", item: "Looks Bad" },
        { state: "Not sure", item: "Not sure condition" },
      ],
    };
  },
  model: {
    event: "change",
  },
  computed: {
    computedState: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit("change", value);
      },
    },
  },
  // methods: {
  //   // handler() {
  //   //   console.log(`value: ${this.select.state}`);
  //   //   this.$emit("accion", this.select.state);
  //   // },
  // },
};
</script>