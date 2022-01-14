<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.module_logos_box {
  display: flex;
  align-items: center;
  width: 800px;
  margin: 0 auto;
}
.module_logo_box {
  width: 25%;
}
img.module_logo {
  height: 120px;
  max-width: 100%;
  object-fit: contain;
}

.colors_box {
  display: flex;
  width: 700px;
  margin: 0 auto;
  justify-content: space-between;
}
.colors_box .demo-color-box {
  min-width: calc(120px - 28px);
  padding: 14px;
  color: white;
  text-align: left;
  border-radius: 5px;
}
.colors_box .demo-color-box .bg-color-sub {
  margin-bottom: -14px;
  margin-left: -14px;
  margin-right: -14px;
  display: flex;
}
.colors_box .demo-color-box .bg-color-sub div:first-child {
  width: 50%;
  height: 30px;
  border-bottom-left-radius: 5px;
}
.colors_box .demo-color-box .bg-color-sub div:last-child {
  width: 50%;
  height: 30px;
  border-bottom-right-radius: 5px;
}
</style>
