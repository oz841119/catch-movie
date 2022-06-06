<template>
  <div class="historyList">
    <div class="title">{{title}}
      <span class="clean_history" @click="cleanHistory">清空</span>
    </div>
    <div v-if="noData" class="noData">無法取得資料</div>
    <div class="_loader" v-show="isLoading"></div>
    <ul class="list">
      <li class="listItem" v-for="item in movieDataArr" :key="item.id">
        <router-link :to="/movie/+item.id" class="movieWrap" v-if="item.poster_path"> 
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
import { onMounted, reactive, ref } from '@vue/runtime-core'
import { useStore } from 'vuex'
import '../assets/style/loader.css'

export default {
  props: ['title','targetPath', 'showDate'],
  setup(props) {
    const movieDataArr = reactive([])
    const store = useStore()
    const noData = ref(false)
    const isLoading = ref(false)

    onMounted(() => {
      store.commit('getHistoryMovieIdList')
    })

    onMounted(() => { // getMovie返回一個帶有結果的Promise
      store.dispatch('getMovie').then((res) => {
        res.forEach(movie => {
          movieDataArr.push(movie.data)
        });
      })
    })

    const cleanHistory = () => {
      store.commit('cleanHistory')
    }
    return {movieDataArr, props, noData, isLoading, cleanHistory}
  }
}
</script>

<style lang="scss" scoped>
  .historyList {
    // padding: var(--movieList-wrap-pd);
    margin-bottom: 40px;
    .title {
      font-size: var(--title-main-size);
      color: var(--title-main-color);
      margin-bottom: var(--title-main-mb);

      .clean_history {
        font-size: var(--sub-font-size);
        color: rgba(255, 255, 255, 0.579);
        border: 1px solid rgba(255, 255, 255, 0.579);
        padding: 1px 2px;
        cursor: pointer;
      }
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