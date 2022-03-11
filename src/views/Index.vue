<template>
  <!-- 上中(左右右主)下基本布局 -->
  <el-container direction="vertical">
    <el-main style="padding: 0; margin: 0; overflow-x: hidden">
      <el-row style="background-color: rgb(255, 151, 82)">
        <el-col :span="4" class="sidebar-container"> Testing... </el-col>
        <el-col :span="20" class="main-container">
          <el-input placeholder="E.g. Ta As" v-model="inputInfo" clearable>
            <el-select v-model="searchWay" slot="prepend" placeholder="请选择">
              <el-option label="Exactly Match Elements" value="exact"></el-option>
              <el-option label="Include Elements" value="incl"></el-option>
            </el-select>
            <el-button slot="append" icon="el-icon-search" @click="fetchData"></el-button>
          </el-input>
          <el-alert title="Invalid Input!" type="error" :closable="false" show-icon v-show="inputWarning"> </el-alert>
          <el-divider></el-divider>
          <PTable full :value="inputElements" @input="handlePTInput"></PTable>
          <el-divider></el-divider>
          <div v-show="searchData.length" class="results" id="table">
            <el-table :data="searchData.slice((currentPage - 1) * 10, currentPage * 10)" :fit="true" @sort-change="changeSort">
              <el-table-column prop="id" label="ID" sortable="custom"></el-table-column>
              <el-table-column prop="formula" label="Formula" sortable="custom"></el-table-column>
              <el-table-column prop="spacegroup" label="Space Group" sortable="custom">
                <template slot-scope="scope">
                  <span>{{ scope.row.spacegroup.number }}</span>
                </template>
              </el-table-column>
              <el-table-column prop="nsoc_dos_gap" label="NSOC Gap" sortable="custom"></el-table-column>
              <el-table-column prop="soc_dos_gap" label="SOC Gap" sortable="custom"></el-table-column>
              <el-table-column label="Action">
                <template slot-scope="scope">
                  <el-button type="success" @click="showDetail(scope.row)">Details</el-button>
                </template>
              </el-table-column>
            </el-table>
            <el-pagination @current-change="handleCurrentChange" :current-page.sync="currentPage" :page-size="10" layout="total, prev, pager, next" :total="searchData.length"></el-pagination>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import PTable from '@/components/PTable/PTable.vue'

export default {
  name: 'Index',
  components: {
    PTable
  },

  data() {
    return {
      inputInfo: '',
      allElements: [
        'H',
        'He',
        'Li',
        'Be',
        'B',
        'C',
        'N',
        'O',
        'F',
        'Ne',
        'Na',
        'Mg',
        'Al',
        'Si',
        'P',
        'S',
        'Cl',
        'Ar',
        'K',
        'Ca',
        'Sc',
        'Ti',
        'V',
        'Cr',
        'Mn',
        'Fe',
        'Co',
        'Ni',
        'Cu',
        'Zn',
        'Ga',
        'Ge',
        'As',
        'Se',
        'Br',
        'Kr',
        'Rb',
        'Sr',
        'Y',
        'Zr',
        'Nb',
        'Mo',
        'Tc',
        'Ru',
        'Rh',
        'Pd',
        'Ag',
        'Cd',
        'In',
        'Sn',
        'Sb',
        'Te',
        'I',
        'Xe',
        'Cs',
        'Ba',
        'La',
        'Ce',
        'Pr',
        'Nd',
        'Pm',
        'Sm',
        'Eu',
        'Gd',
        'Tb',
        'Dy',
        'Ho',
        'Er',
        'Tm',
        'Yb',
        'Lu',
        'Hf',
        'Ta',
        'W',
        'Re',
        'Os',
        'Ir',
        'Pt',
        'Au',
        'Hg',
        'Tl',
        'Pb',
        'Bi',
        'Po',
        'At',
        'Rn',
        'Fr',
        'Ra',
        'Ac',
        'Th',
        'Pa',
        'U',
        'Np',
        'Pu',
        'Am',
        'Cm',
        'Bk',
        'Cf',
        'Es',
        'Fm',
        'Md',
        'No',
        'Lr',
        'Rf',
        'Db',
        'Sg',
        'Bh',
        'Hs',
        'Mt',
        'Ds',
        'Rg',
        'Cn'
      ],
      searchWay: 'exact',
      searchData: [],
      currentPage: 1
    }
  },

  computed: {
    inputElements() {
      let eles = this.inputInfo.trim().split(/\s+/)
      eles = [...new Set(eles)]
      return eles
    },
    inputWarning() {
      if (this.inputInfo === '') {
        return false
      } else {
        return !this.inputElements.every(item => {
          return this.allElements.includes(item)
        })
      }
    }
  },

  methods: {
    async fetchData() {
      if (this.inputInfo === '') {
        return
      }
      if (!this.inputWarning) {
        const { data: res } = await this.axios.get('api/material', { params: { elements: this.inputElements, searchWay: this.searchWay } })
        if (res.length === 0) {
          this.$message.error('搜索失败，无结果！')
        } else {
          this.$message.success('搜索成功！')
        }
        this.searchData = res
        document.querySelector('#table').scrollIntoView({ behavior: 'smooth', block: 'start' })
      } else {
        alert('输入有误，请重新输入')
      }
    },
    showDetail(data) {
      const url = '/materials/' + data.id
      this.$router.push(url)
    },
    handlePTInput(val) {
      this.inputInfo = val.join(' ')
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    changeSort(val) {
      if (val.prop === 'spacegroup') {
        // spacegroup单独排
        if (val.order === 'ascending') {
          this.searchData.sort((a, b) => a.spacegroup.number - b.spacegroup.number)
        }
        if (val.order === 'descending') {
          this.searchData.sort((a, b) => b.spacegroup.number - a.spacegroup.number)
        }
      } else {
        if (val.order === 'ascending') {
          this.searchData.sort((a, b) => {
            if (a[val.prop] > b[val.prop]) {
              return 1
            } else {
              return -1
            }
          })
        }
        if (val.order === 'descending') {
          this.searchData.sort((a, b) => {
            if (a[val.prop] > b[val.prop]) {
              return -1
            } else {
              return 1
            }
          })
        }
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
  padding: 40px;
}
.el-input {
  width: 864px;
}
.el-alert {
  width: 864px;
  margin: auto;
}
.results {
  width: 100%;
  max-width: 900px;
  margin: auto;
}
.el-pagination {
  text-align: end;
}
div >>> .el-input-group__prepend .el-select {
  background-color: rgb(255, 151, 82);
}
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
