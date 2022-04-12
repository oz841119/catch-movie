<template>
  <div class="movieList">
    <div class="title">{{title}}</div>
    <ul class="list">
      <li v-for="item in moiveDataArr.value" :key="item.id">
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
    const moiveDataArr = reactive({})
    onMounted(
      axios({url: props.targetPath})
      .then((response) => {
        moiveDataArr.value = response.data.results
        console.log(moiveDataArr.value);
      })
    )

    return {moiveDataArr, props}
  }
}
</script>

<style lang="scss" scoped>
  .movieList {
    padding: 0 60px 0 60px;
    margin-top: 40px;

    .title {
      font-size: 32px;
      color: #fff;
      margin-bottom: 18px;
    }

    .list {
      display: flex;
      color: #fff;
      overflow: auto;
      &::-webkit-scrollbar {display:none}

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
          font-size: 14px;
          text-align: center;
          margin-top: 8px;
        }
      }

    }
  }
</style>