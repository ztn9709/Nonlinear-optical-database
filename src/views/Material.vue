<template>
  <!-- 上中(左右右主)下基本布局 -->
  <el-container direction="vertical">
    <h1>Data for {{ matData.formula }}</h1>
    <!-- 主要信息栏 -->
    <el-main class="main-container">
      <!-- 第一行，General Info -->
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <h2>General Info</h2>
          <table class="info_table">
            <tbody>
              <tr>
                <td style="width: 25%" class="info_table_key">ID</td>
                <td style="width: 25%">{{ matData.id }}</td>
                <td style="width: 25%" class="info_table_key">ICSD IDs</td>
                <td style="width: 25%">{{ matData.icsd_ids }}</td>
              </tr>
              <tr>
                <td style="width: 25%" class="info_table_key"># of Electrons in Unit Cell</td>
                <td style="width: 25%">{{ matData.nelec }}</td>
                <td style="width: 25%" class="info_table_key"># of Sites in Unit Cell</td>
                <td style="width: 25%">{{ matData.nsites }}</td>
              </tr>
              <tr>
                <td style="width: 25%" class="info_table_key">Non-SOC Gap</td>
                <td style="width: 25%">{{ matData.nsoc_dos_gap }}</td>
                <td style="width: 25%" class="info_table_key">SOC Gap</td>
                <td style="width: 25%">{{ matData.soc_dos_gap }}</td>
              </tr>
            </tbody>
          </table>
        </el-col>
      </el-row>
      <!-- 第二行, Structure Info-->
      <el-row type="flex" justify="center">
        <el-col :span="10">
          <h2>Structure Info</h2>
          <table class="info_table">
            <tbody>
              <tr>
                <td style="width: 50%" class="info_table_key">Crystal Family</td>
                <td style="width: 50%">{{ matData.spacegroup.lattice_type }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Point Group</td>
                <td style="width: 50%">{{ matData.spacegroup.pointgroup_international }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Space Group Number</td>
                <td style="width: 50%">{{ matData.spacegroup.number }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Space Group Symbol</td>
                <td style="width: 50%">{{ matData.spacegroup.international }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Cell Length a</td>
                <td style="width: 50%">{{ cell_params[4] }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Cell Length b</td>
                <td style="width: 50%">{{ cell_params[6] }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Cell Length c</td>
                <td style="width: 50%">{{ cell_params[8] }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Cell Angle α</td>
                <td style="width: 50%">{{ cell_params[10] }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Cell Angle β</td>
                <td style="width: 50%">{{ cell_params[12] }}</td>
              </tr>
              <tr>
                <td style="width: 50%" class="info_table_key">Cell Angle γ</td>
                <td style="width: 50%">{{ cell_params[14] }}</td>
              </tr>
            </tbody>
          </table>
        </el-col>
        <el-col :span="6"></el-col>
      </el-row>
      <!-- 第三行，Echarts图表 -->
      <el-row type="flex" justify="center">
        <el-col :span="16">
          <h2>Non-SOC Density of States</h2>
          <div id="echart1" style="width: 100%; height: 150px"></div>
          <h2>SOC Density of States</h2>
          <div id="echart2" style="width: 100%; height: 150px"></div>
        </el-col>
      </el-row>
      <!-- 第四行 -->
      <el-row :gutter="40" type="flex" justify="center">
        <el-col :span="8">
          <h2>Non-SOC Band Structure</h2>
          <div v-html="matData.bandplot_nsoc" class="bandplot"></div>
        </el-col>
        <el-col :span="8">
          <h2>SOC Band Structure</h2>
          <div v-html="matData.bandplot_soc" class="bandplot"></div>
        </el-col>
      </el-row>
      <!-- 第五行 计算结果-->
      <el-row :gutter="40" type="flex" justify="center" v-show="matData.nlopng">
        <el-col :span="16">
          <h2>Nonlinear Optical Response</h2>
          <h4>Second Harmonic Generation(SHG),Circular Injection(CI),Linear Shift(LS),Nonlinear Hall(NLH),Circular Shift(CS)</h4>
          <el-card :body-style="{ padding: '0px' }" shadow="hover" v-for="(val, key) in matData.nlopng" :key="key">
            <div class="header">{{ key }} ({{ val.label }})</div>
            <el-image :src="require('@/assets/nonlinear/' + val.path)"></el-image>
            <div class="footer">Ref: {{ val.cite }}</div>
          </el-card>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import * as echarts from 'echarts'
export default {
  name: 'Material',
  props: ['id'],
  data() {
    return {
      matData: {
        spacegroup: {},
        prim_cif_str: ''
      },
      timer: {}
    }
  },
  computed: {
    cell_params() {
      return this.matData.prim_cif_str.trim().split(/\s+/)
    }
  },
  methods: {
    async fetchData() {
      const { data: res } = await this.axios.get('api/material', { params: { id: this.id } })
      this.matData = res
    },
    initChart(data, index) {
      const myChart = echarts.init(document.getElementById('echart' + index))
      var option = {
        grid: {
          left: '25px',
          right: '25px',
          bottom: '20px',
          top: '10px',
          containLabel: true
        },
        xAxis: {
          max: 4,
          min: -4,
          type: 'value',
          name: 'energy / eV',
          nameLocation: 'center',
          nameTextStyle: {
            fontWeight: '400',
            fontSize: '12px'
          },
          nameGap: 20
        },
        yAxis: {
          type: 'value',
          name: 'Dos',
          nameLocation: 'center',
          nameTextStyle: {
            fontWeight: '400',
            fontSize: '12px'
          },
          nameGap: 25
        },
        series: [
          {
            symbol: 'none',
            type: 'line',
            smooth: true,
            data: data
          }
        ]
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
    }
  },
  async created() {
    await this.fetchData()
    this.$nextTick(_ => {
      this.initChart(this.matData.nsoc_dos, 1)
      this.initChart(this.matData.soc_dos, 2)
    })
  }
}
</script>

<style scoped>
.main-container {
  min-height: 400px;
  padding: 0;
  margin: 0;
  overflow-x: hidden;
  text-align: left;
}
.el-row {
  margin-bottom: 40px;
}
/* 表格样式 */
.info_table {
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
/* svg图片样式 */
.bandplot >>> svg {
  width: 100%;
}
/* card样式 */
.el-card {
  display: inline-block;
  width: 39%;
  margin-right: 5%;
  margin-left: 5%;
  margin-bottom: 60px;
  min-height: 500px;
}
.header {
  font-size: 1.35rem;
  font-weight: 800;
  margin-bottom: 20px;
  text-align: center;
  padding: 14px;
}
.footer {
  padding: 14px;
}
</style>
