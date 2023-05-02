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
      <v-select
        v-model="computedState"
        :items="items.map((item) => item.state)"
        item-text="item"
        item-value="state"
        persistent-hint
        return-object
        single-line
        :hint="computedState ? computedState.value : null"></v-select>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: 'CoreCustomSelect',
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
  data() {
    return {
      items: [
        { state: 'Good', item: 'Looks Good' },
        { state: 'Bad', item: 'Looks Bad' },
        { state: 'Not sure', item: 'Not sure condition' },
      ],
      // selectedState: { state: this.value, item: '' },
    };
  },
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
  watch: {
    // selectedState(newVal, oldVal) {
    //   if (newVal !== oldVal) {
    //     this.$emit('change', newVal.state);
    //   }
    // },
  },
};
</script>
