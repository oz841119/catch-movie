<template>
  <div class="movieList">
    <div class="title">{{title}}</div>
    <div v-if="noData" class="noData">無法取得資料</div>
    <ul class="list">
      <li class="listItem" v-for="item in movieDataArr.value" :key="item.id">
        <router-link :to="/movie/+item.id" class="movieWrap" v-if="item.poster_path">  <!-- API提供的資料會有圖片路徑為null的狀況，圖片路徑為null不做渲染  -->
          <div class="imgWrap">
            <img :src="`https://image.tmdb.org/t/p/w185/${item.poster_path}`" alt="">
          </div>
          <div class="movieName">{{item.title}}</div>
          <div class="date" v-if="props.showDate">{{item.release_date}}</div>
        </router-link>
      </li>
    </ul>
  </div>
</template>

<script>
import axios from 'axios'
import { onMounted, reactive, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'

export default {
  props: ['title','targetPath', 'showDate'],
  setup(props) {
    const movieDataArr = reactive([])
    const store = useStore()
    const noData = ref(false)
    onMounted(
      axios({url: props.targetPath})
      .then((response) => {
        movieDataArr.value = response.data.results
        store.commit('toggleIsPageLoading', false)
      })
      .catch(() => {
        noData.value = true
      })
    )

    return {movieDataArr, props, noData}
  }
}
</script>

<style lang="scss" scoped>
  .movieList {
    // padding: var(--movieList-wrap-pd);
    margin-bottom: 40px;

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
            height: var(--poster-h)
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