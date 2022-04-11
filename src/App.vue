<template>
  <NavBar/>
  <router-view></router-view>
  <div id="footer"></div>
</template>
<script>
import NavBar from './components/NavBar.vue'
import './assets/style/reset.css'
export default {
  components: {
    NavBar
  },
}
</script>

<style>

</style>