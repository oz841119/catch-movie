import { createStore } from 'vuex'
import api from './api'
import movieBox from './movieBox'

export default createStore({
  state: {
    isMovieBox: false,
  },
  mutations: {
  },
  actions: {
  },
  computed: {
  },
  modules: {
    api,
    movieBox
  }
})
