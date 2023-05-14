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
        '1005S-XLA-24VAC',
        '1005-XS',
        '1010-X',
        '1010-XS',
        '1010-X-24VAC',
        '1010-X-SW',
        '1010-SXLA-24VAC',
        '1020-X',
        '1020-XS',
        '1040-X',
        '1040-XS',
        '1060-X',
        '1060-XS',
        '1100-X',
        '1100-XS',
        '1005-X24VAC',
        '1005-XS-24VAC',
        '1010-X-24VAC',
        '1010-XS-24VAC',
        '1020-X-24VAC',
        '1020-XS-24VAC',
        '1040-X-24VAC',
        '1040-XS-24VAC',
        '1060-X-24VAC',
        '1060-X',
        '1060-XS-24VAC',
        '1100-X-24VAC',
        '1100-XS-24VAC',
        '1160-X-24VAC',
        '1160-XS-24VAC',
        '1250-X-24VAC',
        '1250-XS-24VAC',
        '1250-X',
        '1250-XS',
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
