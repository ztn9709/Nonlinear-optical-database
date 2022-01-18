<template>
  <!-- 上中(左右右主)下基本布局 -->
  <el-container direction="vertical">
    <base-header></base-header>
    <el-main style="padding: 0; margin: 0; overflow-x: hidden">
      <el-row style="background-color: rgb(255, 151, 82)">
        <el-col :span="4" class="sidebar-container">
          <!-- <el-form label-position="top">
            <el-form-item label="Space Group">
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
          </el-form> -->
          侧边栏待开发...
        </el-col>
        <el-col :span="20" class="main-container">
          <el-input placeholder="请输入元素名称，以空格分隔" v-model="inputInfo" class="input-with-select" clearable @input="advice">
            <el-select v-model="searchWay" slot="prepend" placeholder="请选择">
              <el-option label="Exactly Match Elements" value="exact"></el-option>
              <el-option label="Include Match Elements" value="incl"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="fetchData"></el-button>
          </el-input>
          <div style="color: red; float: left" v-show="inputWarning">Warning:Invalid input!</div>
          <el-divider></el-divider>
          <el-table :data="expData" style="width: 100%" v-show="expData.length">
            <el-table-column label="ID" width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.mid }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="formula" label="Formula" width="120"></el-table-column>
            <el-table-column label="Space group" width="120">
              <template slot-scope="scope">
                <span>{{ scope.row.structure.symmetry.space_group }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Crystal System" min-width="200">
              <template slot-scope="scope">
                <span>{{ scope.row.structure.symmetry.crystal_system }}</span>
              </template>
            </el-table-column>
            <el-table-column label="Action" min-width="100">
              <template slot-scope="scope">
                <el-button type="success" @click="showDetail(scope.row)">Details</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-col>
      </el-row>
    </el-main>
    <base-footer></base-footer>
  </el-container>
</template>

<script>
import BaseHeader from '@/components/BaseHeader.vue'
import BaseFooter from '@/components/BaseFooter.vue'

export default {
  name: 'Home',
  components: {
    BaseHeader,
    BaseFooter
  },

  data() {
    return {
      // options1: [
      //   {
      //     value: 'Guangdong',
      //     label: '广东'
      //   },
      //   {
      //     value: 'Beijing',
      //     label: '北京'
      //   }
      // ],
      // value1: [],
      // value2: [0, 100],
      // is_value3: false,
      // value3: 3,
      // options2: [
      //   {
      //     value: 'spicy',
      //     label: '辣'
      //   },
      //   {
      //     value: 'Beijing',
      //     label: '甜'
      //   }
      // ],
      //tableData: [],
      // value4: [],
      // colors: ['#eee', '#33aadd', '#00ccff'],
      inputInfo: '',
      inputWarning: false,
      allElements: ['Co', 'Fe', 'Sn', 'S'],
      searchWay: 'exact',
      expData: []
    }
  },

  computed: {
    inputElements() {
      return this.inputInfo.trim().split(/\s+/)
    }
  },

  methods: {
    async fetchData() {
      this.expData = []
      if (this.inputInfo === '') {
        return
      }
      if (!this.inputWarning) {
        let data = new FormData()
        data.append('elements', this.inputElements)
        data.append('searchWay', this.searchWay)
        const { data: res } = await this.axios.post('api/material', data)
        this.expData = res
      } else {
        alert('输入有误，请重新输入')
      }
    },
    showDetail(data) {
      const url = '/display/' + data.formula
      this.$router.push(url)
    },
    advice() {
      if (this.inputInfo === '') {
        this.inputWarning = false
      } else {
        this.inputWarning = !this.inputElements.every(item => {
          return this.allElements.includes(item)
        })
      }
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
