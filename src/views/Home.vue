<template>
  <div class="home">
    <HelloWorld msg="欢迎访问磁相变材料数据库！- test" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'Home',
  components: {
    HelloWorld
  }
}
</script>

<style scoped></style>
