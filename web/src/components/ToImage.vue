<template>
  <div class="container">
    <ToolSide>
      <!-- 经过测试：0px ~ -5px 是人能看的范围，太小人眼不好辨认 -->
      <!-- 放大10倍 -->
      <p>文字间距：</p>
      <input
        type="range"
        min="0"
        max="50"
        value="20"
        @input="letterSpacingChanged"
      />
      <p>文字高度：</p>
      <!-- 放大10倍 -->
      <input
        type="range"
        min="0"
        max="50"
        value="10"
        @input="textHeightChanged"
      />
      <p>文字宽度：</p>
      <!-- 放大10倍 -->
      <input
        type="range"
        min="0"
        max="50"
        value="10"
        @input="textWidthChanged"
      />
      <p>文字粗细：</p>
      <input
        type="range"
        min="1"
        max="9"
        value="4"
        @input="fontWeightChanged"
      />
      <p>文字大小：</p>
      <input
        type="number"
        min="0"
        max="30"
        value="15"
        @change="fontSizeChanged"
      />
      <!-- <p>字体大小：</p>
      <p>
        <input
          type="number"
          min="0"
          max="30"
          value="15"
          @change="fontSizeChanged"
        /><span>px</span>
      </p> -->
    </ToolSide>
    <div class="sketchpad">
      <textarea class="content" v-model="content"></textarea>
      <div class="result">
        <canvas
          id="canvas"
          style="display:block"
          width="300"
          height="500"
        ></canvas>
        <img id="image" :src="image" />
      </div>
    </div>
    <download :canvasSelector="'#canvas'"></download>
  </div>
</template>

<script>
import "@/utils/wrapText.js";
import ToolSide from "./common/ToolSide";
import Download from "./common/Download";

export default {
  data() {
    return {
      content:
        "时势造英雄。当年web网页都是以图文展示为主，所以门户，博客这些网站兴起。而SVG擅长的是图形展示，对于文本呈现，只能嘿嘿一下，跟CSS相比那可就弱了几条街。举个最简单的效果，文本换行。在CSS下，当我们一段文字很长的时候，是会自动换到下一行的，但是在SVG中，基本上就是要手动控制换行，对于新闻、博客展示而言简直就是噩梦。",
      style: {
        letterSpacing: "0px",
        fontSize: "20px",
        fontWeight: "400",
        textHeight: 1, // 文字高度
        textWidth: 1, // 文字宽度
        skewX: "0deg" // 倾斜角度，正是向左。
      },
      image: ""
    };
  },
  watch: {
    style: {
      handler() {
        this.drawText();
      },
      deep: true
    }
  },
  mounted() {
    this.drawText();
  },
  methods: {
    fontSizeChanged(event) {
      const value = event.target.value;
      this.style.fontSize = value + "px";
    },
    fontWeightChanged(event) {
      this.style.fontWeight = event.target.value * 100;
    },
    textHeightChanged(event) {
      const value = event.target.value / 10;
      this.style.textHeight = value <= 0.2 ? 0.2 : value;
    },
    textWidthChanged(event) {
      const value = event.target.value / 10;
      this.style.textWidth = value <= 0.2 ? 0.2 : value;
    },
    // 目标：0 ～ -5
    // 实际：0 ～ 50
    // 所以是放大了10倍，且需要正负反转
    letterSpacingChanged(event) {
      const value = event.target.value;
      this.style.letterSpacing = -value / 10 + "px";
    },
    drawText() {
      // 把字符画到 canvas 中
      // const text = document.querySelector(".content");
      const canvas = document.querySelector("#canvas");
      const ctx = canvas.getContext("2d");

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.style.letterSpacing = this.style.letterSpacing;
      ctx.scale(this.style.textWidth, this.style.textHeight);
      ctx.rotate((0 * Math.PI) / 180);
      ctx.font = `${this.style.fontWeight} ${this.style.fontSize} serif`;
      ctx.textBaseline = "top";
      ctx.textAlign = "left";

      ctx.beginPath();
      ctx.wrapText(this.content, 0, 0);
    }
  },
  components: {
    ToolSide,
    Download
  }
};
</script>

<style lang="scss">
.container {
  width: calc(100% - 210px);
  margin-left: 210px;
  height: 100vh;
  .sketchpad {
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: space-around;
    .content,
    .result {
      padding: 10px;
      width: 246px;
      min-height: 400px;
    }
  }
}
</style>
