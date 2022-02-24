<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
        {{ title1 }} {{title2}} {{title3}} {{title4}} {{title5}}
        
        </v-subheader>

      </v-col>

      <v-col cols="6">
        <!-- capturar selec.state --> 
        <v-select
          v-model="computedState"
          :hint="`${computedState.item}`"
          :items="items"
          item-text="state"
          persistent-hint
          return-object
          single-line
          @change="handler"
        ></v-select>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <p>Select items fron parent: {{computedState}}</p>
        <p>Items in child component: {{items}}</p>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
export default {
  props: [
    "title1",
    "title2",
    "title3",
    "title4",
    "title5",
    "selectState",
    // "selectCustom",
    // "itemsCustom",
  ],
  data() {
    return {
      // items2: this.itemsCustom,
      // label por default
      // select: { state: "", item: "Select one" },
      items: [
        { state: "Good", item: "Looks good" },
        { state: "Bad", item: "Looks Bad" },
        { state: "Not sure", item: "Not sure condition" },
      ],
    };
  },
  created() {},
  computed: {
    computedState: {
      get() {
        return this.selectState;
      },
      set(value) {
        this.$emit("update:selectState", value);
      },
    },
  },
  methods: {
    handler() {
      console.log(`value: ${this.select.state}`);
      this.$emit("accion", this.select.state);
    },
  },
};
</script>