<template>
  <div class='home'>
    <nav>
      <logo></logo>
      <h2 class="top-50px" @click="$router.push('/')">文字转图片</h2>
      <h2 @click="$router.push('/marstext')">
        文字转火星文
      </h2>
      <h2 @click="$router.push('/dancetext')">文字转倾斜</h2>
    </nav>
    <section>
      <router-view></router-view>
    </section>
  </div>
</template>

<script>
import Logo from "./components/Logo";
import "@/utils/wrapText.js";

export default {
  components: {
    Logo
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  margin: auto;

  .control-button {
    width: fit-content;
    margin: 20px auto;
    display: flex;
  }
  nav {
    width: 200px;
    height: 100vh;
    position: fixed;
    left: 0;
    top: 0;
    // background: red;
    h2 {
      font-size: 1em;
      text-align: center;
      padding: 0.42rem 1.375rem;
      margin: 0;
      &.top-50px {
        margin-top: 70px;
      }
      &:hover {
        background: #eeeeee;
      }
    }
  }
  section {
    margin-left: 200px;
  }
}
</style>

<style>
* {
  margin: 0;
  padding: 0;
}
nav::after {
  box-shadow: 2px 0 3px 0 rgb(0 0 0 / 7%);
  display: block;
  position: fixed;
  top: 0;
  left: 198px;
  color: rgba(0, 0, 0, 0.07);
  content: "";
  height: 100%;
  width: 2px;
}
</style>
