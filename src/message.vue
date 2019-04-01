<template>
  <div class="message">
    <!-- 发布消息弹出框 -->
    <el-dialog title="发布消息" :visible.sync="dialogMessage" width="40%">
      <el-form :model="announce" ref="ruleForm">
        <el-form-item label="内容">
          <el-input type="textarea" :rows="10" placeholder="请输入消息详细内容" v-model="announce.content"></el-input>
        </el-form-item>
        <el-form-item style="text-align: right">
          <el-button type="success" @click="sendMessage">发布</el-button>
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <!--查看消息弹框-->
    <el-dialog title="消息内容" :visible.sync="dialogVisible" width="90%"></el-dialog>
    <div style="text-align: left;margin-top: 30px">
      <el-form :model="inquireForm" ref="inquireForm" :inline="true">
        <el-form-item label="类型">
          <el-select v-model="inquireForm.type" placeholder="请选择">
            <el-option
              v-for="item in inquireForm.types"
              :key="item.id"
              :label="item.type"
              :value="item.type"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker v-model="inquireForm.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="inquire">查询</el-button>
          <el-button type="warning" @click="reset('inquireForm')">重置</el-button>
          <el-button type="primary" @click="dialogMessage = true">发布消息</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 50px">
      <el-table border :data="messageList">
        <el-table-column label="时间" align="center" prop="creattime"></el-table-column>
        <el-table-column label="发送人" align="center" prop="spear1"></el-table-column>
        <el-table-column label="内容" :show-overflow-tooltip="true" align="center" prop="valuesa"></el-table-column>
        <el-table-column label="状态" align="center" prop="state"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
            <el-button type="text" size="small" @click="DelClick(scope.row)">删除</el-button>
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
‘
export default {
  data() {
    return {
      messageList: [], //消息列表
      dialogMessage: false, //发布消息弹出框
      dialogVisible: false, //查看消息弹出框

      inquireForm: {
        time: "", //查询的时间
        type: "", //查询的类型
        types: [
          {
            id: 1,
            type: "已读"
          },
          {
            id: 2,
            type: "未读"
          }
        ]
      },
      announce: {
        content: "" //发布消息内容
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
      this.getMessage(this.page.currentPage, this.page.pageSize);
    },
    getMessage(page, pageSize) {
      //获取消息列表
      this.$get(`/api/v1/inform/`, {
        page: page,
        page_size: pageSize
      })
        .then(res => {
          this.messageList = res.data.result;
        })
        .catch(err => {
          this.$fail("获取消息列表失败");
        });
    },
    inquire() {
      //根据时间或者类型查询
    },
    reset(formName) {
      //重置查询的类型或者时间
      this.$refs[formName].resetFields();
    },
    sendMessage() {
      //发布消息
      this.$post(`/api/v1/inform/`, {
        content: this.announce.content
      })
        .then(res => {
          this.$success("发布消息成功");
        })
        .catch(err => {
          this.$fail("发布消息失败");
        });
    },
    resetForm(formName) {
      //重置
      this.$refs[formName].resetFields();
    }
  },
  computed: {},
  mounted() {
    this.getMessage(this.page.currentPage, this.page.pageSize);
  }
};
</script>

<style>
</style>


