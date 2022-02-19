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
        <v-select
          v-model="select"
          :hint="`${select.item}`"
          :items="items"
          item-text="state"
          label="Select"
          persistent-hint
          return-object
          single-line
        ></v-select>
      </v-col>
    </v-row>
  </v-container>
</template> 

<script>
export default {
  props: ["title1", "title2", "title3", "title4", "title5"],
  data() {
    return {
      // labbel por default
      select: { state: "Good", item: "Looks good" },
      items: [
        { state: "Good", item: "Looks good" },
        { state: "Bad", item: "Looks Bad" },
        { state: "Not sure", item: "Not sure condition" },
      ],
    };
  },
};
</script>