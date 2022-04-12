export default {
  state: {
    baseURL: 'https://api.themoviedb.org/3',
    key: 'api_key=3439a229755b0ef08c1384ecf4175ab4',
    // 當前流行
    popularity: '&language=zh-TW&sort_by=popularity.desc&certification_country=TW&certification=TW&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&certification_country=TW',
    // 榜上佳片
    voteAverage: '&language=zh-TW&sort_by=vote_average.desc&vote_count.gte=5000&certification_country=TW&certification=TW&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&certification_country=TW',
    // 新片到
    release: '&language=zh-TW&sort_by=release_date.desc&certification_country=TW&certification=TW&include_adult=false&include_video=false&page=1&with_watch_monetization_types=flatrate&certification_country=TW'

  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
}
