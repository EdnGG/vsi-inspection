<template>
  <div class="text-subtitle-1 ml-4">
    {{ weather.name }} - {{ weather.country }} - {{ weather.description }} -
    {{ weather.temp }}°F
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'LocalWeather',
  data() {
    return {};
  },
  computed: {
    ...mapState(['weather']),
  },
  created() {
    this.$store.dispatch('getLocalWeather');
  },
};
</script>
