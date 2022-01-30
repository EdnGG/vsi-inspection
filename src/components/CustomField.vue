<template>
  <v-container fluid>
    <v-row align="center">
      <v-col cols="6">
        <v-subheader>
          Custom
        </v-subheader>
      </v-col>

      <v-col cols="6">
        <v-select
          v-model="select"
          :hint="`${select.state}, ${select.item}`"
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
    data () {
      return {
        select: { state: 'Good', item: 'Good Actuator' },
        items: [
          { state: 'Good', item: 'Good Actuator' },
          { state: 'Bad', item: 'Bad Actuator' },
          { state: 'Not sure', item: 'Not sure condition' },
        ],
      }
    },
  }
</script>