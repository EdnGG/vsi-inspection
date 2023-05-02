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
        :items="items.map((item) => item)"
        filled
        multiple
        rounded
        shaped
        label="Actuator Details"></v-autocomplete>
      <!-- @input="$emit('input',$event)" -->
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CoreCustomSelectDetails',

  props: {
    title: {
      type: String,
      require: true,
    },
    // value: {
    //   type: Array,
    //   default: () => [],
    // },
    // value: {
    //   type: String,
    //   default: '',
    // },
  },
  data: () => ({
    // isMounted: false,
    // innerValue: [],
    value: [],
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
  // mounted() {
  //   this.isMounted = true;
  // },
  model: {
    event: 'change',
  },
  methods: {
    // updateValue(newValue) {
    //   if (this.isMounted) {
    //     this.$emit('input', newValue);
    //   }
    // },
  },
  watch: {
    // value: {
    //   immediate: true,
    //   handler(newVal) {
    //     this.innerValue = newVal;
    //   },
    // },
    // innerValue(newVal) {
    //   this.$emit('input', newVal);
    // },
  },
  computed: {
    computedState: {
      get() {
        return this.value;
      },
      set(value) {
        this.$emit('input', value);
        this.$emit('update-observaciones', value);
      },
    },
    // computedState: {
    //   },
    // get() {
    //   return this.value;
    // },
    // set(value) {
    //   this.$emit('input', value);
    // },
    // },
  },
};
</script>

<style></style>
