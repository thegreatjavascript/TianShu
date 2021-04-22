<template>
  <div class="container">
    <ToolSide>
      <!-- 经过测试：0px ~ -5px 是人能看的范围，太小人眼不好辨认 -->
      <p>文字间距：</p>
      <input type="range" min="0" max="50" value="20" @input="sliderChanged" />
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
        <canvas id="canvas" style="display:block" width="0" height="0"></canvas>
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
        "暮投石壕村，有吏夜捉人。老翁逾墙走，老妇出门看。吏呼一何怒！妇啼一何苦。听妇前致词，三男邺城戍。一男附书至，二男新战死。存者且偷生，死者长已矣！室中更无人，惟有乳下孙。有孙母未去，出入无完裙。老妪力虽衰，请从吏夜归。急应河阳役，犹得备晨炊。夜久语声绝，如闻泣幽咽。天明登前途，独与老翁别。",
      style: {
        letterSpacing: "-2px",
        fontSize: "20px",
        fontWeight: "400"
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
  methods: {
    fontSizeChanged(event) {
      const value = event.target.value;
      this.style.fontSize = value + "px";
    },
    // 目标：0 ～ -5
    // 实际：0 ～ 50
    // 所以是放大了10倍，且需要反转
    sliderChanged(event) {
      const value = event.target.value;
      this.style.letterSpacing = -value / 10 + "px";
    },
    drawText() {
      // 把字符画到 canvas 中
      const text = document.querySelector(".content");
      const canvas = document.querySelector("#canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = text.offsetWidth;
      canvas.height = text.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.style.letterSpacing = this.style.letterSpacing;
      console.log(this.style.fontSize);
      // canvas.style.fontSize = this.style.fontSize;
      // ctx.fontSize = this.style.fontSize
      ctx.font = `${this.style.fontSize} serif`;
      ctx.textBaseline = "top";

      ctx.beginPath();
      ctx.wrapText(this.content, 0, 0, canvas.width, 20);
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
