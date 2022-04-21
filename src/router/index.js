import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchMovie from '../views/SearchMovie'

import MovieBox from '../components/MovieBox'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: 'movie/:id',
        name: 'MovieBox',
        component: MovieBox,
      }
    ]
  },
    {
      name: 'SearchMovie',
      path: '/search',
      component: SearchMovie
    }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
