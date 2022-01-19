<template>
  <element>
    <el-header style="background-color: #43484d">
      <el-row type="flex" class="nav-menu" justify="start">
        <el-link type="info" style="font-size: 20.35px; color: white" href="#/index">Magnetic Topological Materials</el-link>
        <el-menu class="sm-hide" :default-active="active_index" mode="horizontal" router background-color="#43484d" text-color="#fff" active-text-color="#ffd04b" style="margin-left: 10px">
          <template v-for="item in menu_items">
            <el-submenu :index="item.index" v-if="item.submenu" :disabled="item.disabled">
              <template slot="title">{{ item.text }}</template>
              <el-menu-item :index="it.index" v-for="it in item.items" :key="it.index">{{ it.text }}</el-menu-item>
            </el-submenu>
            <el-menu-item :disabled="item.disabled" :index="item.index" v-else>{{ item.text }}</el-menu-item>
          </template>
        </el-menu>
      </el-row>
    </el-header>
  </element>
</template>

<script>
export default {
  name: 'BaseHeader',
  data() {
    return {
      menu_items: [
        {
          index: '/index',
          text: '首页',
          submenu: false,
          disabled: false
        },
        // {
        //   index: '2',
        //   text: '模版组件',
        //   submenu: true,
        //   disabled: true,
        //   items: [
        //     {
        //       index: '2-1',
        //       text: '数据展示',
        //       submenu: true
        //     },
        //     {
        //       index: '/2-2',
        //       text: '数据管理',
        //       submenu: true
        //     },
        //     {
        //       index: '2-3',
        //       text: '登录/注册',
        //       submenu: true
        //     }
        //   ]
        // },
        {
          index: '3',
          text: '待开发',
          submenu: false,
          disabled: true
        }
      ],
      active_index: '/index'
    }
  },
  mounted() {
    this.active_index = this.$route.path
  }
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
