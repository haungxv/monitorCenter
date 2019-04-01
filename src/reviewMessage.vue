<template>
  <div class="reviewMessage">
    <div style="text-align: left">
      <el-button type="warning" @click="unreviewed(0)">待审核案件</el-button>
      <el-button type="success" @click="unreviewed(1)">审核通过案件</el-button>
      <el-button type="danger" @click="unreviewed(2)">审核未通过案件</el-button>
    </div>
    <div style="margin-top: 50px">
      <el-table :data="caseLists" border>
        <el-table-column label="案件编号" align="center" prop="caseid"></el-table-column>
        <el-table-column label="提交时间" align="center" prop="alarmtime"></el-table-column>
        <el-table-column label="登记人" align="center" prop="spare1"></el-table-column>
        <el-table-column label="状态" align="center" prop="audit"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="showDetail(scope.row)" type="text" size="small">查看</el-button>
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
      caseLists: [], //案件列表
      page: {
        //分页
        pageSize: 10, //每页显示的信息数目
        total: 0, //总共的信息数目
        currentPage: 1 //当前页数
      }
    };
  },
  methods: {
     handleCurrentChange() {
      //分页
      this.getAddressList(this.page.currentPage, this.page.pageSize);
    },
    getCases(page, pageSize) {
      this.$post(`/api/v1/cases/`, {
        page: page,
        page_size: pageSize
      })
        .then(res => {

        })
        .catch(err => {
          this.$fail("获取案件列表失败")
        });
    },
    showDetail() {
      //查看案件详情
    }
  }
};
</script>

<style>
</style>


