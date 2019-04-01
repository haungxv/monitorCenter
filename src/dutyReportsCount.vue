<template>
  <div class="dutyReportsCount">
    <div style="text-align: left;margin-top: 20px">
      <el-form :model="inquireForm" ref="inquireForm" :inline="true">
        <el-form-item label="类型">
          <el-select v-model="inquireForm.type" placeholder="请选择">
            <el-option
              v-for="item in inquireForm.types"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="inquireForm.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="inquire">查询</el-button>
          <el-button type="warning" @click="reset('inquireForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table :data="caseLists" border style="width: 100%">
      <el-table-column prop="caseid" label="案件编号" align="center"></el-table-column>
      <el-table-column prop="alarmtime" label="时间" align="center"></el-table-column>
      <el-table-column prop="spare1" label="登记人" align="center"></el-table-column>
      <el-table-column prop="callpeople" label="报案人" align="center"></el-table-column>
      <!--<el-table-column prop="state" label="状态" align="center"></el-table-column>-->
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="lookCase(scope.row)">查看详情</el-button>
        </template>
      </el-table-column>
    </el-table>
     <div style="text-align: center;margin-top: 20px">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page.currentPage"
        :page-size="page.pageSize"
        layout="prev, pager, next, jumper"
        :total="page.total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      caseList: [], //案件列表
      inquireForm: {
        type: "", //查询的类型
        time: "", //查询的时间
        types: [
          {
            value: "",
            label: "所有"
          },
          {
            value: "周总结",
            label: "周总结"
          },
          {
            value: "月总结",
            label: "月总结"
          }
        ]
      },
        page: {
        //分页
        pageSize: 10, //每页显示的信息数目
        total: 0, //总共的信息数目
        currentPage: 1 //当前页数
      },
    };
  },
  methods: {},
  computed: {
     handleCurrentChange() {
      //分页
      this.getAddressList(this.page.currentPage, this.page.pageSize);
    },
    inquire() {
      //根据时间或者类型查询
    },
    reset(formName) {
      //重置查询的类型或者时间
      this.$refs[formName].resetFields();
    }
  },
  mounted() {}
};
</script>

<style>
</style>


