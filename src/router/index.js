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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/Upload.vue')
  },
  {
    path: '/imageDetail',
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
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
