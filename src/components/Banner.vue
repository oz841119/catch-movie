<template>
  <div class="banner">
    <div class="img" :style="`background-image: url(${imgURL})`"></div>
    <!-- <img class="img" :src="imgURL" alt=""> -->
  </div>
</template>

<script>
import axios from 'axios'
import { useStore } from 'vuex'
import { onMounted, reactive, ref} from '@vue/runtime-core'

export default {
  props: ['targetPath'],
  setup(props) {
    const storeState = useStore().state
    const movie = reactive({})
    let imgURL = ref('') 

    onMounted(() => { getMovie() })

    const getMovie = function() {
      axios({url: props.targetPath})
      .then((response) => {
        let counter = 0 // 計數器： 避免無限遞歸
        function getTarget() {
          movie.value = response.data.results[Math.round(Math.random()*19)]
          imgURL.value = `${storeState.api.baseImgURL}${movie.value.backdrop_path}`
          if(!movie.value.backdrop_path && counter < 50) {
            counter++
            return getTarget() // API回傳的資料不一定有背景海報圖，如果沒有的話則遞歸調用，並且開一個計數器避免運氣真的相當不好的時候無限遞歸...
          }
        }
        getTarget()
      })
    }
    return {movie, imgURL}
  }
}
</script>

<style lang='scss' scoped>
  .banner {
    color: #fff;

    .img {
      width: 32vw;
      height: 32vh;
      background-position: center center;
      background-repeat: no-repeat;
      background-size: auto 100%;
      // box-shadow: 0px 0px 100px 70px #050E12 inset;
    }
  }
</style>