<template>
  <div class="lookMonitor">
    <h3 style="text-align: left">案件中心需查看监控人员信息表</h3>
    <hr>
    <div style="text-align: left;margin-top: 20px">
      <el-form :model="inquireForm" ref="inquireForm" :inline="true">
        <el-form-item label="类型">
          <el-select v-model="inquireForm.type" placeholder="请选择">
            <el-option
              v-for="item in inquireForm.types"
              :key="item.id"
              :label="item.name"
              :value="item.name"
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
    <div style="margin-top: 20px">
      <el-table :data="lookMonitor" border>
        <el-table-column label="案件编号" align="center" prop="caseid"></el-table-column>
        <el-table-column label="姓名" align="center" prop></el-table-column>
        <el-table-column label="电话" align="center" prop></el-table-column>
        <el-table-column label="是否已查看监控" align="center" prop="state"></el-table-column>
        <el-table-column label="查看时间" align="center" prop="spare2"></el-table-column>
        <el-table-column label="案件详情" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
        <el-table-column v-if="on_off" label="操作" align="center" width="150">
          <template slot-scope="scope">
            <el-button @click="updateClick(scope.row)" type="success" size="small">已查看</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
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
      lookMonitor: [], //查看监控人员列表
      inquireForm: {
        type: "", //查询的类型
        time: "", //查询的时间
        types: [
          {
            id: 1,
            name: "已查看监控"
          },
          {
            id: 2,
            name: "未查看监控"
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
  methods: {
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
    },
    showDetail(row) {
      //查看案件详情
    },
    updateClick(row) {
      //将是否查看监控设置为已查看
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style>
</style>


