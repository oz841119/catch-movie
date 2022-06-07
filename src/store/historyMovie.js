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
      console.log(state.historyMovieIdList);
      console.log(state.historyMovieIdList.indexOf(movieID));
      if(state.historyMovieIdList.indexOf(movieID) === -1) { // 如果目前列表中未含有該movieID，則添加 (主要避免重複添加)
        state.historyMovieIdList.unshift(movieID)
        window.localStorage.setItem('historyMovieIdList',JSON.stringify(state.historyMovieIdList))
        this.commit('getHistoryMovieIdList')
      }

      if(state.historyMovieIdList.indexOf(movieID) > 0) { // 如果列表中已含有movieID且不在首位(index == 0)時，則將該ID移至首位
        const currentIndex = state.historyMovieIdList.indexOf(movieID)
        state.historyMovieIdList.splice(currentIndex, 1)
        state.historyMovieIdList.unshift(movieID)
        window.localStorage.setItem('historyMovieIdList',JSON.stringify(state.historyMovieIdList))
        this.commit('getHistoryMovieIdList')
      }
    },

    cleanHistory(state) {
      window.localStorage.removeItem('historyMovieIdList');
      state.historyMovieIdList.length = 0
    }
  },
  actions: {
  },
  modules: {
  }
}
