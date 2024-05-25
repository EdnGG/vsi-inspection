<template>
  <v-row align="center">
    <v-col cols="6">
      <v-subheader>
        {{ title }}
      </v-subheader>
    </v-col>
    <v-col cols="6">
      <!-- capturar selec.state -->
        <!-- :items="items.map((item) => item)" -->
      <v-autocomplete
        v-model="selectedValue"
        :items="items"
        item-text="item"
        item-value="item"
        persistent-hint
        single-line
        outlined 
        multiple
        rounded
        shaped
        label="Actuator Details"
        @input="updateValue"
      >
      </v-autocomplete>
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
    defaultValue: {
      type: String,
      default: 'All Good',
    },
    value: {
      type: Array,
      default: () => ['All Good'],
    },
  },
  data() {
    return {
      // isMounted: false,
      // innerValue: [],
      selectedValue: [...this.value],
      items: [
        'All Good',
        'Not enought lock tide',
        'Not tide enought',
        'Added more grease on gears',
        'Wrong sticker or missed sticker',
        'Screw damaged',
        'Actuator Screw missing',
        'Actuator Thread damaged',
        'Dome damaged',
        'Indicator damaged',
        'Control pack damaged',
        'Control pack missing',
        'Control pack needs to recalibrate',
        'Push button damaged',
        'Wrong serial number',
        'No grease on gears',
        'Noise on gears when moving',
        'Diagram on the back is not glued',
        'Wrong serial number on actuator/box/control pack',
      ],
    };
  },
  // model: {
  //   prop: 'value',
  //   event: 'input',
  // },
  methods: {
    updateValue(value) {
      console.log('value from details', value);
      this.$emit('input', value);
    },
    // updateValue(newValue) {
    //   if (this.isMounted) {
    //     this.$emit('input', newValue);
    //   }
    // },
  },
  watch: {
    value(newVal) {
      this.selectedValue = [...newVal];
    },
  },
  computed: {
    // computedState: {
    //   get() {
    //     return this.defaultValue;
    //   },
    //   set(value) {
    //     this.$emit('input', value);
    //     return value;
    //   },
    // },
  },
};
</script>

<style></style>
