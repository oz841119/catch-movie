<template>
  <div class="home">
    <MovieList title="熱門電影"/>
    <MovieList title="榜上佳片"/>
    <MovieList title="榜上佳片"/>
    <MovieList title="榜上佳片"/>
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue'
export default {
  components: {
    MovieList
  },
}
</script>

<style lang="scss" scoped>
  .home {
    background-color: #050E12;
    padding-top: 50px;
  }
</style>