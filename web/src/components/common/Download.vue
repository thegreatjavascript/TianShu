<template>
  <img
    class="download-icon"
    src="../../assets/download.png"
    @click="downloadImage"
  />
</template>

<script>
// 用户点击该组件，会将 canvas 元素转换成图片，然后自动下载图片。
// 需要传递两个属性：canvas 元素的 CSS 选择器，图片文件名称（非必传）

import { download } from "../../utils";

export default {
  props: ["canvasSelector", "fileName"],
  methods: {
    downloadImage() {
      download(this.canvasSelector, this.fileName);
    }
  }
};
</script>

<style scoped>
.download-icon {
  width: 50px;
  display: block;
  position: fixed;
  left: 50%;
  bottom: 50px;
}
</style>
