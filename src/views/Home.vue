<template>
  <div class="home">
    <!-- <Banner :targetPath="storeGetters.newRelease"/> -->
    <div>
      <MovieList title="本週熱門" :targetPath="storeGetters.weekHot"/>
      <MovieList title="榜上佳片" :targetPath="storeGetters.voteAverage"/>
      <MovieList title="即將上映" showDate="true" :targetPath="storeGetters.comingSoon"/>
      <MovieList title="已上映" showDate="true" :targetPath="storeGetters.newRelease"/>
    <router-view :key="route.currentRoute.value.path"/>
    </div>
  </div>
</template>

<script>
import MovieList from '../components/MovieList.vue'
import Banner from '../components/Banner.vue'
import { useRouter } from "vue-router";
import { useStore } from 'vuex'
export default {
  components: {
    MovieList,
    Banner
  },
  setup() {
    const route = useRouter()
    const store = useStore()
    const storeGetters = useStore().getters
    return { 
      storeGetters,
      store,
      route
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    background-color: var(--bg-main-color);
  }
</style>