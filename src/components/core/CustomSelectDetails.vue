<template>
  <v-row align="center">
    <v-col cols="6">
      <v-subheader>
        {{ title }}
      </v-subheader>
    </v-col>
    <v-col cols="6">
      
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
    value: {
      type: Array,
      // default: () => ['All Good'],
    },
  },
  data() {
    return {
      // defaultValue: ['All Good'],
      selectedValue: [],
      items: [
        'All Good',
        'Not enought lock tide on screws',
        'Not tide enought on screws',
        'Added more grease on gears',
        'Wrong sticker or missed sticker',
        'Screw damaged',
        'Actuator Screw missing',
        'Actuator Thread damaged',
        'Missing screws on control pack',
        'Dome damaged',
        'Indicator damaged',
        'Control pack damaged',
        'Control pack missing',
        'Control pack needs to recalibrate',
        'Push button damaged',
        'Wrong serial number on actuator',
        'Wrong serial number on control pack',
        'Wrong serial number on box',
        'Screws missing on control pack',
        'Damaged screws on actuator',
        'No grease on gears',
        'Noise on gears when moving',
        'Electric Diagram on the back is not glued',
        'Electric Diagram on the back is missing',
        'Electric Diagram on the back is wrong',
        'Other'
      ],
    };
  },
  beforeDestroy() {
    // Guardar el valor actual antes de destruir el componente
    this.$emit('input', this.selectedValue);
  },
  created() {
    // console.log('value from created: ', this.value);
    if (this.selectedValue.length === 0 && this.value.length) {
      this.selectedValue = [...this.value];
      // this.selectedValue = this.value.length ? [...this.value] : ['All Good'];
      // console.log('this.selectedValue: ', this.selectedValue);
    }
  },
  methods: {
    updateValue(value) {
      // console.log('Valor que recibe el metodo updateValue(value)', value);
      this.selectedValue = value;
      // console.log('SelectedValue actualizado: ', this.selectedValue);
      this.$emit('input', value);
    },
  },
  watch: {
    value(newVal) {
      // console.log('newVal from watch', newVal);
      if (JSON.stringify(newVal) !== JSON.stringify(this.selectedValue)) {
        this.selectedValue = [...newVal];
      }
      // console.log('this.selectedValue: ', this.selectedValue);
      // if (newVal !== this.selectedValue) {
      //   this.selectedValue = [...newVal];
      // }
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
