<template>
  <el-drawer
    :with-header="false"
    :visible.sync="drawer"
    :modal-append-to-body="false"
    direction="ltr"
    size="60%"
  >
    <div class="links-con">
      <router-link
        :to="item.routerTo"
        v-for="item in itemList"
        :key="item.name"
        class="link-item-a"
      >
        <div class="a-inner-con">
          <i
            :class="item.icon"
            class="h-icon"
          />

          <div class="link-name">
            {{ item.name }}
          </div>
        </div>
        <el-divider />
      </router-link>
    </div>
  </el-drawer>
</template>

<script>
export default {
  name: "SideDrawer",
  data() {
    return {
      drawer: false,
    };
  },
  computed: {
    itemList() {
      return this.$store.state.navList;
    },
  },
};
</script>

<style scoped>
.link-item-a {
  color: black;
  text-decoration: none;
  width: 100%;
}
.a-inner-con {
  width: 100%;
  height: 3em;
  user-select: none;
  display: flex;
  align-items: center;
}
.h-icon {
  font-weight: bold;
  font-size: 1.5em;
  flex: 1 1 0;
}
.link-name {
  flex: 1 1 0;
}
</style>