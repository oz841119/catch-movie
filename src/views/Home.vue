<template>
  <div class="home">
    <!-- <Banner :targetPath="storeGetters.newRelease"/> -->
    <MovieList title="本週熱門" :targetPath="storeGetters.weekHot"/>
    <MovieList title="榜上佳片" :targetPath="storeGetters.voteAverage"/>
    <MovieList title="即將上映" showDate="true" :targetPath="storeGetters.comingSoon"/>
    <MovieList title="已上映" showDate="true" :targetPath="storeGetters.newRelease"/>
    <router-view></router-view>
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue'
import Banner from '../components/Banner.vue'

import { useStore } from 'vuex'
export default {
  components: {
    MovieList,
    Banner
  },
  setup() {
    const storeGetters = useStore().getters
    return{ storeGetters }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    background-color: #050E12;
    padding-top: 50px;
  }
</style>