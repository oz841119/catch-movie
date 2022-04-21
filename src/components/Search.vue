<template>
  <div class="search">
    <input class="inp" id="inp" type="search" placeholder="輸入電影名稱"> 
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
    width: 475px;
    height: 38px;
    background-color: rgba(196, 196, 196, .3);
    border-radius: 8px;
    padding: 0 28px 0 28px;

    .inp {
      width: 100%;
      height: 100%;
      background-color: rgba(196, 196, 196, 0);
      font-size: 20px;
      color: #fff;
    }

    .serachIconWrap {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 38px;
      height: 38px;
      cursor: pointer;

      .searchIcon {
        font-size: 28px;
        color: #fff;
      }
    }
  }
</style>