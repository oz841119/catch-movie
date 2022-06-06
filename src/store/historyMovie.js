export default {
  state: {
    historyMovieIdList: []
  },
  getters: {
  },
  mutations: {
    getHistoryMovieIdList(state) {
      state.historyMovieIdList = JSON.parse(window.localStorage.getItem('historyMovieIdList')) || []
    },

    setHistoryMovieIdList(state, movieID) {
      console.log(state.historyMovieIdList.indexOf(movieID));
      if(state.historyMovieIdList.indexOf(movieID) === -1) {
        state.historyMovieIdList.unshift(movieID)
        window.localStorage.setItem('historyMovieIdList',JSON.stringify(state.historyMovieIdList))
        this.commit('getHistoryMovieIdList')
      }
    },

    cleanHistory(state) {
      window.localStorage.removeItem('historyMovieIdList');
      state.historyMovieIdList.length = 0
      // console.log(state.historyMovieIdList);
    }
  },
  actions: {
  },
  modules: {
  }
}
