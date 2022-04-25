<template>
  <div class="movieList">
    <div class="title">{{title}}</div>
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
import { onMounted, reactive } from '@vue/runtime-core'

export default {
  props: ['title','targetPath', 'showDate'],
  setup(props) {
    const movieDataArr = reactive({})
    onMounted(
      axios({url: props.targetPath})
      .then((response) => {
        movieDataArr.value = response.data.results
      })
    )

    return {movieDataArr, props}
  }
}
</script>

<style lang="scss" scoped>
  .movieList {
    padding: 0 60px 0 60px;
    margin-top: 40px;

    .title {
      font-size: var(--title-main-size);
      color: var(--title-main-color);
      margin-bottom: var(--title-main-mb)
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
        min-width: 185px;
        // height: 356px;
        margin-right: 28px;
        cursor: pointer;
        color: #fff;
        text-decoration: none;

        .imgWrap {
          width: 185px;
          height: 278px;

          img {
            width: 100%;
            height: 100%;
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