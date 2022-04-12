<template>
  <div class="home">
    <MovieList title="熱門電影" :targetPath="storeGetters.popularity"/>
    <MovieList title="榜上佳片" :targetPath="storeGetters.voteAverage"/>
    <MovieList title="即將上映" showDate="true" :targetPath="storeGetters.comingSoon"/>
    <MovieList title="已上映" showDate="true" :targetPath="storeGetters.newRelease"/>
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue'
import { useStore } from 'vuex'
export default {
  components: {
    MovieList
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