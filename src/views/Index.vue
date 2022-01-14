<template>
  <!-- 上中(左右右主)下基本布局 -->
  <el-container direction="vertical">
    <base-header></base-header>
    <el-main style="padding: 0; margin: 0; overflow-x: hidden">
      <el-row style="background-color: rgb(255, 151, 82)">
        <el-col :span="4" class="sidebar-container">
          <el-form label-position="top">
            <el-form-item label="省份">
              <el-select v-model="value1" multiple placeholder="请选择">
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.value"></el-option>
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
                <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value"></el-option>
              </el-select>
            </el-form-item>
            <el-button type="default" style="width: 100%">Reset</el-button>
          </el-form>
        </el-col>
        <el-col :span="20" class="main-container">
          <el-input placeholder="请输入材料化学式" v-model="inputFormula" class="input-with-select">
            <el-select v-model="value6" slot="prepend" placeholder="请选择">
              <el-option label="Exactly Match Elements" value="1"></el-option>
              <el-option label="Include Match Elements" value="2"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="fetchData"></el-button>
          </el-input>
          <el-divider></el-divider>
          <el-table :data="expData" style="width: 100%" v-show="expData.length">
            <el-table-column prop="name" label="实验名称" width="240"></el-table-column>
            <el-table-column prop="goals" label="试验指标" width="200" sortable></el-table-column>
            <el-table-column prop="author" label="作者" min-width="200"></el-table-column>
            <el-table-column label="查看" min-width="100">
              <template slot-scope="scope">
                <button @click="showDetail(scope.row)"></button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
    <base-footer></base-footer>
    <el-dialog title="外层 dialog" :visible.sync="visible">
      <div class="echart" id="echart-demo" :style="{ width: '100%', height: '500px' }"></div>
    </el-dialog>
  </el-container>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import * as echarts from 'echarts'
export default {
  name: 'Home',
  components: {
    BaseHeader,
    BaseFooter
  },

  data() {
    return {
      options1: [
        {
          value: 'Guangdong',
          label: '广东'
        },
        {
          value: 'Beijing',
          label: '北京'
        }
      ],
      value1: [],
      value2: [0, 100],
      is_value3: false,
      value3: 3,
      options2: [
        {
          value: 'spicy',
          label: '辣'
        },
        {
          value: 'Beijing',
          label: '甜'
        }
      ],
      value4: [],
      inputFormula: '',
      value6: '1',
      tableData: [],
      colors: ['#eee', '#33aadd', '#00ccff'],
      expData: [],
      visible: false
    }
  },
  computed: {
    showData() {
      return this.tableData.filter(item => (this.value5 ? (this.value6 == 2 ? item.name.includes(this.value5) : item.restaurant == this.value5) : false)).filter(item => item.price < this.value2[1] && item.price > this.value2[0])
    }
  },
  mounted() {
    this.axios.get('/static/json/food_demo.json').then(res => {
      this.tableData = res.data
    })
    this.axios.post('/api/test').then(res => {
      this.$message.success(res.data)
    })
  },
  methods: {
    fetchData() {
      let data = new FormData()
      data.append('value', this.value5)
      this.axios.post('/api/search', data).then(res => {
        this.expData = res.data
      })
    },
    showDetail(data) {
      this.visible = true
      this.$nextTick(_ => {
        this.initChart(data.groups)
      })
    },
    initChart(data) {
      let getchart = echarts.init(document.getElementById('echart-demo'))
      var option = {
        title: {
          text: 'Stacked Line'
        },
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'value'
        },
        yAxis: {
          type: 'value'
        },
        series: data.map(item => {
          return {
            name: item.condition,
            type: 'line',
            data: item.line,
            smooth: true
          }
        })
      }

      getchart.setOption(option)
      //随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        getchart.resize()
      })
    }
  }
}
</script>

<style scoped>
.sidebar-container {
  min-width: 200px;
  text-align: left;
  padding: 12px 12px 0 12px;
}
.main-container {
  background-color: white;
  max-width: calc(100% - 200px);
  min-height: 700px;
  padding: 60px;
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

div >>> .el-menu--horizontal .el-menu--popup li {
  left: 0 !important;
  width: 100%;
}

div >>> .el-form-item__label {
  font-size: 14px;
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
  width: 200px;
}
div >>> .el-select .el-input .el-select__caret {
  color: #fff;
}
</style>
