<template>
  <v-app id="inspire">
    <v-navigation-drawer 
      v-if="user"
      v-model="drawer" 
      :mobile-breakpoint="768" 
      app
    >
      <v-img
        class="pa-4 pt-7"
        height="190"
        src="img/series-1000.png"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)"
      >
        <v-avatar size="70" class="mb-2">
          <img src="img/vsi.png" alt="Valve Solutions Inc" />
          <!-- <img
            v-if="!userDB"
            :src="defaultImage"
            alt="User Avatar"
          > -->
        </v-avatar>
        <!-- <div v-if="userDB">
          <div class="white--text text-subtitle-1 font-weight-bold">{{ userDB.name ? userDB.name : ''}}</div>
          <div class="white--text text-subtitle-2">{{ userDB.email ? userDB.email : ''}}</div>
        </div>
        <div v-if="!userDB">
          <div class="white--text text-subtitle-1 font-weight-bold"></div>
          <div class="white--text text-subtitle-2"></div>
        </div> -->
      </v-img>

      <v-list dense nav>
        <v-list-item v-for="item in items" :key="item.title" :to="item.to" link>
          <v-list-item-icon>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>{{ item.title }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

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
            @click="drawer = !drawer"></v-app-bar-nav-icon>
          <v-spacer></v-spacer>
          <!-- <search v-if="$route.path === '/todo'" /> -->
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

    <!-- <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>Application</v-toolbar-title>
    </v-app-bar> -->

    <v-main>
      <!--  -->
      <router-view></router-view>
      <CustomSnackbar />
    </v-main>
  </v-app>
</template>

<script>
import { mapState } from "vuex";
import CustomSnackbar from "./components/core/CustomSnackbar.vue";
export default {
  components: {
    CustomSnackbar,
    // snackbar: require("@/components/core/Snackbar.vue").default,
    "live-date-time": require("@/components/Tools/LiveDateTime.vue").default,
    "menu-rigth-side": require("@/components/MenuRigthSide.vue").default,
    "local-weather": require("@/components/Tools/LocalWeather.vue").default,
  },
  data: () => ({
    drawer: null,
    defaultImage: "https://lenguajejs.com/javascript/logo.svg",
    title: "Inspection",
    items: [
      {
        title: "Add Inspection",
        icon: "mdi-format-list-checks",
        to: "/inspection",
      },
      {
        title: "view Inspection",
        icon: "mdi-emoticon-cool-outline",
        to: "/inspection/details",
      },
      {
        title: "About",
        icon: "mdi-help-box",
        to: "/about",
      },
      // {
      //   title: "Desmet-Packing",
      //   icon: "mdi-clipboard-list-outline",
      //   to: "/desmet/packing",
      // },
      // {
      //   title: "Desmet-Pallets",
      //   icon: "mdi-clipboard-list-outline",
      //   to: "/desmet/pallets",
      // },
    ],
  }),
  computed: {
    ...mapState("authentication", ["user"]),
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
