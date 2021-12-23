<template>
  
  <!-- 上中(左右右主)下基本布局 -->
  <el-container direction="vertical">
    <base-header></base-header>
    <el-main style="padding:0;margin:0;overflow-x:hidden;">
      <el-row style='background-color:rgb(255, 151, 82)'>
        <el-col :span="4" class="sidebar-container">
          <el-form label-position="top">
            <el-form-item label="省份">
              <el-select v-model="value1" multiple placeholder="请选择">
                <el-option
                  v-for="item in options1"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="价格区间">
              <el-slider v-model="value2" range show-stops :step="10" :max="100"></el-slider>
              <el-input type="number" v-model="value2[0]" disabled>
                <template slot="prepend">¥</template>
              </el-input>
              <el-input type="number" v-model="value2[1]" disabled>
                <template slot="prepend">¥</template>
              </el-input>
            </el-form-item>
            <el-form-item label="评价">
              <el-switch v-model="is_value3"></el-switch>
              <el-rate v-model="value3" :colors="colors" :disabled="!is_value3"></el-rate>
            </el-form-item>
            <el-form-item label="口味">
              <el-select v-model="value4" multiple placeholder="请选择">
                <el-option
                  v-for="item in options2"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-button type="default" style="width:100%">Reset</el-button>
          </el-form>
        </el-col>
        <el-col :span="20" class="ex-main-container">
          <span style="float: left;color: gainsboro;">示例只实现了价格区间，输入框首部选项和输入框的联动，需要更多数据筛选效果需要自己做修改。</span>
          <el-input placeholder="请输入内容" v-model="value5" class="input-with-select">
            <el-select v-model="value6" slot="prepend" placeholder="请选择">
              <el-option label="餐厅" value="1"></el-option>
              <el-option label="食物" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search"></el-button>
          </el-input>
          <el-divider></el-divider>
          <el-table :data="showData" style="width: 100%" v-show="showData.length">
            <el-table-column prop="pic" label="图片" width="180">
              <template slot-scope="scope">
                <el-image :src="scope.row.pic" style="width: 100px">
                  <div slot="placeholder">加载中 ...</div>
                </el-image>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="名字" width="240"></el-table-column>
            <el-table-column prop="price" label="价格" width="200" sortable></el-table-column>
            <el-table-column prop="restaurant" label="餐厅" min-width="200"></el-table-column>
          </el-table>
        </el-col>
      </el-row>
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
      carousel_imgs: [{
        name: "element-text",
        url: require("../assets/helloworld/element-text.png")
      }, {
        name: "element-theme-blue",
        url: require("../assets/helloworld/element-theme-blue.png")
      }, {
        name: "element-theme-red",
        url: require("../assets/helloworld/element-theme-red.png")
      }],
      options1: [{
        value: 'Guangdong',
        label: '广东'
      }, {
        value: 'Beijing',
        label: '北京'
      }],
      value1: [],
      value2: [0, 100],
      is_value3: false,
      value3: 3,
      options2: [{
        value: 'spicy',
        label: '辣'
      }, {
        value: 'Beijing',
        label: '甜'
      }],
      value4: [],
      value5: "",
      value6: "2",
      tableData: [],
      colors: ['#eee', '#33aadd', '#00ccff']
    }
  },
  computed: {
    showData() {
      return this.tableData.filter(item => this.value5 ? this.value6 == 2 ? item.name.includes(this.value5) : item.restaurant == this.value5 : false).filter(item => item.price < this.value2[1] && item.price > this.value2[0])
    }
  },
  mounted() {
    this.axios.get("/static/json/food_demo.json").then(res => {
      this.tableData = res.data;
    })
  }
  
}
</script>

<style scoped>
.sidebar-container {
  min-width: 200px;
  text-align: left;
  padding: 12px 12px 0 12px;
}
.ex-main-container {
  background-color: white;
  max-width: calc(100% - 200px);
  min-height: 700px;
  padding: 60px;
}
.carousel-img {
  height: 500px;
  max-width: 100%;
  object-fit: contain;
}
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
.card-demo p {
  padding: 0 20px;
}
@media only screen and (max-width: 768px) {
  .sm-hide {
    display: none;
  }
}
@media only screen and (min-width: 768px) {
  .sm-show {
    display: none;
  }
}
div >>> .el-menu--horizontal .el-menu--popup li {
  left: 0 !important;
  width: 100%;
}

div >>> .el-form-item__label {
  font-weight: bold;
  font-size: large;
  color: #fff;
  padding-bottom: 0;
}

div >>> .el-input-group__prepend .el-select {
  background-color: rgb(255, 151, 82);
}
div >>> .el-input-group__append,
div >>> .el-input-group__append .el-button {
  background-color: rgb(255, 151, 82);
  color: #fff;
}
div >>> .el-input-group__prepend .el-select .el-input .el-input__inner {
  color: #fff;
}
div >>> .el-select .el-input .el-select__caret {
  color: #fff;
}

</style>
