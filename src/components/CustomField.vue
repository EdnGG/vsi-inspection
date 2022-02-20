<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
        {{ title1 }} {{title2}} {{title3}} {{title4}} {{title5}}
        <!-- <p>{{items}}</p> -->
        </v-subheader>
      </v-col>

      <v-col cols="6">
        <!-- capturar selec.state -->
        <v-select
          v-model="select"
          :hint="`${select.item}`"
          :items="items"
          item-text="state"
          persistent-hint
          return-object
          single-line
          @change="handler"
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
export default {
  props: ["title1", "title2", "title3", "title4", "title5", "setState"],
  data() {
    return {
      // labbel por default
      select: { state: "", item: "Select one" },
      items: [
        { state: "Good", item: "Looks good" },
        { state: "Bad", item: "Looks Bad" },
        { state: "Not sure", item: "Not sure condition" },
      ],
    };
  },
  computed: {
    // handler() {
    //   console.log(`value: ${this.select.state}`);
    //   return this.$emit("accion", this.select.state);
    // },
  },
  methods: {
    handler() {
      console.log(`value: ${this.select.state}`);
      this.$emit("accion", this.select.state);
      // this.select.state = "";
      // this.select.item = "Select one";
    },
  },
};
</script>