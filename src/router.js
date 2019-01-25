import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

export default new Router({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes: [{
      path: '/',
      name: 'home',
      redirect: '/index',
      component: Home
    },
    {
      path: '/login',
      name: 'login',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () =>
        import( /* webpackChunkName: "about" */ '@/components/login')
    },
    {
      path: '/center',
      name: 'center',
      component: () =>
        import('@/components/center')
    },
    {
      path: '/index',
      name: 'index',
      component: () =>
        import('@/components/index')
    },
    {
      path: '/question',
      name: 'question',
      component: () =>
        import ('@/components/question')
    },
    {
      path: '/vote',
      name: 'vote',
      component: () =>
        import('@/components/vote')
    },
    {
      path: '/meettings',
      alias: ['/seating', '/order', '/location', '/detail'],
      component: () =>
        import('@/components/meettings')
    },
    {
      path: '/answer',
      component: () =>
        import('@/components/answer')
    },
    {
      path: '/quess',
      component: () =>
        import('@/components/marquee')
    },
    {
      path: '/barrage',
      component: () =>
        import('@/components/barrage')
    }
  ]
})
