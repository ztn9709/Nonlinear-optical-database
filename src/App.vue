<template>
  <div id="app">
    <!-- <div id="nav">
      <router-link to="/">Home</router-link>| <router-link to="/index">Index</router-link>| <router-link to="/echarts">Echarts</router-link>
      <router-link to="/awesome">AweSome</router-link>
    </div> -->
    <base-header></base-header>
    <router-view />
    <base-footer></base-footer>
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'
export default {
  components: {
    BaseHeader,
    BaseFooter
  }
}
</script>

<style>
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

.el-menu--horizontal .el-menu--popup li {
  left: 0 !important;
  width: 100%;
}

.fs2 {
  font-size: 2rem;
}
.el-input-group__prepend,
.el-input-group__append {
  overflow: hidden;
}
.el-select {
  min-width: 100px;
}
</style>
