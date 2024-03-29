<template>
  <div class="movieBox">
    <div class="masking"></div>
    <div class="movieWrap">
      <div class="_loader loagind" v-show="isLoading"></div>
      <div class="bgImgWrap">
        <div class="closeBtn" @click="closeMovieBox()">X</div>
      </div>
      <div class="info">
        <div class="title">
          <div class="movieName">{{movieData.title}}</div>
          <div class="genresList">
            <span class="genres" v-for="genres in movieData.genres" :key="genres.id">{{toTC(genres.name)}}</span>
          </div>
        </div>
        <div class="originalName">( {{movieData.originalTitle}} )</div>
        <div class="dateAndVote">
          <div class="releasDate">上映日期： {{movieData.releasDate}}</div>
          <div class="vote">從 {{movieData.voteCount}} 個評分內，平均獲得 <span class="voteNum">{{movieData.voteAverage}}</span> 分。</div>
        </div>
        <div class="tagline">{{movieData.tagline ? movieData.tagline : ''}}</div>
        <div class="overview">{{movieData.overview ? movieData.overview : '未有資料'}}</div>
        <div class="actorsWrap">
          <div class="actorsWrapTitle">演員表</div>
          <div class="actorsList">
            <div class="actor" v-for="(actor, index) in movieData.creditsCast" :key="actor.id" v-show="index < showActorsCount">
              <div class="actorName">{{actor.name}}</div>
            </div>
            <div class="checkAllActors" @click="showAllActors" v-show="isShowActorsCountBtn">查看全部</div>
          </div>
        </div>
        <br/>
        <AboutMovie v-if="isCollection" :movieCollection="movieCollection"/>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { onMounted, reactive, onBeforeUnmount, ref } from "@vue/runtime-core";
  import axios from "axios";
  import { useRoute, useRouter} from 'vue-router'
  import { useStore } from "vuex";
  import AboutMovie from './AboutMovie.vue'
  import toTC from '../assets/script/traditionalized.js'
  import '../assets/style/loader.css'

  const store = useStore()
  const router = useRouter()
  const route = useRoute()
  const movieData = reactive({})
  const showActorsCount = ref(5)
  const isShowActorsCountBtn = ref(true)
  const isCollection = ref(false)
  const movieCollection = ref(null)
  const isLoading = ref(true)
  
  onMounted(() => {
    store.state.movieBox.isMovieBox = true 
    window.addEventListener('keyup', EscListenter)
  })

  onMounted(() => {
    store.commit('setHistoryMovieIdList', route.params.id || route.query.id)
  })

  onMounted(() => {
    store.commit('getMovieId', route.params.id || route.query.id) // 提交電影的ID給Vuex處理目標路徑，傳參或是vuex管理movieID尚有缺陷，先使用判斷URL的方式傳參
    const targetPath = store.getters.movieData
    axios({url: targetPath})
    .then((res) => {
      getMovieInfo(res.data)
      if(res.data.belongs_to_collection) {
        isCollection.value = true
        movieCollection.value = res.data.belongs_to_collection.id
      }
      isLoading.value = false
    })
    .catch(() => {
      isLoading.value = false
      movieData.backdropPath = `url('/images/noImg.jpg')`
    })
  })

  onBeforeUnmount(() => {
    store.state.movieBox.isMovieBox = false // (X) 未經提交 直接更改了state？
    window.removeEventListener('keyup', EscListenter)
  })

  const getMovieInfo = function(movieInfo) {
    if(!movieInfo) return
    movieData.id = movieInfo.id
    movieData.title = movieInfo.title
    movieData.backdropPath = movieInfo.backdrop_path ? `url('${store.state.api.baseImgURL}${movieInfo.backdrop_path}')` : `url('/catch-movie/images/noImg.jpg')`
    movieData.originalTitle = movieInfo.original_title
    movieData.overview = movieInfo.overview
    movieData.releasDate = movieInfo.release_date
    movieData.tagline = movieInfo.tagline
    movieData.voteAverage = movieInfo.vote_average
    movieData.voteCount = movieInfo.vote_count
    movieData.creditsCast = movieInfo.credits.cast
    movieData.genres = movieInfo.genres
  }

  const closeMovieBox = function() {
    route.params.id ? router.push('/') : router.push(`/search?query=${route.query.query}`)
  }

  const EscListenter = function(e) {
    if(e.keyCode === 27) {
      closeMovieBox()
    }
  }

  const showAllActors = function() {
    showActorsCount.value = movieData.creditsCast.length
    isShowActorsCountBtn.value = false
  }

</script>

<style lang="scss" scoped>
  $bgBaseSize: 60px;

  .movieBox {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: center;

    .masking {
      position: absolute;
      top: 0;
      background-color: rgba(0,0,0,.6);
      width: 100vw;
      height: 100vh;
    }
    
    .movieWrap {
      z-index: 9;
      width: $bgBaseSize*16;
      height: 86vh;
      color: #fff;
      overflow: auto;
      background-color: #181818;

      .loagind {
        position: absolute;
        // top: 50%;
        left: 50%;
      }
    
      .bgImgWrap {
        height: $bgBaseSize*9;
        background-image: linear-gradient(to bottom, rgba(24, 24, 24, .0) 70%, rgba(24, 24, 24, 1) 100%), v-bind('movieData.backdropPath');
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;

        @media screen and (max-width: 900px) {
          height: calc(100vw / 15 * 9)
        }

        .closeBtn {
          width: 36px;
          height: 36px;
          border-radius: 50%;
          background-color: rgb(24, 24, 24);
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          position: absolute;
          top: 8px;
          right: 12px;
        }
      }

      .info {
        width: 100%;
        // height: 100%;
        padding: var(--moviebox-info-pd);


        .title {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          // @media screen and (max-width: 1000px){
          //   flex-direction: column;
          // }

          .movieName {
            font-size: var(--title-main-size);
            color: var(--title-main-color);
            font-weight: 700;
          }

          .genresList {
            .genres {
              font-variant-east-asian: traditional;
              border: 1px solid rgba(255, 255, 255, 0.446);
              color: rgba(255, 255, 255, 0.446);
              padding: 0 2px 0 2px;
              margin-left: 8px;
              font-size: 12px;
            }
          }
        }

        .originalName {
          font-size: 12px;
        }

        .dateAndVote {
          display: flex;
          justify-content: space-between;
          font-size: 12px;

          @media screen and (max-width: 1000px) {
            flex-direction: column;
          }

          .vote {
            color: #46d369;

            .voteNum {
              font-weight: 700;
              font-size: 16px;
            }
          }
        }

        .tagline {
          font-size: 14px;
          color: rgba(255, 255, 255, 0.745)
        }

        .overview {
          padding: 30px 0 30px 0;
          font-size: var(--moviebox-overview-font-size);
        }

        .actorsWrap {

          .actorsWrapTitle {
            font-weight: 700;
            margin-bottom: 8px;
          }

          .actorsList {
            display: flex;
            flex-wrap: wrap;
            align-items: center;

            .actor {
              margin-right: 20px;

              .actorName {
                padding: 0 6px 0 6px;
                border: 1px solid #fff;
                font-size: 14px;
                margin-bottom: 10px
              }
            }

            .checkAllActors {
              cursor: pointer;
              font-size: 12px;
              color: #777;
            }
          }
        }
      }
    }

  }
</style>