<template>
  <div class="workSummary">
    <!-- 新增总结弹窗 -->
    <el-dialog :visible.sync="dialogVisible" :before-close="handleClose" width="90%">
      <div>
        <el-form :model="form" ref="form" label-position="left" label-width="150px">
          <el-form-item
            label="总结人"
            prop="people"
            :rules="[{required: true, message: '请输入总结人姓名', trigger: 'blur' }]"
          >
            <el-input v-model="form.people" :disabled="!update"></el-input>
          </el-form-item>
          <el-form-item label="总结类型" prop="spare1">
            <el-radio v-model="form.type" label="周总结"></el-radio>
            <el-radio v-model="form.type" label="月总结"></el-radio>
          </el-form-item>
          <el-form-item
            label="标题"
            prop="title"
            :rules="[{required: true, message: '请输入总结标题', trigger: 'blur' }]"
          >
            <el-input v-model="form.title"></el-input>
          </el-form-item>
          <el-form-item
            label="内容"
            prop="content"
            :rules="[{required: true, message: '请输入总结内容', trigger: 'blur' }]"
          >
            <el-input
              v-model="form.content"
              type="textarea"
              :autosize="{ minRows: 5, maxRows: 10}"
              placeholder="请输入内容"
            ></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span v-if="button" slot="footer" class="dialog-footer">
        <el-button @click="handleClose">取 消</el-button>
        <el-button v-if="!update" type="primary" @click="addSummary('form')">提交</el-button>
        <el-button v-if="update" type="primary" @click="updateSummarize('form')">更新</el-button>
      </span>
    </el-dialog>
    <div style="text-align: left">
      <el-button type="success" @click="dialogVisible = true">新增总结</el-button>
    </div>
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
    <div style="margin-top: 20px">
      <el-table :data="summaryLists" border>
        <el-table-column label="日期" align="center" prop="createtime"></el-table-column>
        <el-table-column label="总结人" align="center" prop="people"></el-table-column>
        <el-table-column label="总结类型" align="center" prop="spare1"></el-table-column>
        <el-table-column label="标题" align="center" prop="title"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" @click="look(scope.row)">查看</el-button>
            <el-button type="text" @click="editor(scope.row)">编辑</el-button>
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
      dialogVisible: false, //新增总结弹窗是否展示
      button: true, //弹窗内按钮是否展示
      update: false, //弹窗内更新按钮是否展示
      summaryLists: [], //工作总结列表

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

      form: {
        people: "", //总结人
        type: "周总结", //总结类型
        title: "", //总结标题
        content: "" //总结内容
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
    getSummaryLists() {
      //获取总结列表
      this.$get(`/api/v1/conclusion/`, {
        page: 1,
        page_size: 10
      }).then(res => {});
    },
    updateSummary(formName) {
      //更新总结
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post(`/api/updateConclusion`, this.form).then(res => {
            console.log(res);
            if (res == "ok") {
              this.$refs[formName].resetFields();
              this.dialogVisible = false;
              this.inquire();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    addSummary(formName) {
      //提交总结
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post(`/api/addConclusion`, this.form).then(res => {
            console.log(res);
            if (res == "ok") {
              this.$refs[formName].resetFields();
              this.dialogVisible = false;
              this.inquire();
            }
          });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handleClose() {
      //关闭弹窗前初始化数据
    },
    inquire() {
      //根据时间或者类型查询
    },
    reset(formName) {
      //重置查询的类型或者时间
      this.$refs[formName].resetFields();
    },
    look(row) {
      //查看总结详情
    },
    editor(row) {
      //编辑总结
    }
  },
  computed: {},
  mounted() {
    this.getSummaryLists();
  }
};
</script>

<style>
</style>


