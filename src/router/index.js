import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)
function dynamicPropsFn (route) {
  return {
    path: route.params.query
  }
}
  const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/search/:query',
    name: 'Results',
    props: dynamicPropsFn,
    component: () => import(/* webpackChunkName: "search" */ '../views/Results.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
