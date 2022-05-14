<template>
  <form class="search" :class="{'errBounce': isErrBounce, 'noneBdBottom': isSearchHistory}" @submit.native.prevent>
    <input class="inp" id="inp" type="search" placeholder="輸入電影名稱" autocomplete="off" @focus="isSearchHistory = true" @blur="isSearchHistory = false" @submit.native.prevent>
    <div class="serachIconWrap" @click="submit()" value=""><i class="uil uil-search searchIcon"></i></div>
    <input class="inputSubmit" type="submit" @click="submit()"> <!-- display: none 提供用戶按下Enter時提交表單用 -->

    <div class="searchHistory" v-show="isSearchHistory">
      <div class="searchHistoryItem">123</div>
      <div class="searchHistoryItem">123</div>
      <div class="searchHistoryItem">123</div>
      <div class="searchHistoryItem">123</div>
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { ref, watch } from "vue";
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    let isErrBounce = ref(false)
    let isSearchHistory = ref(false)
    
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

      console.log(JSON.parse(localStorage.getItem('searchHistory')));
      setSearchHistory(JSON.parse(localStorage.getItem('searchHistory')), searchContent)

      router.push({ path: `search`, query: { query: searchContent }}) 
      inp.value = ''
    }

    const setSearchHistory = function(localStorageArr, searchContent) {
      if(!(localStorageArr instanceof Array)) {
        localStorageArr = []
        console.log(localStorageArr);
      }
      localStorageArr.push(searchContent)
      localStorage.setItem('searchHistory',JSON.stringify(localStorageArr))
    }

    watch(isSearchHistory, function() {
      console.log(this);
    })

    return { submit, isErrBounce, isSearchHistory }
  }
}
</script>

<style lang="scss" scoped>
  .search {
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: var(--input-wrap-w);
    height: 60%;
    // background-color: rgb(191, 191, 191);
    border: 1px #fff solid;
    border-radius: 8px;

    .inp {
      width: 100%;
      height: 100%;
      padding: 0 6px 0 12px;
      background-color: transparent;
      font-size: var(--input-font-size);
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
        font-size: var(--input-font-size);
        color: #fff;
      }
    }

    .searchHistory {
      position: absolute;
      color: rgb(0, 0, 0);
      left: -1px;
      top: 100%;
      width: var(--input-wrap-w);
      border: 1px solid #fff;
      border-radius: 0 0 8px 8px;
      background-color: rgb(255, 255, 255);

      .searchHistoryItem {
        padding: 0 6px 0 12px;
        border-bottom: 1px solid rgb(170, 170, 170);
        height: 26px;
        display: flex;
        align-items: center;

        &:hover {
          background-color: rgba(158, 158, 158, 0.319);
        }

        &:last-child{
          border-bottom: none;
        }
      }
    }
  }

  .noneBdBottom {
    border-bottom: none;
    border-radius: 8px 8px 0 0;
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