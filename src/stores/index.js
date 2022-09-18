import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    pidList: [],
    sideNavState: true,
    navList: [
      {
        routerTo: "/",
        icon: "el-icon-house",
        name: "首页",
      },
      {
        routerTo: "/discovery",
        icon: "el-icon-discover",
        name: "发现",
      },
      {
        routerTo: "/sequence",
        icon: "el-icon-finished",
        name: "队列",
      },
      {
        routerTo: "/upload",
        icon: "el-icon-upload2",
        name: "上传",
      },
      {
        routerTo: "/albums",
        icon: "el-icon-files",
        name: "相册",
      },
      {
        routerTo: "/all-tag",
        icon: "el-icon-collection-tag",
        name: "所有标签",
      },
      {
        routerTo: "/login",
        icon: "el-icon-user",
        name: "登录",
      },
    ],
    orderMethods:[
      {
        name: '图片下载时间升序',
        order: 'last_modified'
      },
      {
        name: '图片下载时间降序',
        order: 'last_modified desc'
      },
      {
        name: '图片上传时间升序',
        order: 'id'
      },
      {
        name: '图片上传时间降序',
        order: 'id desc'
      },
    ]
  },
  mutations: {
    increment(state, payload) {
      state.pidList = payload.pidList
    },
    expandSideNav(state, payload) {
      state.sideNavState = payload.newVal
    }
  },
  plugins: [
    createPersistedState({ 
      storage: window.sessionStorage,
      reducer(val){
        return {
          pidList: val.pidList
        }
      }
    })
  ]
})

export default store;