<template>
  <div id="app">
    <TopNav />
    <div class="main-con">
      <SideNav />
      <div
        class="views"
        :style="fold?'width:100%':'width:calc(100% - 68px)'"
      >
        <router-view />
      </div>
    </div>
  </div>
</template>

<script>
import TopNav from './components/TopNav.vue'
import SideNav from './components/SideNav.vue'
export default {
  name: 'App',
  components: {
    TopNav,
    SideNav,
  },
  data(){
    return{

    }
  },
  computed:{
    fold(){
      return this.$store.state.sideNavState
    }
  }

}
</script>

<style scoped>
#app {
  min-height: 100vh;
}
.main-con{
  padding-top: 60px;
  display: flex;
  justify-content: flex-end;
}
.views {
  display: flex;
  align-items: center;
  flex-direction: column;
  background: #eeeeee;
  min-height: 100vh;
}

</style>
