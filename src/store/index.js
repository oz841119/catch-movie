import { createStore } from 'vuex'
import api from './api'
import movieBox from './movieBox'

export default createStore({
  state: {
    isMovieBox: false,
    isPageLoading: true
  },

  mutations: {
    toggleIsPageLoading(state, payload) {
      console.log(state.isPageLoading);
      state.isPageLoading = payload
      console.log(state.isPageLoading);
    }
  },
  actions: {
  },
  computed: {
    isPageLoading() {
      return
    }
  },
  modules: {
    api,
    movieBox
  }
})
