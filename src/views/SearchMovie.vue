<template>
  <div class="searchMovie">
    <div class="title">您搜尋的結果： 
      <span class="queryContent">{{route.query.query}}</span>
    </div>
    <ul class="movieList">
      <li class="listItem" v-for="movie in movieDataList">
        <router-link class="movieWrap" :to="{patch: 'search', query: {query: route.query.query, id: movie.id}}">
          <div class="imgWrap">
            <img :src="`https://image.tmdb.org/t/p/w185/${movie.poster_path}`" alt="">
          </div>
          <div class="movieName">{{movie.title}}</div>
        </router-link>
      </li>
      <div class="filler"></div>
      <div class="filler"></div>
      <div class="filler"></div>
    </ul>
    <MovieBox v-if="isMovieBox"/>
  </div>
</template>

<script>
import axios from "axios"
import { onBeforeRouteUpdate, useRoute } from "vue-router"
import { useStore } from "vuex"
import { reactive, ref, watch } from "vue"
import MovieBox from '../components/MovieBox.vue'


export default {
  components: {
    MovieBox,
  },
  setup() {
    const route = useRoute()
    const store = useStore()
    const movieDataList = reactive([])
    const isMovieBox = ref(false)

    route.query.id ? isMovieBox.value = true : isMovieBox.value = false
    getMovies()

    watch(route, (newVal, oldVal) => {
      newVal.query.id ? isMovieBox.value = true : isMovieBox.value = false 
    })

    onBeforeRouteUpdate((to, from) => {
      isSameQuery(to.query.query, from.query.query)
    })

    function getMovies(queryString = null) {
      movieDataList.length = 0
      store.dispatch('getSearchURL', queryString || route.query.query)
      .then(URLres => {
        axios({url: URLres})
        .then(APIres => {
          const movieApiDataArr = APIres.data.results
          movieApiDataArr.forEach((movie) => {
            movie.backdrop_path && movieDataList.push(movie) // 沒有海報則不成為搜尋結果
          })
        })
      })
    } 

    function isSameQuery(newQuery, oldQuery) {
      if(newQuery != oldQuery) {
        getMovies(newQuery)
      }
    }

    return { movieDataList, route, MovieBox, isMovieBox }
  },
}
</script>

<style lang="scss" scoped>
  .searchMovie {
    display: flex;
    flex-direction: column;
    // width: 100%;
    padding-top: 50px;
    background-color: var(--bg-main-color);

    .title {
      font-size: var(--title-main-size);
      color: var(--title-main-color);
      margin-bottom: var(--title-main-mb);

      .queryContent {
        color: rgba(255, 255, 255, 0.668);
      }
      
    }
    .movieList {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;

      @media screen and (max-width: 530px) {
        justify-content: space-around
      }
      
      .filler {
        width: calc(var(--movie-wrap-w) + 15px);
        margin-bottom: 40px;
        height: 0;
      }

      .listItem, .filler {
        width: calc(var(--movie-wrap-w) + 15px);
        margin-bottom: 40px;

        .movieWrap {
          display: flex;
          flex-direction: column;
          align-items: center;

          .imgWrap {
            width: var(--movie-wrap-w);
            height: var(--poster-h);

            img {
              width: var(--movie-wrap-w);
              height: var(--poster-h);
            }
          }

          .movieName {
            font-size: var(--movie-name-size);
            margin-top: var(--movie-name-mt);
            color: #fff;
            text-align: center;
            word-wrap:break-word;
          }
        }
      }
    }
  } 
</style>