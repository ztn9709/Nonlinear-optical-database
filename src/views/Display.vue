<template>
  <!-- 上中(左右右主)下基本布局 -->
  <el-container direction="vertical">
    <base-header></base-header>
    <h1>Data for {{ formula }}</h1>
    <el-main style="padding: 0; margin: 0; overflow-x: hidden" class="main-container">
      <el-row :gutter="40" type="flex" justify="center">
        <el-col :span="8" style="background-color: white">
          <div>
            <h3>Structure Information</h3>
            <table class="info_table">
              <tbody>
                <tr v-for="(val, key) in symmetry">
                  <td style="width: 50%" class="info_table_key">{{ key }}</td>
                  <td style="width: 50%">{{ val }}</td>
                </tr>
                <tr v-for="(val, key) in unit_cell_parameter">
                  <td style="width: 50%" class="info_table_key">{{ key }}</td>
                  <td style="width: 50%">{{ val }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </el-col>
        <el-col :span="8" style="background-color: white">
          <div>
            <h3>Material Parameters</h3>
            <el-table :data="[expData]" border style="width: 100%">
              <el-table-column label="ID" style="width: 50%" prop="id"> </el-table-column>
              <el-table-column prop="exactFormula" label="Formula" style="width: 50%"></el-table-column>
            </el-table>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img src="@/assets/example.png" class="image" />
              <div style="padding: 14px">
                <span>Primitive Cell</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="40" type="flex" justify="center">
        <el-col :span="16" style="background-color: white">
          <el-tabs v-model="activeName" type="border-card" :stretch="true">
            <el-tab-pane v-for="(item, index) in expData.results" :key="item.title" :label="item.title" :name="'tab' + index">
              <div :id="'echart' + index" style="width: 100%; height: 600px"></div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>
    <base-footer></base-footer>
  </el-container>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'
import * as echarts from 'echarts'
export default {
  name: 'Display',
  components: {
    BaseHeader,
    BaseFooter
  },
  props: ['formula'],
  data() {
    return {
      expData: [],
      echartsData: [],
      activeName: 'tab0'
    }
  },
  computed: {
    symmetry() {
      if (Object.keys(this.expData).length !== 0) {
        return this.expData.structure.symmetry
      } else {
        return {}
      }
    },
    unit_cell_parameter() {
      if (Object.keys(this.expData).length !== 0) {
        return this.expData.structure.unit_cell_parameter
      } else {
        return {}
      }
    }
  },
  methods: {
    async fetchData() {
      const { data: res } = await this.axios.get('api/material', { params: { formula: this.formula } })
      this.expData = res[0]
    },
    initChart(data, index) {
      const myTab = document.getElementById('tab-tab' + index)
      const myChart = echarts.init(document.getElementById('echart' + index))
      var option = {
        title: {
          text: data.title,
          textStyle: {
            fontWeight: 700,
            fontSize: '26px'
          },
          left: 'center'
        },
        // tooltip: {
        //   trigger: 'item'
        // },
        grid: {
          left: '5%',
          right: '10%',
          bottom: '5%',
          top: '10%',
          containLabel: true,
          show: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        legend: {
          orient: 'vertical',
          right: '10%',
          top: '10%',
          selector: ['all', 'inverse'],
          selectorLabel: {
            backgroundColor: 'grey',
            color: '#fff'
          }
        },
        xAxis: {
          splitLine: {
            show: false
          },
          type: 'value',
          name: data.title.split('-')[0] + '(' + data.xAxis + ')',
          nameLocation: 'center',
          nameTextStyle: {
            fontWeight: '400',
            fontSize: '18px'
          },
          nameGap: 25,
          axisTick: {
            inside: true
          }
        },
        yAxis: {
          splitLine: {
            show: false
          },
          type: 'value',
          name: data.title.split('-')[1] + '(' + data.yAxis + ')',
          nameLocation: 'center',
          nameTextStyle: {
            fontWeight: '400',
            fontSize: '18px'
          },
          nameGap: 40,
          axisTick: {
            inside: true
          }
        },
        series: data.components.map(i => {
          return {
            symbol: 'none',
            name: i.matter,
            type: 'line',
            smooth: true,
            data: i.line
          }
        })
      }
      myChart.setOption(option)
      //随着屏幕大小调节图表
      window.addEventListener('resize', () => {
        myChart.resize()
      })
      myTab.addEventListener('click', () => {
        myChart.resize()
      })
    }
  },
  async mounted() {
    await this.fetchData()
    await this.$nextTick(_ => {
      this.expData.results.forEach((item, index) => {
        this.initChart(item, index)
      })
    })
  }
}
</script>

<style scoped>
.main-container {
  min-height: 400px;
}
.el-row {
  margin-bottom: 40px;
}
.el-col {
  border-radius: 4px;
  min-height: 100px;
  background-color: grey;
}
table {
  text-align: left;
  font-size: 14px;
  width: 100%;
  border-collapse: collapse;
  color: black;
}
td {
  border: 1px solid #ebeef5;
  padding: 1rem;
}
.info_table_key {
  font-weight: 700;
  font-size: 16px;
  background-color: #dcdee4;
}
.image {
  width: 100%;
  display: block;
}
/* 取消表格悬停高亮效果 */
.el-table >>> tbody tr:hover > td {
  background-color: #ffffff !important;
}
</style>
