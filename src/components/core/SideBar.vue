<template>
  <div>
    <!-- <v-navigation-drawer 
    v-model="drawer" 
    :mobile-breakpoint="768" 
    app> -->

    <v-navigation-drawer 
    v-model="computedDrawer" 
    :mobile-breakpoint="768" 
    app>

      <v-img
        class="pa-4 pt-7"
        height="190"
        src="../../../public/img/series-1000.png"
        gradient="to top right, rgba(19,84,122,.5), rgba(128,208,199,.8)">
        <v-avatar size="70" class="mb-2">
          <!-- <img src="public/img/vsi.png" alt="Valve Solutions Inc" /> -->
          <v-img src="../../../public/img/vsi.png" alt="Valve Solutions Inc" />
        </v-avatar>
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
    <!-- <v-app-bar-nav-icon
      v-if="user"
      @click="drawer = !drawer">
    </v-app-bar-nav-icon> -->
  </div>
</template>

<script>
// changeDrawer
import { mapState } from 'vuex';
// import { bus } from '../../main';
export default {
  name: 'SideBar',
  data: () => ({
    // drawer: null,
    items: [
      {
        title: 'Add Inspection',
        icon: 'mdi-format-list-checks',
        to: '/inspection',
      },
      {
        title: 'view Inspection',
        icon: 'mdi-emoticon-cool-outline',
        to: '/inspection/details',
      },
      // {
      //   title: "About",
      //   icon: "mdi-help-box",
      //   to: "/about",
      // },
    ],
  }),
  created() {
    // console.log('THE DRAWER: ', this.drawerMenu);
    // bus.$on('changeDrawer', (value) => {
    //   console.log('changeDrawer', value);
    //   this.drawer = value;
    // });
    // this.drawer = this.$route.path === '/inspection' ? true : false;
  },
  computed: {
    ...mapState('authentication', ['user']),
    ...mapState(['drawerMenu']),
    computedDrawer: {
      get() {
        return this.drawerMenu;
      },
      set(value) {
        this.$store.commit('CHANGE_DRAWER_MENU', value);
      },
      // return this.drawerMenu;
    },
  },
  methods: {
    changeDrawer() {
      this.drawer = !this.drawer;
    },
  },
  // watchers: {
  //   drawer() {
  //     this.drawer = !this.drawer;
  //     console.log('clicked: ', this.drawer);
  //     this.$emit('drawerMenu', this.drawer);
  //   },
  // },
};
</script>
