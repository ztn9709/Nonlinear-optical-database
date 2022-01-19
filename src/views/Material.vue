<template>
  <!-- 上中(左右右主)下基本布局 -->
  <el-container direction="vertical">
    <h1>Data for {{ matData.formula }}</h1>
    <!-- 主要信息栏 -->
    <el-main style="padding: 0; margin: 0; overflow-x: hidden" class="main-container">
      <!-- 第一行，基本信息 -->
      <el-row :gutter="40" type="flex" justify="center">
        <el-col :span="8" style="background-color: white">
          <div>
            <h3>Structure Information</h3>
            <table class="info_table">
              <tbody>
                <tr v-for="(val, key) in matData.structure.symmetry">
                  <td style="width: 50%" class="info_table_key">{{ key }}</td>
                  <td style="width: 50%">{{ val }}</td>
                </tr>
              </tbody>
            </table>
            <br />
            <h3>Lattice Parameters</h3>
            <el-tabs v-model="activeNameb" :stretch="true">
              <el-tab-pane v-for="(item, index) in matData.structure.unit_cell_parameter" :key="item.matter" :label="item.matter" :name="'latticeTab' + index">
                <table class="info_table">
                  <tbody>
                    <tr v-for="(val, key) in matData.structure.unit_cell_parameter[index].data">
                      <td style="width: 50%" class="info_table_key">{{ key }}</td>
                      <td style="width: 50%">{{ val }}</td>
                    </tr>
                  </tbody>
                </table>
              </el-tab-pane>
            </el-tabs>
          </div>
        </el-col>
        <el-col :span="8" style="background-color: white">
          <div>
            <h3>Material Parameters</h3>
            <el-table :data="[matData]" border style="width: 100%">
              <el-table-column label="ID" style="width: 50%" prop="mid"> </el-table-column>
              <el-table-column prop="exact_formula" label="Formula" style="width: 50%"></el-table-column>
            </el-table>
            <el-card :body-style="{ padding: '0px' }" shadow="hover">
              <img src="@/assets/example.png" class="image" />
              <div style="padding: 14px">
                <span>Conventional Cell</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
      <!-- 第二行，Echarts图表 -->
      <el-row :gutter="40" type="flex" justify="center">
        <el-col :span="16" style="background-color: white">
          <el-tabs v-model="activeName" type="border-card" :stretch="true">
            <el-tab-pane v-for="(item, index) in matData.results" :key="item.title" :label="item.title" :name="'echartsTab' + index">
              <div :id="'echart' + index" style="width: 100%; height: 75vh"></div>
            </el-tab-pane>
          </el-tabs>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Material',
  props: ['mid'],
  data() {
    return {
      matData: {
        structure: {
          symmetry: {},
          unit_cell_parameter: {}
        }
      },
      activeName: 'echartsTab0',
      activeNameb: 'latticeTab0',
      timer: {}
    }
  },
  methods: {
    async fetchData() {
      const { data: res } = await this.axios.get('api/material', { params: { mid: this.mid } })
      this.matData = res
    },
    initChart(data, index) {
      const myTab = document.getElementById('tab-echartsTab' + index)
      const myChart = echarts.init(document.getElementById('echart' + index))
      var option = {
        title: {
          text: data.title,
          textStyle: {
            fontWeight: 700,
            fontSize: '26px'
          },
          left: 'center',
          subtext: data.comment
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross'
          },
          position: ['80%', '40%']
        },
        grid: {
          left: '5%',
          right: '6%',
          bottom: '5%',
          top: '10%',
          containLabel: true,
          show: true
        },
        toolbox: {
          show: true,
          orient: 'horizontal',
          feature: {
            saveAsImage: {},
            restore: {},
            dataZoom: {
              filterMode: 'none'
            },
            dataView: {
              readOnly: true
            }
          },
          right: '2%'
        },
        dataZoom: {
          type: 'inside',
          filterMode: 'none'
        },
        legend: {
          orient: 'vertical',
          right: '6%',
          top: '10%',
          selector: [
            { type: 'all', title: 'All' },
            { type: 'inverse', title: 'Inverse' }
          ],
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
          name: data.title.split('-')[1] + ' (' + data.xAxis + ')',
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
          name: data.title.split('-')[0] + ' (' + data.yAxis + ')',
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
      let timerIndex = 'timer' + index
      this.timer[timerIndex] = null
      window.addEventListener('resize', () => {
        if (this.timer[timerIndex]) {
          clearTimeout(this.timer[timerIndex])
        }
        this.timer[timerIndex] = setTimeout(() => {
          myChart.resize()
        }, 200)
      })
      myTab.addEventListener('click', () => {
        myChart.resize()
      })
    }
  },
  async created() {
    await this.fetchData()
    this.$nextTick(_ => {
      this.matData.results.forEach((item, index) => {
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
.el-tabs--top >>> .el-tabs__header {
  margin: 0 !important;
}
</style>
