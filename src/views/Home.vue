<template>
  <div class="home">
    <img class="logo" alt="Vue logo" src="../assets/logo_demo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App - test" />
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

<style scoped>
.logo {
  width: 250px;
}
</style>
