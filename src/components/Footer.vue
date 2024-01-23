<template>
  <div class="footer">
    <div class="latestUpdate">
      最近更新：20220609 (v20220609 - 新增列表滾動按鈕，響應式的歷史瀏覽紀錄修正中)
    </div>
    <div class="powered">
      資料來源 <a href="https://developers.themoviedb.org/3" target="_blank">TMDB API</a>
    </div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>

  .footer {
    display: flex;
    justify-content: space-between;
    height: 15vh;
    padding: 20px 60px 0 60px;
    color: #fff;
    background-color: #050E12;
    border-top: 1px rgba(255, 255, 255, 0.089) solid;
    .powered {

      a {
        text-decoration: none;
        color: #fff;
        font-weight: 700;
      }
    }
  }

</style>