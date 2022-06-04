<template>
  <div class="aboutMovie">
    <div class="title">系列集</div>
    <div class="movieList">
      <router-link class="movieWrap" v-for="movie in movieList" :to="/movie/+movie.id">
        <div class="imgWrap">
          <img class="img" :src="movie.poster_path" @error="errImg" alt="">
        </div>
        <div class="info">
          <div class="movieName">{{movie.title}}</div>
          <div class="movieRelease">( {{movie.release_date ? movie.release_date : '未上映'}} )</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import axios from 'axios'

export default {
  props: ['movieCollection'],
  setup(props) {
    const store = useStore()
    const targetPatch = ref('')
    const movieList = reactive([])
    
    const getTargetPatch = () => {
      store.dispatch('getMovieCollectionURL', props.movieCollection)
      .then(res => {
        targetPatch.value = res
        axios({url: targetPatch.value}).then((res) => {
          console.log(res);
          res.data.parts.forEach(movieData => {
            if(movieData.id != store.state.api.movieId) { // 如果API回傳的電影id與當前Box的id一致時，則跳過添加
            console.log(movieList);
              movieData.poster_path = `${store.state.api.baseImgURL}${movieData.poster_path}` 
              movieList.push(movieData)
            }
          })
        })
      })
    }

    onMounted(getTargetPatch)

    function errImg(e) {
      console.log(e.target.src);
      e.target.src = '/images/noImg.jpg'
    }

    return { movieList, errImg }
  }
}
</script>

<style lang="scss" scoped>
  .aboutMovie {
    .title {
      font-weight: 700;
    }

    .movieList {
      margin-top: 8px;
      display: flex;
      flex-wrap: wrap;
      // justify-content: space-between;

      @media screen and (max-width: 538px) {
        justify-content: center;
      }

      .movieWrap {
        width: var(--movie-wrap-w);
        margin-right: var(--movie-wrap-mr);
        margin-bottom: 40px;

        .imgWrap {
          width: var(--movie-wrap-w);
          height: var(--poster-h);

          .img {
            width: var(--movie-wrap-w);
            height: var(--poster-h);
          }
        }

        .info {
          text-align: center;
          .movieName {
            margin-top: 8px;
            font-size: 14px;
          }

          .movieRelease {
            font-size: 12px;
          }
        }
      }
    }
  }
</style>