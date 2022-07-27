<template>
  <div id="app">
    <MyNav />
    <div class="views">
      <router-view />
    </div>
  </div>
</template>

<script>
import MyNav from './components/MyNav.vue'
export default {
  name: 'App',
  components: {
    MyNav,
  }
}
</script>

<style>
#app {
  min-height: 100vh;
}
.views {
  padding: 80px 0;
  /* width: 100vw; */
  display: flex;
  align-items: center;
  flex-direction: column;
}
</style>
