<template>
  <div>
    <div class="icon-box">
      <v-icon name="wifi" scale="9"></v-icon>
      <v-icon name="wifi" scale="7"></v-icon>
      <v-icon name="wifi" scale="5"></v-icon>
      <v-icon name="wifi" scale="3"></v-icon>
      <v-icon name="wifi" scale="1"></v-icon>
    </div>
    <div class="code-box">
      <pre><code class="html"><span class="nt">&lt;v-icon</span> <span class="na">name=</span><span class="s">"wifi"</span> <span class="na">scale=</span><span class="s">"9"</span><span class="nt">&gt;&lt;/v-icon&gt;</span></code></pre>
    </div>
    <h3>自定义图标教程</h3>
    <div class="step-box">
      <div class="step-item">
        <div class="step-index">1</div>
        <div class="step-content">用PS打开一张图片</div>
      </div>
      <img src="../assets/awesome/step1.png" />
      <div class="step-item">
        <div class="step-index">2</div>
        <div class="step-content">用路径工具将线稿勾勒出来</div>
      </div>
      <p>比较规则的图像可以用基本的图形工具先勾勒，比如vue的logo可以先用三角形勾勒，再用钢笔工具添加三个锚点，用转换角工具把它们转成角点，拉动从而变成V的样子。</p>
      <img src="../assets/awesome/step2.png" />
      <p>第二个V复制路径调整一下就好了。</p>
      <img src="../assets/awesome/step3.png" />
      <div class="step-item">
        <div class="step-index">3</div>
        <div class="step-content">将路径导出到Illustrator</div>
      </div>
      <p>有多个路径可以导出所有路径。</p>
      <img src="../assets/awesome/step4.png" />
      <div class="step-item">
        <div class="step-index">4</div>
        <div class="step-content">用Illustrator导出svg</div>
      </div>
      <p>用AI打开后另存为svg即可。也可以用AI再做一些细节上的调整。</p>
      <div class="step-item">
        <div class="step-index">5</div>
        <div class="step-content">对导出的svg做一些调整</div>
      </div>
      <p>主要是修改一下填充颜色。也可以调整一下路径的位置。</p>
      <img src="../assets/awesome/step5.png" />
      <div class="step-item">
        <div class="step-index">6</div>
        <div class="step-content">在引入组件前进行注册</div>
      </div>
      <img src="../assets/awesome/step6.png" />
    </div>
    <h3>自定义图标效果</h3>
    <div class="icon-box">
      <v-icon name="vue" scale="5"></v-icon>
    </div>
  </div>
</template>

<style scoped>
.code-box {
  width: 800px;
  max-width: 90%;
  margin: 0 auto;
}
.icon-box {
  display: flex;
  justify-content: space-evenly;
  align-items: flex-end;
  width: 800px;
  max-width: 90%;
  margin: 0 auto;
}
.step-box {
  width: 800px;
  max-width: 90%;
  margin: 0 auto;
  font-weight: bold;
  line-height: 50px;
}
.step-box .step-item {
  margin-bottom: 18px;
}
.step-box .step-index {
  float: left;
  width: 50px;
  text-align: center;
  border-radius: 25px;
  background-color: #4f9fcf;
  color: #eee;
}
.step-box p {
  font-weight: normal;
  text-align: left;
  padding-left: 30px;
  line-height: 30px;
}
.step-box .step-content {
  text-align: left;
  padding-left: 70px;
}
.step-box img {
  max-width: 100%;
  margin: 0 auto;
}
@media screen and (max-width: 768px) {
  .icon-box svg {
    display: none;
  }
  .icon-box svg:last-child {
    display: block;
  }
  .icon-box svg:first-child {
    display: block;
  }
}
pre {
  background-color: #fafafa;
  padding: 8px 15px;
  border: 1px solid #eee;
  border-radius: 4px;
}
.nt {
  color: #2f6f9f;
}
.na {
  color: #4f9fcf;
}
.s {
  color: #d44950;
}
</style>
