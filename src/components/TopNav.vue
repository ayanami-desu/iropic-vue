<template>
  <header class="header">
    <div
      @click="expandNav"
      class="nav-btn"
    >
      <i :class="fold ? 'el-icon-s-unfold' : 'el-icon-s-fold'" />
    </div>
    <router-link
      to="/"
      class="title"
    >
      iro Pic
    </router-link>
    <SideDrawer ref="drawer" />
  </header>
</template>
<script>
import SideDrawer from "./SideDrawer.vue";

export default {
  name: "MyNav",
  components: {
    SideDrawer,
  },
  data() {
    return {
    };
  },
  methods: {
    openAlbumDrawer() {
      this.$refs.albumDrawer.drawer = true;
    },
    openLabelDrawer() {
      this.$refs.labelDrawer.drawer = true;
    },
    expandNav() {
      //移动端处理
      if (this.isMobile()) {
        this.$refs.drawer.drawer = true;
        return
      }
      this.$store.commit({
        type: "expandSideNav",
        newVal: !this.fold,
      });
    },
    isMobile() {
      try {
        document.createEvent("TouchEvent");
        return true;
      } catch (e) {
        return false;
      }
    },
  },
  computed: {
    fold() {
      return this.$store.state.sideNavState;
    },
  },
};
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  width: 100vw;
  height: 60px;
  box-sizing: border-box;
  background: #0073b2;
  z-index: 999;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  box-shadow: 0 2px 4px -1px rgb(0 0 0 / 20%), 0 4px 5px rgb(0 0 0 / 14%),
    0 1px 10px rgb(0 0 0 / 12%);
}
.title {
  color: white;
  font-size: 120%;
  font-weight: bold;
  text-decoration: none;
}
.nav-btn {
  user-select: none;
  font-weight: bold;
  font-size: 1.5em;
  color: white;
  cursor: pointer;
  width: 60px;
  display: flex;
  align-items: center;
  height: 100%;
  justify-content: center;
}
</style>