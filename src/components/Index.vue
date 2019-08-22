<template>
  <div class='container'>
    <div class='title'>
      <span>
        Anti
      </span>
      <span>
        OCR
      </span>
    </div>
    <h2>在微博 / QQ / 微信上，某些文字发不出去？转成图片也发不出去？那你一定是没用 AntiOCR
    </h2>
    <div class='control-button'>
      <div class='left'>
        <el-button type="text" @click='domToCanvas'>文字竖排</el-button>
        <el-button type="text">转动图片</el-button>
        <el-button type="text">文字变形</el-button>
      </div>
      <div>
        <el-button type="text">关于</el-button>
        <el-button @click='toImage' type="success" size="small" round>生成图片</el-button>
        <el-button type="primary" size="small" round>下载图片</el-button>
      </div>
    </div>
    <div class='sketchpad'>
      <div class='edit-section'>
        <!-- <el-input type="textarea" placeholder="请输入内容" v-model="textarea" maxlength="1000" rows='10' show-word-limit>
        </el-input> -->
        <div class='textarea' contenteditable="true">
          {{textarea}}
        </div>
      </div>
      <div class='show-section'>
        <!-- <canvas id="canvas" style="display:block" width="0" height="0"></canvas> -->
        <img id="image" :src="image">
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
      fontWeight: "400",
      fontSize: 20,
      image: ""
    };
  },
  methods: {
    toImage() {
      const fontSize = this.fontSize;
      function random(min, max) {
        return Math.round(Math.random() * (max - min)) + min;
      }

      const text = document.querySelector(".edit-section");
      const canvas = document.querySelector("#canvas");
      const context = canvas.getContext("2d");

      canvas.width = text.offsetWidth;
      canvas.height = text.offsetHeight;

      context.font = `${fontSize}px sans-serif`;
      context.textBaseline = "top";
      context.wrapText(this.textarea, 0, 0, canvas.width, 20);
    },
    domToCanvas() {
      let screenShot = document.querySelector(".textarea");
      let width = screenShot.offsetWidth;
      let height = screenShot.offsetHeight;
      html2canvas(screenShot, {
        allowTaint: false,
        useCORS: false,
        height: height,
        width: width
      }).then(canvas => {
        let ctx = canvas.getContext("2d");
        let data = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const imageData = canvas.toDataURL("image/jpeg", 1);
        console.log("canvas data", imageData);
        this.image = imageData;
        // document.querySelector(".show-section").innerHTML = data;
      });
    }
  }
};
</script>

<style lang='scss'>
.container {
  width: 100%;
  margin: auto;
  .title {
    width: fit-content;
    margin: 50px auto 20px auto;
    color: #000;
    font-size: 2em;
    font-weight: bold;
    span {
    }
    span:last-child {
      color: #ffffff;
      background: #b11116;
      padding: 5px;
      border-radius: 7px;
    }
  }
  h2 {
    font-size: 1.3em;
    margin: 2.5em auto 1.3em auto;
    text-align: center;
  }
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
        writing-mode: vertical-rl;
      }
    }
    .show-section {
      width: 40%;
      height: 200px;
    }
  }
}
</style>