<template>
  <div class="search">
    <input class="inp" id="inp" type="search" placeholder="輸入電影名稱" autocomplete="off" v-on:keyup.enter="submit()">
    <div class="serachIconWrap" @click="submit()" value=""><i class="uil uil-search searchIcon"></i></div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { useRouter } from "vue-router";
export default {
  setup() {
    const store = useStore()
    const router = useRouter()
    const submit = function() {
      let searchContent = inp.value
      console.log('Submit');
      router.push({ path: `search`, query: { query: searchContent }}) 
    }

    return { submit }
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
</style>