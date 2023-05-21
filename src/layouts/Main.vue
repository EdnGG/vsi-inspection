<template>
  <v-app id="inspire">
    <SideBar></SideBar>
    <NavBar></NavBar>
    <v-main>
      <router-view></router-view>
      <CustomSnackbar />
    </v-main>
  </v-app>
</template>

<script>
import { defineAsyncComponent } from 'vue';
// import CustomSnackbar from '@/components/core/CustomSnackbar.vue';
// import SideBar from '@/components/core/SideBar.vue';
// import NavBar from '@/components/core/NavBar.vue';

export default {
  components: {
    CustomSnackbar: defineAsyncComponent(() =>
      import('@/components/core/CustomSnackbar.vue'),
    ),
    SideBar: defineAsyncComponent(() =>
      import('@/components/core/SideBar.vue'),
    ),
    NavBar: defineAsyncComponent(() => import('@/components/core/NavBar.vue')),
  },
};
</script>