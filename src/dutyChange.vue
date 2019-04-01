<template>
  <div class="dutyChange">
    <!-- 值班交接弹出框 -->
    <el-dialog title="值班交接" :visible.sync="dialogVisible" width="90%">
      <el-form :model="form">
        <el-form-item label="交接案件编号">
          <el-input v-model="form.case_id"></el-input>
        </el-form-item>
        <el-form-item label="交接物品">
          <el-checkbox-group v-model="form.checkList" @change="changeCheckList">
            <el-checkbox label="卫生"></el-checkbox>
            <el-checkbox label="对讲机"></el-checkbox>
            <el-checkbox label="呼叫器"></el-checkbox>
            <el-checkbox label="电话"></el-checkbox>
            <el-checkbox label="笔记本"></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="其他交接物品">
          <el-input v-model="form.others" type="textarea" :rows="5"></el-input>
        </el-form-item>
        <el-form-item label="交接人">
          <el-input v-model="form.handoverperson"></el-input>
        </el-form-item>
        <el-form-item label="接收人">
          <el-input v-model="form.ondaypeople"></el-input>
        </el-form-item>
      </el-form>

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dutyChange">确 定</el-button>
      </span>
    </el-dialog>

    <div style="margin-top: 50px;text-align: left">
      <span>交接时间:</span>
      <el-date-picker v-model="time" type="date" placeholder="选择日期"></el-date-picker>
      <span style="margin-left: 20px">
        <el-button type="primary" @click="search">查询</el-button>
      </span>
      <el-button style="margin-left:10px;" type="primary" @click="dialogVisible = true">值班交接</el-button>
    </div>
    <div style="margin-top: 50px">
      <el-table :data="dutyLists" border>
        <el-table-column label="交接日期" prop="spare1" align="center" width="200"></el-table-column>
        <el-table-column label="交接案件编号" prop="caseid" align="center" width="200"></el-table-column>
        <el-table-column label="交接物品" prop="articles" align="center"></el-table-column>
        <el-table-column label="交接人" prop="handoverperson" align="center" width="200"></el-table-column>
        <el-table-column label="接收人" prop="ondaypeople" align="center" width="200"></el-table-column>
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
      dialogVisible: false,
      time: "", //查询的时间

      dutyLists: [], //值班交接列表

      form: {
        //值班交接所填表单
        case_id: "", //交接案件编号
        checkList: [], //交接物品
        allThings: "", //交接物品字符串形式
        others: "", //其他交接物品
        handoverperson: "", //交接人
        ondaypeople: "" //接收人
      },
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
    changeCheckList() {
      this.form.allThings = this.form.checkList.join("、");
    },
    getDutyLists(page, pageSize) {
      //获取值班交接列表
      this.$get(`/api/v1/handover/`, {
        page: page,
        page_size: pageSize
      }).then(res => {
        // this.page.total = res.data.count;
        // this.dutyLists = res.data.count;
      });
    },
    dutyChange() {
      //值班交接
      this.form.allThings += "、";
      this.form.allThings += this.form.others;
      this.$post(`/api/v1/handover/`, {
        send_people: this.form.handoverperson,
        receive_people: this.form.ondaypeople,
        equipments: this.form.allThings
      })
        .then(res => {
          this.$success("值班交接成功");
        })
        .catch(err => {
          this.$fail("值班交接失败");
        });
    },
    search() {
      //查询特定日期的值班交接记录
    }
  },
  computed: {},
  mounted() {
    this.getDutyLists();
  }
};
</script>

<style>
</style>


