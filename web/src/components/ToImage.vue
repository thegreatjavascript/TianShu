<template>
  <div class="container">
    <div class="control-button">
      <div>
        <el-button @click="toImage" type="success" size="small" round
          >生成图片</el-button
        >
        <el-button type="primary" size="small" @click="domToCanvas" round
          >下载图片</el-button
        >
      </div>
    </div>
    <div class="sketchpad">
      <div class="tool">
        <el-row>
          <div class="block">
            <span class="demonstration">调整字符间距</span>
            <!-- 经过测试：0px ~ -5px 是人能看的范围，太小人眼不好辨认 -->
            <el-slider
              v-model="style.letterSpacing"
              :format-tooltip="formatTooltip"
            ></el-slider>
          </div>
        </el-row>
      </div>
      <div class="edit-section">
        <div class="textarea" contenteditable="true" :style="styleObj">
          {{ textarea }}
        </div>
      </div>
      <div class="show-section">
        <canvas id="canvas" style="display:block" width="0" height="0"></canvas>
        <img id="image" :src="image" />
      </div>
    </div>
  </div>
</template>

<script>
import "@/utils/wrapText.js";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      textarea:
        "暮投石壕村，有吏夜捉人。老翁逾墙走，老妇出门看。吏呼一何怒！妇啼一何苦。听妇前致词，三男邺城戍。一男附书至，二男新战死。存者且偷生，死者长已矣！室中更无人，惟有乳下孙。有孙母未去，出入无完裙。老妪力虽衰，请从吏夜归。急应河阳役，犹得备晨炊。夜久语声绝，如闻泣幽咽。天明登前途，独与老翁别。",
      style: {
        letterSpacing: 20,
        fontSize: 20,
        fontWeight: "400"
      },
      image: "",

    };
  },
  watch:{
    style:{
      handler(){
        this.toImage()
      },
      deep : true
    }
  },
  computed: {
    styleObj() {
      return {
        ...this.style,
        "letter-spacing": -this.style.letterSpacing / 20 + "px"
      };
    }
  },
  methods: {
    // 缩小滑块量级
    formatTooltip(val) {
      return -val / 20;
    },
    toImage() {
      const fontSize = this.style.fontSize;
      const text = document.querySelector(".edit-section");
      const canvas = document.querySelector("#canvas");
      const context = canvas.getContext("2d");

      canvas.width = text.offsetWidth;
      canvas.height = text.offsetHeight;
      context.clearRect(0 , 0 , canvas.width , canvas.height)
      context.style = "letter-spacing: -5px; color: red;";
      console.log(this.style.letterSpacing)
      canvas.style.letterSpacing = this.style.letterSpacing / -20 + "px"
      context.font = `${fontSize}px sans-serif`;
      context.textBaseline = "top";
      context.wrapText(this.textarea, 0, 0, canvas.width, 20);
    },
    domToCanvas() {
      alert("mmmmm")
      let screenShot = document.querySelector(".textarea");
      let width = screenShot.offsetWidth;
      let height = screenShot.offsetHeight;
      html2canvas(screenShot, {
        allowTaint: false,
        useCORS: false,
        height: height,
        width: width
      }).then(canvas => {
        const imageData = canvas.toDataURL("image/jpeg", 1);

        let aLink = document.createElement("a");
        aLink.style.display = "none";
        aLink.href = imageData;
        aLink.download = "图片.png";
        // 触发点击-然后移除
        document.body.appendChild(aLink);
        aLink.click();
        document.body.removeChild(aLink);
      });
    }
  }
};
</script>

<style lang="scss">
.container {
  width: 100%;
  margin: auto;
  .control-button {
    width: fit-content;
    margin: 20px auto;
    display: flex;
    div {
      width: 300px;
    }
    div.left {
      margin-right: 20%;
    }
  }

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
