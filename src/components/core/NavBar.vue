<template>
  <v-app-bar
    app
    color="#primary"
    dark
    prominent
    src="img/building.png"
    :height="$route.path === '/todo' ? 220 : 190"
  >
    <template v-slot:img="{ props }">
      <v-img
        v-bind="props"
        gradient="to top right, rgba(19,84,122,.9), rgba(128,208,199,.9)"
      ></v-img>
    </template>

    <v-container class="header-container pa-0">
      <v-row>
        <v-app-bar-nav-icon
          v-if="user"
          @click="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-spacer></v-spacer>
        <menu-rigth-side />
      </v-row>

      <v-row>
        <v-app-bar-title class="ml-4 text-h4">
          {{ title }}
        </v-app-bar-title>
      </v-row>
      <v-row id="row__tools">
        <live-date-time />
        <local-weather />
      </v-row>
    </v-container>
  </v-app-bar>
</template>

<script>
import { mapState } from 'vuex';
import LiveDateTime from '@/components/Tools/LiveDateTime.vue';
import LocalWeather from '@/components/Tools/LocalWeather.vue';
import MenuRigthSide from '@/components/MenuRigthSide.vue';

export default {
  components: {
    LiveDateTime,
    LocalWeather,
    MenuRigthSide,
  },
  data: () => ({
    title: 'Inspection',
    drawer: false,
  }),
  computed: {
    ...mapState('authentication', ['user']),
  },
};
</script>

<style lang="sass">
.header-container
  max-width: none !important
  #row__tools
    display: flex
    justify-content: space-between
    align-items: center
    margin-right: 20px
</style>