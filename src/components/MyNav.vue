<template>
  <header class="header">
    <router-link
      to="/"
      class="title"
    >
      iro Pic
    </router-link>

    <div class="links-con">
      <router-link
        to="/upload"
        class="nav-links"
      >
        <i class="el-icon-upload2" />上传
      </router-link>
      <span
        class="nav-links drawer-handler"
        @click="openAlbumDrawer"
      ><i class="el-icon-files" />相册</span>
      <span
        class="nav-links drawer-handler"
        @click="openLabelDrawer"
      ><i class="el-icon-collection-tag" />标签</span>
      <router-link
        to="/login"
        class="nav-links"
      >
        <i class="el-icon-house" />管理
      </router-link>
    </div>
    <AlbumDrawer ref="albumDrawer">
      我的相册
    </AlbumDrawer>
    <LabelDrawer ref="labelDrawer" />
  </header>
</template>
<script>
import AlbumDrawer from './AlbumDrawer.vue';
import LabelDrawer from './LabelDrawer.vue';

export default {
  name: "MyNav",
  components:{
    AlbumDrawer,
    LabelDrawer,
  },
  data() {
    return {
    };
  },
  methods: {
    openAlbumDrawer(){
      this.$refs.albumDrawer.drawer = true
    },
    openLabelDrawer(){
      this.$refs.labelDrawer.drawer = true
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
  padding: 0 2em;
  background: #0073b2;
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
}
.title {
  color: white;
  font-size: 120%;
  font-weight: bold;
  text-decoration: none;
}
.links-con{
  display: flex;

}
.nav-links {
  color: white;
  flex: 1 1 0;
  text-decoration: none;
  margin-right: 0.75em;
}
.drawer-handler {
  cursor: pointer;
}
</style>