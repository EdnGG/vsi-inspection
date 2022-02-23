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
          v-model="selectCustom"
          :hint="`${selectCustom.item}`"
          :items="itemsCustom"
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
        <p>{{itemsCustom}}</p>
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
    "selectCustom",
    "itemsCustom",
  ],
  data() {
    return {
      // items2: this.itemsCustom,
      // label por default
      // select: { state: "", item: "Select one" },
      // items: [
      //   { state: "Good", item: "Looks good" },
      //   { state: "Bad", item: "Looks Bad" },
      //   { state: "Not sure", item: "Not sure condition" },
      // ],
    };
  },
  computed: {
    select2() {
      return this.select;
    },
    items2() {
      return this.items;
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