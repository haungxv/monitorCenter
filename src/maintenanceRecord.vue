<template>
  <div class="maintenanceRecord">
    <!--添加维保记录弹出层-->
    <el-dialog title="添加维保记录" :visible.sync="dialogVisible" width="90%" :before-close="close">
      <div style="text-align: left;margin-top: 20px">
        <el-form label-position="right" v-model="form" :inline="true">
          <el-form-item label="发现人">
            <el-input v-model="form.findpeople"></el-input>
          </el-form-item>
          <el-form-item label="发现时间">
            <el-date-picker v-model="form.findtime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="联系维护时间">
            <el-date-picker v-model="form.calltime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="到达时间">
            <el-date-picker v-model="form.arrivetime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="维保人">
            <el-input v-model="form.sname" style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="描述">
            <el-input
              type="textarea"
              v-model="form.desc"
              :rows="5"
              placeholder="请输入内容"
              style="width: 1000px"
            ></el-input>
          </el-form-item>
          <el-form-item label="措施">
            <el-input
              type="textarea"
              v-model="form.measure"
              :rows="5"
              placeholder="请输入内容"
              style="width:1000px"
            ></el-input>
          </el-form-item>
          <el-form-item label="排除时间">
            <el-date-picker v-model="form.ruleouttime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="签名">
            <el-input v-model="form.sign" style="width:50%;"></el-input>
          </el-form-item>
          <el-form-item label="是否修复">
            <el-radio class="radio" v-model="form.states" label="是">未修复</el-radio>
            <el-radio class="radio" v-model="form.states" label="否">已修复</el-radio>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="AddMaintain">确 定</el-button>
      </span>
    </el-dialog>
    <div style="text-align:left;">
      <el-button type="primary" @click="dialogVisible = true">添加维保记录</el-button>
    </div>
    <div style="text-align: left;margin-top: 40px">
      <el-form :model="inquireForm" ref="inquireForm" :inline="true">
        <el-form-item label="是否修复">
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
    <div style="margin-top: 40px">
      <el-table border :data="mainList">
        <el-table-column align="center" label="发现人" prop="findpeople"></el-table-column>
        <el-table-column align="center" label="发现时间" prop="findtime" width="180"></el-table-column>
        <el-table-column align="center" label="联系维护时间" prop="calltime" width="180"></el-table-column>
        <el-table-column align="center" label="到达时间" prop="arrivetime" width="180"></el-table-column>
        <el-table-column align="center" label="排除时间" prop="ruleouttime" width="180"></el-table-column>
        <el-table-column align="center" label="维护人员" prop="sname"></el-table-column>
        <el-table-column align="center" label="描述" prop="describea" width="300"></el-table-column>
        <el-table-column align="center" label="措施" prop="measure" width="300"></el-table-column>
        <el-table-column align="center" label="是否已修复" prop="state"></el-table-column>
        <el-table-column align="center" label="签名" prop="autograph"></el-table-column>
        <el-table-column align="center" label="操作" width="150">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="edit(scope.row)">更改修复状态</el-button>
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
      dialogVisible: false, //添加维保记录弹出框
      form: {
        findpeople: "", //发现人
        findtime: "", //发现时间
        calltime: "", //联系维护时间
        arrivetime: "", //到达时间
        sname: "", //维保人
        desc: "", //描述
        measure: "", //措施
        ruleouttime: "", //排除时间
        sign: "", //签名
        states: true //是否修复
      },
      mainList: [], //维修记录列表

      inquireForm: {
        type: "", //查询的类型
        time: "", //查询的时间
        types: [
          {
            id: 1,
            name: "是"
          },
          {
            id: 2,
            name: "否"
          }
        ]
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
    getMaintence(page, pageSize) {
      //获取维保记录
      this.$get(`/api/v1/maintenance/`, {
        page: page,
        page_size: pageSize
      })
        .then(res => {})
        .catch(err => {
          this.$fail("获取维保记录失败");
        });
    },
    close() {
      //关闭添加维保记录弹出框之前初始化数据
      this.form = {
        findpeople: "", //发现人
        findtime: "", //发现时间
        calltime: "", //联系维护时间
        arrivetime: "", //到达时间
        sname: "", //维保人
        desc: "", //描述
        measure: "", //措施
        ruleouttime: "", //排除时间
        sign: "", //签名
        states: true //是否修复
      };
      this.dialogVisible = false;
    },
    AddMaintain() {
      //添加维保记录
      this.$post(`/api/v1/maintenance/`, {
        reporter: this.form.findpeople,
        report_time: this.form.findtime,
        call_time: this.form.calltime,
        arrive_time: this.form.arrivetime,
        mainten_person: this.form.sname,
        desc: this.form.desc,
        deal: this.form.measure,
        solve_time: this.form.ruleouttime,
        sign: this.form.sign,
        maintened: this.form.states
      })
        .then(res => {
          this.close();
          this.$success("添加维保记录成功");
        })
        .catch(err => {
          this.$fail("添加维保记录失败");
        });
    },
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
  computed: {},
  mounted() {
    this.getMaintence(this.page.currentPage, this.page.pageSize);
  }
};
</script>

<style>
</style>


