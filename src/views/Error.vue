<template>
  <!-- 上中下基本布局 -->

  <el-container>
    <base-header></base-header>
    <el-main>
      <div style="width: 500px;margin: 0 auto;">
        <transition name="el-zoom-in-center">
          <img
            v-show="zoom_demo"
            src="../assets/element_ui/500.png"
            width="500px"
            style="transition: 1s"
          />
        </transition>
      </div>
      <div style="width: 500px;margin: 0 auto;">
        <transition name="el-zoom-in-center">
          <img
            v-show="zoom_demo"
            src="../assets/element_ui/404.png"
            width="500px"
            style="transition: 1s"
          />
        </transition>
      </div>
    </el-main>
    <base-footer></base-footer>
  </el-container>
</template>

<script>
import BaseHeader from "@/components/BaseHeader.vue"
import BaseFooter from "@/components/BaseFooter.vue"
export default {
  name: 'Home',
  components: {
    BaseHeader,
    BaseFooter
  },
  data() {
    return {
      zoom_demo: false
    }
  },
  mounted() {
    this.zoom_demo = true;
  }
}
</script>

<style scoped>
.card-demo {
  margin-bottom: 12px;
  transition: all 0.3s ease-in-out;
}
.card-demo:hover {
  transform: translateY(-8px);
}
.card-demo img {
  height: 140px;
}
</style>
