<template>
  <NavBar/>
  <router-view></router-view>
  <Footer/>
</template>
<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import './assets/style/reset.css'

export default {
  components: {
    NavBar,
    Footer
  },
}
</script>

<style>

</style>