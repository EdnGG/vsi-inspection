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
        
        rounded
        shaped
        label="Actuator"
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
      '1005X',
      '1005XL',
      '1005S-XLA-24VAC',
      '1005X-S',
      '1010X',
      '1010X-S',
      '1010X-24VAC',
      '1010X-SW',
      '1010S-XLA-24VAC',
      '1020X',
      '1020X-S',
      '1040X',
      '1040X-S',
      '1060X',
      '1060X-S',
      '1100X',
      '1100X-S',
      '1005X-24VAC',
      '1005X-S-24VAC',
      '1010X-24VAC',
      '1010X-S-24VAC',
      '1020X-24VAC',
      '1020XS-24VAC',
      '1040X-24VAC',
      '1040X-S-24VAC',
      '1060X-24VAC',
      '1060X',
      '1060X-S-24VAC',
      '1100X-24VAC',
      '1100X-S-24VAC',
      '1160X-24VAC',
      '1160X-S-24VAC',
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