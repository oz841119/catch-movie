<template>
  <div class="movieList">
    <div class="title">{{title}}</div>
    <div v-if="noData" class="noData">無法取得資料</div>
    <div class="_loader" v-show="isLoading"></div>
    <ul class="list" ref="list" @scroll="judgeScrollLimit">
      <li class="listItem" v-for="item in movieDataArr.value" :key="item.id">
        <router-link :to="/movie/+item.id" class="movieWrap" v-if="item.poster_path">  <!-- API提供的資料會有圖片路徑為null的狀況，圖片路徑為null不做渲染  -->
          <div class="imgWrap">
            <img :src="`https://image.tmdb.org/t/p/w185/${item.poster_path}`" alt="">
          </div>
          <div class="movieName">{{item.title}}</div>
          <div class="date" v-if="props.showDate">{{item.release_date}}</div>
        </router-link>
      </li>
      <span class="arrow_wrap" v-show="isLeftScrollLimit" @click="nextMovies('left')">
        <i class="uil uil-angle-left-b arrow_icon"></i>
      </span>
      <span class="arrow_wrap arrow_right20" v-show="isRightScrollLimit" @click="nextMovies('right')">
        <i class="uil uil-angle-right-b arrow_icon"></i>
      </span>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive, ref, watch } from '@vue/runtime-core'
import { useStore } from 'vuex'
import '../assets/style/loader.css'

export default {
  props: ['title','targetPath', 'showDate'],
  setup(props) {
    const movieDataArr = reactive([])
    const store = useStore()
    const noData = ref(false)
    const isLoading = ref(true)
    let list = ref(null)

    // -- 捲軸滾動邏輯 Start --
    let isLeftScrollLimit = ref(false)
    let isRightScrollLimit = ref(true)

    const judgeScrollLimit = function() {
      list.value.scrollLeft ? isLeftScrollLimit.value = true : isLeftScrollLimit.value = false
      list.value.scrollLeft + list.value.clientWidth >= list.value.scrollWidth 
        ? isRightScrollLimit.value = false 
        : isRightScrollLimit.value = true
    }

    const nextMovies = function(direction) {
      if(direction === 'right') list.value.scrollLeft += list.value.clientWidth // 當前滾軸向右偏移
      if(direction === 'left') list.value.scrollLeft -= list.value.clientWidth // 當前滾軸向左偏移
    }
    // 捲軸滾動邏輯 End

    onMounted(
      axios({url: props.targetPath})
      .then((response) => {
        movieDataArr.value = response.data.results
        isLoading.value = false
      })
      .catch(() => {
        noData.value = true
        isLoading.value = false
      })
      .then(() => { // 渲染完資料後判斷是否具有滾動條
        judgeScrollLimit()
      })
    )


    return {movieDataArr, props, noData, isLoading, nextMovies, list, isLeftScrollLimit, isRightScrollLimit, judgeScrollLimit}
  }
}
</script>

<style lang="scss" scoped>
  .movieList {
    // padding: var(--movieList-wrap-pd);
    margin-bottom: 40px;
    position: relative;
    .title {
      font-size: var(--title-main-size);
      color: var(--title-main-color);
      margin-bottom: var(--title-main-mb);
    }

    .noData {
      font-size: 12px;
      color: rgba(255, 255, 255, 0.61);

    }

    .list {
      display: flex;
      color: #fff;
      overflow: auto;
      &::-webkit-scrollbar {display:none}
      scroll-behavior: smooth;

      .arrow_wrap {
        position: absolute;
        top: 45%;
        left: 20px;
        width: 30px;
        height: 30px;
        background-color: rgba(93, 93, 93 , .8);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;

        &:hover {
          background-color: rgba(93, 93, 93 , 1);
        }
        .arrow_icon {
          font-size: 30px;
        }
      }

      .arrow_right20 {
        left: unset;
        right: 20px;
      }

      .listItem {
        margin-right: 16px;
      }

      .movieWrap {
        width: var(--movie-wrap-w);
        margin-right: var(--movie-wrap-mr);
        cursor: pointer;
        color: #fff;
        text-decoration: none;

        .imgWrap {
          width: var(--movie-wrap-w);
          height: var(--poster-h);

          img {
            width: var(--movie-wrap-w);
            height: var(--poster-h);
            transition: .3s ease;
            border-radius: var(--poster-border-radius);
            
            &:hover {
              transform: translate(3px, 3px);
            }
          }
        }

        .date {
          text-align: center;
          font-size: 12px;
          color: rgba(255, 255, 255, 0.634);
        }
        
        .movieName {  
          text-align: center;
          font-size: var(--movie-name-size);
          margin-top: var(--movie-name-mt);
        }
      }
    }
  }
</style>