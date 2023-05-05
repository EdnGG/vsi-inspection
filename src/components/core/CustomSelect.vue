<template>
  <v-row align="center">
    <v-col cols="6">
      <v-subheader>
        {{ title }}
      </v-subheader>
    </v-col>
    <v-col cols="6">
      <!-- capturar selec.state 
      v-model="computedState"  
      -->
        <!-- v-model="computedState"
        :items="items.map((item) => item.state)"
        item-text="item"
        item-value="state"
        persistent-hint
        return-object
        single-line
        :hint="computedState ? computedState.value : null"> -->
      <v-select
        v-model="computedSelectedState"
        :items="items"
        item-text="state"
        item-value="item"
        persistent-hint
        return-object
        single-line
        :hint="computedSelectedState ? computedSelectedState.value : null"
        @input="updateValue"
      >
      </v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CustomSelect',
  props: {
    title: {
      type: String,
      require: true,
    },
  },
  data() {
    return {
      defaultValue: { state: 'Good', item: 'Looks Good' },
      value: null,
      items: [
        { state: 'Good', item: 'Looks Good' },
        { state: 'Bad', item: 'Looks Bad' },
        { state: 'Not sure', item: 'Not sure condition' },
      ],
    };
  },
  model: {
    event: 'change',
  },
  created() {
    if (this.value === null || this.value === undefined) {
      this.value = this.defaultValue;
    }
  },
  methods: {
    updateValue(value) {
      console.log('value: ', value);
      this.$emit('input', value.state);
    },
  },
  computed: {
    computedSelectedState: {
      get() {
        // if (!this.value) {
        //   return this.defaultValue;
        // }
        const foundState = this.items.find(
          (item) => item.state === this.value.state,
        );
        return foundState || this.defaultValue;
      },
      set(value) {
        console.log('value: ', value);
        // Checar el evento correcto para emitir

        this.$emit('input', value.state);
      },
    },

    // watch: {
    //   value: function (newVal) {
    //     this.selectedState = this.items.find((item) => item.state === newVal);
    //   },
    // },
  },
};
</script>
