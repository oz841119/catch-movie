<template>
  <div class="navBar">
    <a class="title" href="./">
      <img src="../assets/images/logo.png" alt="">
    </a>
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
    height: var(--nav-wrap-h);
    padding: var(--nav-wrap-pd);
    background-color: #1A1F38;

    .title {
      display: flex;
      align-items: center;
      color: #fff;
      font-weight: 700;
      font-size: var(--title-web-size);
      height: var(--nav-wrap-h);
      cursor: pointer;

      img {
      height: 60%;
    }
    }
  }
</style>