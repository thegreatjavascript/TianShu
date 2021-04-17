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
    <div>
        <el-row>
            <el-col :offset="4" :span="16">
                <span class="demonstration">调整字符间距</span>
                <!-- 经过测试：0px ~ -5px 是人能看的范围，太小人眼不好辨认 -->
                <el-slider
                v-model="spanPadding"
                ></el-slider>
            </el-col>

            <el-col :offset="4" :span="16">
                <span class="demonstration">拉高</span>
                

                <!-- 经过测试：0px ~ -5px 是人能看的范围，太小人眼不好辨认 -->
                <el-slider
                v-model="spanScaleY"
                ></el-slider>
            </el-col>


            <el-col :offset="4" :span="16">
                <span class="demonstration">旋转</span>
                <!-- 经过测试：0px ~ -5px 是人能看的范围，太小人眼不好辨认 -->
                <el-slider
                v-model="spanSkewX"
                ></el-slider>
            </el-col>
 
            <el-col class="edit-section" :offset="4" :span="16">
        
                <textarea @change="toImage"  v-model="textarea"  :style="styleObj" />

                <div class="textarea" contenteditable="true" :style="styleObj">
                    <span :style="itemSpanStyle" :key="index" v-for="(item , index) in  renderTextarea">
                        {{item}}
                    </span>
                </div>
                
                
            </el-col> 

            <el-col :offset="4" :span="16" class="image-warp">
                <canvas id="canvas" style="display:block" width="0" height="0"></canvas>
                <img id="image" :src="image" />
            </el-col>
        </el-row>

    </div>
  </div>
</template>

<script>
import "@/utils/wrapText.js";
import html2canvas from "html2canvas";

export default {
  data() {
    return {
      spanScaleY : 1 ,
      spanSkewX :0 ,
      spanPadding: 50 ,
      textarea:"100元即将到账,赶紧分享。帮我助力。",
      style: {
        letterSpacing: 20,
        fontSize: 20,
        fontWeight: "400",
        width : "100%",
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
    },
    renderTextarea(){        
        
        return this.textarea.split("")
    },
    itemSpanStyle(){
        let spanScaleY = this.spanScaleY/100 * 2 + 1
        let skewX =  this.spanSkewX/100 * - 90
        let padding = (this.spanPadding - 50 )/100 * 24

        return {
            "display" : "inline-block",
            "transform": `skewX(`+ skewX +`deg) scaleY(`+ spanScaleY +`)`,
            "margin-left" : padding + "px",
            "margin-right" : padding + "px",
        }
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
    //   canvas.style.letterSpacing = this.style.letterSpacing / -20 + "px"
      context.font = `${fontSize}px sans-serif`;
      context.textBaseline = "top";
      context.wrapText(this.textarea, 0, 0, canvas.width, 20);
      html2canvas(document.querySelector(".textarea")).then(ncanvas => {
        document.body.appendChild(ncanvas)
        // let body = document.querySelector("body")
        // let ic = document.getElementById("canvas")
        // body.replaceChild(ic , ncanvas)
    });

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

<style lang="scss" scoped >
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
}
.image-warp {
    margin-top: 30px;
    border: 1px solid #eee;
    padding: 30px;
}
.item-span{
    transform: skewX(-30deg) scaleY(2.2);
    display: inline-block;
}
</style>
