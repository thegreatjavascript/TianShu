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
    </ToolSide>
    <div class="sketchpad">
      <div class="edit-section">
        <textarea class="textarea" v-model="textarea"></textarea>
      </div>
      <div class="show-section">
        <canvas id="canvas" style="display:block" width="0" height="0"></canvas>
        <img id="image" :src="image" />
      </div>
    </div>
    <download @click.native="download"></download>
  </div>
</template>

<script>
import "@/utils/wrapText.js";
import ToolSide from "./common/ToolSide";
import Download from "./common/Download";

export default {
  data() {
    return {
      textarea:
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
      const fontSize = this.style.fontSize;
      const text = document.querySelector(".edit-section");
      const canvas = document.querySelector("#canvas");
      const ctx = canvas.getContext("2d");

      canvas.width = text.offsetWidth;
      canvas.height = text.offsetHeight;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      canvas.style.letterSpacing = this.style.letterSpacing;
      ctx.font = `${fontSize} sans-serif`;
      ctx.textBaseline = "top";

      ctx.beginPath();
      ctx.wrapText(this.textarea, 0, 0, canvas.width, 20);
    },
    download() {
      // canvas 转图片数据，然后自动下载图片
      const canvas = document.querySelector("#canvas");
      const imageData = canvas.toDataURL("image/png");

      let aLink = document.createElement("a");
      aLink.style.display = "none";
      aLink.href = imageData;
      aLink.download = "图片.png";
      // 触发点击-然后移除
      document.body.appendChild(aLink);
      aLink.click();
      document.body.removeChild(aLink);
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
  width: 100%;
  margin-left: 210px;
  .sketchpad {
    display: flex;
    align-content: center;
    justify-content: center;
    .edit-section {
      width: 40%;
      margin-right: 3%;
      .textarea {
        padding: 10px;
        // writing-mode: vertical-rl;
        width: 100%;
      }
    }
    .show-section {
      width: 40%;
      height: 200px;
    }
  }
}
</style>
