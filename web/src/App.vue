<template>
  <div id="app">
    <logo></logo>
    <h2>
      在微博 / QQ /
      微信上，某些文字发不出去？转成图片也发不出去？那你一定是没用此工具
    </h2>
    <div class="control-button">
      <el-row>
        <el-button @click="$router.push('/')" size="small" round
          >文字转图片</el-button
        >
        <el-button @click="$router.push('/marstext')" size="small" round
          >文字转火星文</el-button
        >
      </el-row>
    </div>
    <div class="sketchpad">
      <router-view></router-view>
    </div>
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
#app {
  width: 100%;
  margin: auto;
  h2 {
    font-size: 1.3em;
    margin: 2.5em auto 1.3em auto;
    text-align: center;
  }

  .control-button {
    width: fit-content;
    margin: 20px auto;
    display: flex;
  }
}
</style>
