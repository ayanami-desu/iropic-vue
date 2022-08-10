<template>
  <div
    class="con"
    :class="{ 'con-close': close }"
    @mouseenter="close = false"
    @mouseleave="close = true"
    v-if="!fold"
  >
    <ul>
      <li
        v-for="item in itemList"
        :key="item.name"
        class="nav-link"
      >
        <router-link :to="item.routerTo">
          <i
            :class="item.icon"
            class="nav-icon"
          /><span class="nav-text">{{
            item.name
          }}</span>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "SideNav",
  data() {
    return {
      close: true,
    };
  },
  computed: {
    fold() {
      return this.$store.state.sideNavState;
    },
    itemList() {
      return this.$store.state.navList;
    },
  },
};
</script>

<style scoped>
.con {
  width: 180px;
  height: calc(100vh - 60px);
  border-right: 1px solid rgba(0, 0, 0, 0.12);
  padding: 10px 14px;
  box-sizing: border-box;
  z-index: 17;
  position: fixed;
  left: 0;
  top: 60px;
  transition: all 0.3s ease;
  background: white;
}
.con.con-close {
  width: 68px;
}
.con.con-close .nav-text {
  opacity: 0;
}

ul {
  margin: 0;
  padding: 0;
}
.nav-link {
  list-style: none;
  display: flex;
  align-items: center;
  margin-top: 10px;
  height: 45px;
}
.nav-link a {
  background-color: transparent;
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  border-radius: 6px;
  text-decoration: none;
  transition: all 0.3s ease;
}

.nav-text {
  white-space: nowrap;
  opacity: 1;
  font-size: 17px;
  font-weight: 500;
  transition: all 0.3s ease;
  color: #707070;
}
.nav-icon {
  font-weight: bold;
  font-size: 1.5em;
  color: #707070;
  transition: all 0.3s ease;
  min-width: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
}
.nav-link a:hover {
  background-color: #695cfe;
}
.nav-link a:hover .nav-text,
.nav-link a:hover .nav-icon {
  color: white;
}

.link-item-a {
  color: black;
  text-decoration: none;
  width: 100%;
}
</style>