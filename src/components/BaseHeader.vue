<template>
  <element>
    <el-header style='background-color: #43484d'>
      <el-row type="flex" class="nav-menu" justify="start">
        <img src="../assets/helloworld/element.svg" />
        <el-menu
          class="sm-hide"
          :default-active="active_index"
          mode="horizontal"
          router
          
          background-color="#43484d"
          text-color="#fff"
          active-text-color="#ffd04b"
          
          
          style="margin-left: 10px;"
          
        >
          <template v-for="item in menu_items">
            <el-submenu :index="item.index" v-if="item.submenu">
              <template slot="title">{{ item.text }}</template>
              <el-menu-item :index="it.index" v-for="it in item.items" :key="it.index">{{ it.text }}</el-menu-item>
            </el-submenu>
            <el-menu-item :index="item.index" v-else>{{ item.text }}</el-menu-item>
          </template>
        </el-menu>
        <el-button class="sm-show" type="text" @click="menu_drawer = true" style='color: #FFF'>
          <i class="el-icon-s-fold fs2"></i>
        </el-button>
      </el-row>
    </el-header>
    <el-aside>
      <el-drawer :visible.sync="menu_drawer" direction="ltr" size="100%">
        <el-menu :default-active="active_index">
          <el-menu-item index="1">处理中心</el-menu-item>
          <el-submenu index="2">
            <template slot="title">我的工作台</template>
            <el-menu-item index="2-1">选项1</el-menu-item>
            <el-menu-item index="2-2">选项2</el-menu-item>
            <el-menu-item index="2-3">选项3</el-menu-item>
          </el-submenu>
          <el-menu-item index="3" disabled>消息中心</el-menu-item>
          <el-menu-item index="4">
            <a href="https://www.ele.me" target="_blank">订单管理</a>
          </el-menu-item>
        </el-menu>
      </el-drawer>
    </el-aside>
  </element>
</template>

<script>
export default {
  name: 'BaseHeader',
  data() {
    return {
      menu_items: [{
        "index": "/index",
        "text": "模版首页",
        "submenu": false
      }, {
        "index": "2",
        "text": "模版组件",
        "submenu": true,
        "items": [{
          "index": "2-1",
          "text": "数据展示",
          "submenu": true,
        }, {
          "index": "/error",
          "text": "错误模版",
          "submenu": true,
        }, {
          "index": "2-3",
          "text": "登录/注册",
          "submenu": true,
        }]
      }, {
        "index": "3",
        "text": "待开发",
        "submenu": false
      }, {
        "index": "4",
        "text": "关于项目",
        "submenu": false,
        "innerHTML": "<a href=\"http://xuanyusan.gitee.io/apps_web/\" target=\"_blank\">订单管理</a>"
      }],
      active_index: "/index",
      menu_drawer: false
    }
  },
  mounted() {
    this.active_index = this.$route.path;
  },
}
</script>

<style scoped>
.logo {
  width: 200px;
}
.nav-menu {
  border-bottom: solid 1px #e6e6e6 !important;
}
.nav-menu >>> .el-menu {
  border-bottom: 0;
}
</style>
