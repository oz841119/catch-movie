<template>
  <div class="search">
    <input class="inp" type="text">
    <div class="serachIconWrap"><i class="uil uil-search searchIcon"></i></div>
  </div>
</template>

<script>
export default {

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
      font-size: 24px;
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