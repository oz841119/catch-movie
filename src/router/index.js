import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import SearchMovie from '../views/SearchMovie'

import MovieBox from '../components/MovieBox'
import NotFound from '../views/NotFound'

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
    component: SearchMovie,
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
