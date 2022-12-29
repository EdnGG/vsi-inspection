<template>
  <v-row align="center">
    <v-col cols="6">
      <v-subheader>
        {{ title }}
      </v-subheader>
    </v-col>
    <v-col cols="6">
      <!-- capturar selec.state -->
      <v-autocomplete
        v-model="computedState" 
        :value="value"
        :items="items.map(item => item)"
        filled
        multiple
        rounded
        shaped
        label="Actuator Details"
      ></v-autocomplete>
      <!-- item-text="state"
      persistent-hint
      item-value="item"
      single-line
      :hint="computedState ? computedState.value : null" -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    value: {
      type: String,
      default: null,
    },
  },
  data: () => ({
    items: [
      'All Good',
      'Not enought lock tide',
      'Not tide enought',
      'Added more grease on gears',
      'Wrong sticker or missed sticker',
      'Screw damaged',
      'Screw missing',
      'Thread damaged',
      'Dome damaged',
      'Indicator damaged',
      'Control pack damaged',
      'Control pack missing',
      'Control needs to recalibrate',
      'Push button damaged',
      'Push button damaged',
    ],
  }),
  model: {
    event: 'change',
  },
  computed: {
    computedState: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('change', value);
      },
    },
  },
};
</script>

<style>
</style>