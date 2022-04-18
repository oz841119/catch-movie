<template>
  <div class="movieBox">
    <div class="masking"></div>
    <div class="movieWrap">
      <div class="bgImgWrap">
        <div class="closeBtn" @click="closeMovieBox()">X</div>
      </div>
      <div class="info">
        <div class="title">
          <div class="movieName">{{movieData.title}}</div>
          <div class="genresList">
            <span class="genres" v-for="genres in movieData.genres" :key="genres.id">{{genres.name}}</span>
          </div>
        </div>
        <div class="originalName">( {{movieData.originalTitle}} )</div>
        <div class="dateAndVote">
          <div class="releasDate">上映日期： {{movieData.releasDate}}</div>
          <div class="vote">從 {{movieData.voteCount}} 個評分內，平均獲得 <span class="voteNum">{{movieData.voteAverage}}</span> 分。</div>
        </div>
        <div class="tagline">{{movieData.tagline ? movieData.tagline : '未有資料'}}</div>
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

  const store = useStore()
  const router = useRouter()
  const movieData = reactive({})
  const showActorsCount = ref(5)
  const isShowActorsCountBtn = ref(true)
  const isCollection = ref(false)
  const movieCollection = ref(null)
  
  onMounted(() => { 
    store.state.movieBox.isMovieBox = true 
  })

  onMounted(() => {
    store.commit('getMovieId',useRoute().params.id) // 提交電影的ID給Vuex處理目標路徑
    const targetPath = store.getters.movieData
    axios({url: targetPath}).then((res) => {
      getMovieInfo(res.data)
      console.log(res.data);
      if(res.data.belongs_to_collection) {
        isCollection.value = true
        movieCollection.value = res.data.belongs_to_collection.id
      }
    })
  })

  onBeforeUnmount(() => {
    store.state.movieBox.isMovieBox = false
  })

  const getMovieInfo = function(movieInfo) {
    if(!movieInfo) return
    movieData.id = movieInfo.id
    movieData.title = movieInfo.title
    movieData.backdropPath = movieInfo.backdrop_path ? `url('${store.state.api.baseImgURL}${movieInfo.backdrop_path}')` : `url('https://i.stack.imgur.com/6M513.png')`
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
    router.go(-1)
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

      .bgImgWrap {
        height: $bgBaseSize*9;
        background-image: linear-gradient(to bottom, rgba(24, 24, 24, .0) 70%, rgba(24, 24, 24, 1) 100%), v-bind('movieData.backdropPath');
        background-size: contain;
        background-repeat: no-repeat;
        position: relative;

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
        padding: 0 46px 0 46px;

        .title {
          display: flex;
          align-items: flex-end;
          justify-content: space-between;

          .movieName {
            font-size: 36px;
            font-weight: 700;
          }

          .genresList {
            .genres {
              border: 1px solid #fff;
              padding: 0 2px 0 2px;
              margin-left: 8px;
              font-size: 12px;
            }
          }
        }

        .dateAndVote {
          display: flex;
          justify-content: space-between;
          font-size: 12px;

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
          font-size: 14px;
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