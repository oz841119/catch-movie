<template>
  <div class="home">
    <MovieList title="熱門電影" :targetPath="`${apiStore.baseURL}/discover/movie?${apiStore.key}${apiStore.popularity}`"/>
    <MovieList title="榜上佳片" :targetPath="`${apiStore.baseURL}/discover/movie?${apiStore.key}${apiStore.voteAverage}`"/>
    <MovieList title="最新上映" :targetPath="`${apiStore.baseURL}/discover/movie?${apiStore.key}${apiStore.release}`"/>
    <!-- <MovieList title="榜上佳片"/> -->
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
    const store = useStore()
    const apiStore = store.state.api
    return{ apiStore }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    background-color: #050E12;
    padding-top: 50px;
  }
</style>