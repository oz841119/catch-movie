<template>
  <div class="searchMovie">
    <div class="title">{{route.query.query}}</div>
    <ul class="movieList">
      <li class="listItem" v-for="movie in movieDataList">
        <router-link class="movieWrap" :to="{patch: 'search', query: {query: route.query.query, id: movie.id}}">
        <!-- <router-link class="movieWrap" :to="'/search' + '?query=' + route.query.query + '&id=' + movie.id"> -->
          <div class="imgWrap">
            <img :src="`https://image.tmdb.org/t/p/w185/${movie.poster_path}`" alt="">
          </div>
          <div class="movieName">{{movie.title}}</div>
        </router-link>
      </li>
    </ul>
  </div>
  <MovieBox v-if="isMovieBox"/>
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
    width: 100%;
    padding: 0 60px 0 60px;
    padding-top: 50px;
    background-color: var(--bg-main-color);

    .title {
      font-size: var(--title-main-size);
      color: var(--title-main-color);
      margin-bottom: var(--title-main-mb)
    }
    .movieList {
      display: flex;
      flex-wrap: wrap;
      margin-top: 40px;
      .listItem {
        width: 185px;
        margin-right: 28px;
        margin-bottom: 40px;

        .movieWrap {

          .imgWrap {
            width: 185px;
            height: 278px;

            img {
              height: 100%;
              width: 100%;
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