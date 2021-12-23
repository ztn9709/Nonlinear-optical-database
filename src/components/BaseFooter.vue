<template>
  <el-footer style="padding:0;">
    <el-row style='background-color: #43484d;color:#fff;'>
      <el-col :span="3" :offset="3" style="text-align: left;">
        <h4>链接</h4>
        <ul style="list-style:none; padding-inline-start:0;">
          <li>
            <el-link href="https://github.com/ElemeFE/element" target="_blank">代码仓库</el-link>
          </li>
          <li>
            <el-link href="/#/zh-CN/component/custom-theme" target="_blank">在线主题生成器</el-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="3" :offset="3" style="text-align: left;">
        <h4>社区</h4>
        <ul style="list-style:none; padding-inline-start:0;">
          <li>
            <el-link href="https://gitter.im/ElemeFE/element" target="_blank">在线讨论</el-link>
          </li>
          <li>
            <el-link href="https://github.com/ElemeFE/element/issues" target="_blank">反馈建议</el-link>
          </li>
          <li>
            <el-link
              href="https://github.com/ElemeFE/element/blob/master/.github/CONTRIBUTING.zh-CN.md"
              target="_blank"
            >贡献指南</el-link>
          </li>
          <li>
            <el-link
              href="https://segmentfault.com/t/element-ui"
              target="_blank"
              class="footer-main-link"
            >SegmentFault</el-link>
          </li>
          <li>
            <el-link
              href="https://github.com/ElementUI/awesome-element"
              target="_blank"
              class="footer-main-link"
            >Awesome Element</el-link>
          </li>
        </ul>
      </el-col>
      <el-col :span="6" :offset="6" style="text-align: left;">
        <p class="footer-social-title">Element 2.1 Fullerene</p>
        <span>
          <div
            role="tooltip"
            id="el-popover-3346"
            aria-hidden="true"
            class="el-popover el-popper footer-popover"
            tabindex="0"
            style="width: 120px; display: none;"
          >
            <!---->
            <div class="footer-popover-title">饿了么 UED</div>
            <img src="static/qrcode.a88f522.png" alt />
          </div>
          <span class="el-popover__reference-wrapper"></span>
        </span>
        <i
          class="doc-icon-weixin elementdoc el-popover__reference"
          aria-describedby="el-popover-3346"
          tabindex="0"
        ></i>
        <a href="https://github.com/elemefe" target="_blank">
          <i class="doc-icon-github elementdoc"></i>
        </a>
        <a href="https://gitter.im/ElemeFE/element" target="_blank">
          <i class="doc-icon-gitter elementdoc"></i>
        </a>
      </el-col>
    </el-row>
  </el-footer>
</template>
<script>
export default {
  name: 'BaseFooter'
}
</script>
