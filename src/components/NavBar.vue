<template>
  <div class="navBar">
    <div class="title">Catch Movie</div>
    <Search/>
  </div>
</template>

<script>
import Search from './Search'
export default {
  components: {
    Search
  },
}
</script>

<style lang="scss" scoped>
  .navBar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 10vh;
    padding: 0 60px 0 60px;
    background-color: #1A1F38;

    @media screen and (max-width: 800px) {
      height: 50px;
    }

    .title {
      color: #fff;
      font-weight: 700;
      font-size: 36px;
    }
  }
</style>