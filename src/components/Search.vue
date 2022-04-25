<template>
  <form class="search" :class="{'errBounce': isErrBounce}" @submit.native.prevent>
    <input class="inp" id="inp" type="search" placeholder="輸入電影名稱" autocomplete="off" @submit.native.prevent>
    <div class="serachIconWrap" @click="submit()" value=""><i class="uil uil-search searchIcon"></i></div>
    <input class="inputSubmit" type="submit" @click="submit()"> <!-- display: none 提供用戶按下Enter時提交表單用 -->
  </form>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref } from "vue";
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    let isErrBounce = ref(false)
    
    const submit = function() {
      let searchContent = inp.value.trim()

      if(!searchContent) {
        isErrBounce.value = true
        inp.value = ''
        setTimeout(() => {
          isErrBounce.value = false
        },800)
        return
      }

      router.push({ path: `search`, query: { query: searchContent }}) 
      inp.value = ''
    }

    return { submit, isErrBounce }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 300px;
    height: 34px;
    // background-color: rgb(191, 191, 191);
    border: 1px #fff solid;
    border-radius: 8px;

    .inp {
      width: 100%;
      height: 100%;
      padding: 0 6px 0 12px;
      background-color: transparent;
      font-size: 14px;
      color: #fff;

      &::placeholder {
        color: rgba(255, 255, 255, 0.715);
      }
    }

    .serachIconWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      cursor: pointer;
      margin-right: 12px;

      .searchIcon {
        font-size: 20px;
        color: #fff;
      }
    }
  }

  .inputSubmit {
    display: none;
  }

  // 輸入框錯誤提示
  .errBounce {
    animation: shake 800ms ease-in-out;
    border: 1px rgb(255, 86, 86) solid;
  }

  @keyframes shake {
    10%, 90% { transform: translate3d(-1px, 0, 0) }
    20%, 80% { transform: translate3d(+2px, 0, 0) }
    30%, 70% { transform: translate3d(-4px, 0, 0) }
    40%, 60% { transform: translate3d(+4px, 0, 0) }
    50% { transform: translate3d(-4px, 0, 0) }
  }
</style>