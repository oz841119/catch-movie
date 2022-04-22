<template>
  <div class="searchMovie">
    <div class="title">{{searchContent}}</div>
    <ul class="movieList">
      <li class="movieWrap" v-for="movie in movieDataList">
        <div class="imgWrap">
          <img :src="`https://image.tmdb.org/t/p/w185/${movie.poster_path}`" alt="">
        </div>
        <div class="movieName">{{movie.title}}</div>
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
          movie.backdrop_path && movieDataList.push(movie) // 沒有海報則不成為搜尋結果
        })
        console.log(movieDataList);
      })
    })
    return { movieDataList,searchContent }
  }
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
      .movieWrap {
        width: 185px;
        margin-right: 28px;
        margin-bottom: 40px;

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
</style>