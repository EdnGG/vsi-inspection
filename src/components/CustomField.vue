<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
         {{val1}} {{val2}} {{val3}} {{val4}} {{val5}}
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
    props: ['val1', 'val2', 'val3', 'val4', 'val5'],
    data () {
      return {
        select: { state: 'Good', item: 'Looks good' },
        items: [
          { state: 'Good', item: 'Looks good' },
          { state: 'Bad', item: 'Looks Bad' },
          { state: 'Not sure', item: 'Not sure condition' },
        ],
      }
    },
  }
</script>