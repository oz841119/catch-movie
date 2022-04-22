<template>
  <div class="app">
    <NavBar/>
    <router-view></router-view>
    <Footer/>
  </div>
</template>
<script>
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
import './assets/style/reset.css'
import { watch } from '@vue/runtime-core'
import { useStore } from "vuex";
import './assets/style/base.css'

export default {
  components: {
    NavBar,
    Footer
  },

  setup() {
    const store = useStore()
    watch(() => store.state.movieBox.isMovieBox,
    () => {
      if(store.state.movieBox.isMovieBox) {
          let m = function(e){e.preventDefault();};
          document.body.style.overflow='hidden';
          document.addEventListener("touchmove",m,{ passive:false });
      } else {
          let m =function(e){e.preventDefault();};
          document.body.style.overflow='';
          document.removeEventListener("touchmove",m,{ passive:true });
      } 
    })
    return {  }
  }
}
</script>

<style scoped>
  
</style>