import axios from "axios"

export default {
  state: {
    baseURL: 'https://api.themoviedb.org/3',
    baseImgURL: 'https://image.tmdb.org/t/p/w1280',
    key: 'api_key=3439a229755b0ef08c1384ecf4175ab4',
    movieId: '', // 問題： 當Box被關閉的時候，movie的ID仍然會殘留在Vuex，雖暫時沒有察覺到影響使用的地方。
    // 當前流行
    popularity_desc: '&language=zh-TW&sort_by=popularity.desc&certification_country=TW&certification=TW&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&certification_country=TW',
    
    // 榜上佳片
    vote_average_desc: '&language=zh-TW&sort_by=vote_average.desc&vote_count.gte=5000&certification_country=TW&certification=TW&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&certification_country=TW',
    
    // 將上映的電影
    release_date_gte: '&language=zh-TW&region=TW&sort_by=release_date.asc&with_release_type=2|3|6&release_date.gte=',

    // 近期上映的電影
    release_date_lte:'&language=zh-TW&region=TW&sort_by=release_date.desc&with_release_type=2|3|6&release_date.lte=',

    // 本週熱門
    weekPopularity: '&language=zh-TW&region=TW&sort_by=popularity.desc'

  },
  getters: {
    todayDate() { //獲得今天日期 String Ex: 2022-01-01
      const todayDate = new Date()
      const yy = todayDate.getFullYear()
      const mm = todayDate.getMonth()+1 >= 10 ? todayDate.getMonth()+1 : '0' + (todayDate.getMonth()+1).toString()
      const dd = todayDate.getDate() >= 10 ? todayDate.getDate() : '0' + (todayDate.getDate(-1)).toString()
      const dateFormatting = `${yy}-${mm}-${dd}`
      return dateFormatting
    },

    weekHot(state) {
      return `${state.baseURL}/trending/movie/week?${state.key}${state.weekPopularity}`
    },

    popularity(state) {
      return `${state.baseURL}/discover/movie?${state.key}${state.popularity_desc}`
    },

    voteAverage(state) {
      return `${state.baseURL}/discover/movie?${state.key}${state.vote_average_desc}`
    },

    comingSoon(state, getters) {
      return `${state.baseURL}/discover/movie?${state.key}${state.release_date_gte}${getters.todayDate}`
    },

    newRelease(state, getters) {
      return `${state.baseURL}/discover/movie?${state.key}${state.release_date_lte}${getters.todayDate}`
    },

    movieData(state) {
      return `${state.baseURL}/movie/${state.movieId}?${state.key}&language=zh-TW&append_to_response=credits`
    },
  },

  mutations: {
    getMovieId(state, payload) {
      state.movieId = payload
    }
  },

  actions: {
    getMovieCollectionURL(context, payload) { // 獲取完整的url
      const state = context.state
      const url = `${state.baseURL}/collection/${payload}?${state.key}&language=zh-TW`
      return url
    },

    getSearchURL(context, payload) {
      const state = context.state
      const url = `${state.baseURL}/search/movie?${state.key}&language=zh-TW&query=${payload}`
      return url
    },

    getMovie(context) { // 提供給歷史瀏覽紀錄使用
      const state = context.state
      const historyMovieIdList = context.rootState.historyMovie.historyMovieIdList // 取得Vuex historyMovie模塊的historyMovieIdList
      const movieURLOfAxiosFnArr = [] // 用於儲存axios請求函數

      historyMovieIdList.forEach((movieID) => { // 遍歷historyMovieIdList中得所有ID 拼接為URL 製作axios請求函數加入近數組
        const url = `${state.baseURL}/movie/${movieID}?${state.key}&language=zh-TW&append_to_response=credits`
        movieURLOfAxiosFnArr.push(axios({url: url}))
      }) 

      return axios.all(movieURLOfAxiosFnArr).then(axios.spread((...results) => { // axios.all接收一個由axios請求函數為元素的數組，
        return new Promise(resolve => { // return一個新的Promise並調用resolve將結果送出，讓組件中可以使用.then方法
          resolve(results) // 尚未處理reject方案
        })
      }))
      
      // console.dir(historyMovieIdList);
      // axios({url: url})
      //   .then(res => {
      //     target.push(res)
      //     return
      //   })
    }
  },

  modules: {
  }
}
