<template>
  <div class="searchMovie">
    <ul class="listWrap">
      <li class="movieWrap" v-for="movie in movieDataList">
        <div class="imgWrap">
          <img :src="`https://image.tmdb.org/t/p/w185/${movie.poster_path}`" alt="">
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from "axios"
import { useRoute } from "vue-router"
import { useStore } from "vuex"
import { reactive } from "vue"
export default {
  setup() {
    const route = useRoute()
    const searchContent = route.query.query
    const store = useStore()
    const movieDataList = reactive([])

    store.dispatch('getSearchURL', searchContent)
    .then(URLres => {
      axios({url: URLres})
      .then(APIres => {
        const movieApiDataArr = APIres.data.results
        movieApiDataArr.forEach((movie) => {
          movieDataList.push(movie)
        })
        console.log(movieDataList);
      })
    })
    return { movieDataList }
  }
}
</script>

<style lang="scss" scoped>
  .searchMovie {
    .listWrap {
      display: flex;
      .movieWrap {
        min-width: 185px;

        .imgWrap {
          width: 185px;
          height: 278px;

          img {
            height: 100%;
            width: 100%;
          }
        }
      }
    }
  } 
</style>