<template>
  <div class="notFound">
    搜索路徑錯誤，{{timing}}秒後將跳轉至首頁。
    <router-link to="/" class="link" @click="resetToZero">立即跳轉</router-link>
  </div>
</template>

<script>
  import {onMounted, ref} from '@vue/runtime-core'
  import { useRouter } from "vue-router";
  export default {
    setup() {
      const router = useRouter()
      let timing = ref(5)

      onMounted(countdown)

      function countdown() {
        if(timing.value <= 0) {
          router.push({path: '/'})
          return
        }

        setTimeout(() => {
          --timing.value
          countdown()
        },1000)
      }

      function resetToZero() {
        timing.value = 0
      }


      return { timing, resetToZero}
    }
  }

</script>

<style scoped lang="scss">
  .notFound {
    color: #fff;

    .link {
      color: rgba(255, 255, 255, 0.533);
      border-bottom: 1px solid rgba(255, 255, 255, 0.533);
    }
  }

</style>