import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Images from '../views/Images.vue'
//import test from '../components/test.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Images',
    component: Images,
  },
  { 
    path: '/album/:albumId',
    component: Images,
  },
  { 
    path: '/tag/:tags',
    component: Images, 
  },
  { 
    path: '/album/:albumId/tag/:tags',
    component: Images, 
  },
  {
    path: '/upload',
    name: 'Upload',
    component: () => import('../views/Upload.vue')
  },
  {
    path: '/sequence',
    name: 'Sequence',
    component: () => import('../views/Sequence.vue')
  },
  {
    path: '/discovery',
    name: 'Discovery',
    component: () => import('../views/Discovery.vue')
  },
  {
    path: '/imageDetail/:pid',
    name: 'imageDetail',
    component: () => import('../views/Detail.vue')
  },
  {
    path: '/albums',
    name: 'albums',
    component: () => import('../views/AlbumList.vue')
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/all-tag',
    name: 'allTag',
    component: () => import('../views/AllLabel.vue')
  },
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior() {
    // 始终滚动到顶部
    return { top: 0 }
  },
})

export default router
