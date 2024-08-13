<template>
  <v-row align="center">
    <v-col cols="12">
      <v-autocomplete
        v-model="computedState"
        :value="value"
        :items="items.map((item) => item)"
        single-line
        persistent-hint
        label="Actuator"></v-autocomplete>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CoreCustomSelectActuator',
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
      'N/A',
      '1005-X',
      '1005-XL',
      '1005-S-XL',
      '1005-XL-24VAC',
      '1005-S-XL-24VAC',
      '1005-SX-LA-24VAC',
      '1005-SX',
      '1010-X',
      '1010-SX',
      '1010-X-24VAC',
      '1010-X-SW',
      '1005-X-SW',
      '1010-SX-SW',
      '1005-SX-SW',
      '1010-SX-LA-24VAC',
      '1020-X',
      '1020-SX',
      '1040-X',
      '1040-SX',
      '1060-X',
      '1060-SX',
      '1100-X',
      '1100-SX',
      '1160-X',
      '1160-SX',
      '1005-X-24VAC',
      '1005-SX-24VAC',
      '1010-X-24VAC',
      '1010-SX-24VAC',
      '1020-X-24VAC',
      '1020-SX-24VAC',
      '1040-X-24VAC',
      '1040-SX-24VAC',
      '1060-X-24VAC',
      '1060-SX-24VAC',
      '1100-X-24VAC',
      '1100-SX-24VAC',
      '1160-X-24VAC',
      '1160-SX-24VAC',
      '1250-X-24VAC',
      '1250-SX-24VAC',
      '1250-X',
      '1250-SX',
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

<style></style>
