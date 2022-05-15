<template>
  <form class="search" :class="{'errBounce': isErrBounce, 'noneBdBottom': isSearchHistory}" @submit.native.prevent>
    <input class="inp" id="inp" v-model="inpValue" ref="inpRef" type="search" placeholder="輸入電影名稱" autocomplete="off" @focus="checkInpValue()" @blur="blurFn()" @submit.native.prevent>
    <div class="serachIconWrap" @click="submit()" value=""><i class="uil uil-search searchIcon"></i></div>
    <input class="inputSubmit" type="submit" @click="submit()"> <!-- display: none 提供用戶按下Enter時提交表單用 -->

    <div>
      <ul class="searchHistory" v-show="isSearchHistory">
        <li class="searchHistoryItem" @click="changeSearchContent(item) ; submit()" v-for="item in searchHistory" :key="item">
          <i class="uil uil-history historyIcon"></i>
          <div class="fastSearchContent">{{item}}</div>
        </li>
      </ul>

      <ul class="searchHistory" v-show="isFastSearch">
        <li class="searchHistoryItem" @click="changeSearchContent(item) ; submit()" v-for="item in fastSearch" :key="item">
          <i class="uil uil-search historyIcon"></i>
          <div class="fastSearchContent">{{item}}</div>
        </li>
      </ul>

    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
import { reactive, ref, watch, } from "vue";
import axios from "axios"
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    let inpRef = ref(null)
    let inpValue = ref('')

    let isErrBounce = ref(false)

    let isSearchHistory = ref(false)
    let searchHistory = ref([])

    let isFastSearch = ref(false)
    const fastSearch = reactive([])

    const submit = function() {
      let searchContent = inp.value.trim()
      console.log(searchContent);
      if(!searchContent) {
        isErrBounce.value = true
        inp.value = ''
        setTimeout(() => {
          isErrBounce.value = false
        },800)
        return
      }

      setSearchHistory(JSON.parse(localStorage.getItem('searchHistory')), searchContent)

      router.push({ path: `search`, query: { query: searchContent }}) 
      inp.value = ''
      inpRef.value.blur()
    }

    const setSearchHistory = function(localStorageArr, searchContent) {
      if(!(localStorageArr instanceof Array)) {
        localStorageArr = []
      }
      localStorageArr.unshift(searchContent)
      if(localStorageArr.length > 10) {
        localStorageArr.length = 10
      }
      localStorage.setItem('searchHistory',JSON.stringify(localStorageArr))
    }

    const blurFn = function() {
      setTimeout(() => { // 使失焦時Click先執行後才隱藏，但參數設為0ms有機率失效，原因待查
        isSearchHistory.value = false
        isFastSearch.value = false
      }, 100);
    }

    const changeSearchContent = function(item) {
      inp.value = item
    }

    const checkInpValue = function() {
      if(inpValue.value) {
        isSearchHistory.value = false
        isFastSearch.value = true
        getMoviesName()
      } else {
        isSearchHistory.value = true
        isFastSearch.value = false
      }
    }

    const getMoviesName = function() {
      store.dispatch('getSearchURL', inp.value.trim())
      .then(URLres => {
        axios({url: URLres})
        .then(APIres => {
          const res = APIres.data.results
          fastSearch.length = 0
          res.forEach(item => {
            fastSearch.push(item.title)
          })
        })
      })
      console.log(fastSearch);
    }

    watch(isSearchHistory, function() {
      if(isSearchHistory) {
        searchHistory.value = Array.from(new Set(JSON.parse(localStorage.getItem('searchHistory'))))
      }
    })
    
    watch(inpValue, function() {
      fastSearch.length = 0
      if(inpValue.value) {
        getMoviesName()
        isSearchHistory.value = false
        isFastSearch.value = true
      } else {
        isSearchHistory.value = true
        isFastSearch.value = false
      }
    })

    return { submit, isErrBounce, isSearchHistory, searchHistory, blurFn, changeSearchContent, inpRef, inpValue, checkInpValue, isFastSearch, fastSearch }
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
      z-index: 99;

      .searchHistoryItem {
        padding: 0 6px 0 12px;
        border-bottom: 1px solid rgb(170, 170, 170);
        height: 26px;
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: var(--movie-name-size);

        &:hover {
          background-color: rgba(158, 158, 158, 0.319);
        }

        &:last-child{
          border-bottom: none;
        }

        .historyIcon {
          margin-right: 6px;
        }

        .fastSearchContent {
          white-space: nowrap;  
          text-overflow:ellipsis; 
          overflow:hidden;
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