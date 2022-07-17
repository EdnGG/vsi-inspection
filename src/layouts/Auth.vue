<template>
  <v-app id="inspire">
    <NavBar></NavBar>
    <v-main>
      <router-view></router-view>
      <CustomSnackbar />
    </v-main>
  </v-app>
</template>

<script>
import CustomSnackbar from '@/components/core/CustomSnackbar.vue';
import NavBar from '@/components/core/NavBar.vue';

export default {
  components: {
    CustomSnackbar,
    NavBar,
  },
};
</script>
