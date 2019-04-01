<template>
  <div class="addressList">
    <!--删除弹框-->
    <el-dialog title="确定删除？" :visible.sync="dialogDel">
      <el-button @click="dialogDel = false">取 消</el-button>
      <el-button type="primary" @click="Del">确 定</el-button>
    </el-dialog>
    <!--新增通讯录弹框-->
    <el-dialog title="新增通讯录" :visible.sync="dialogVisible" width="35%" :before-close="close">
      <el-form
        :model="addForm"
        :rules="rules"
        ref="addForm"
        label-position="right"
        label-width="60px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="addForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="phone">
          <el-input v-model="addForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="部门" prop="department">
          <el-input v-model="addForm.department"></el-input>
        </el-form-item>
        <el-form-item label="地点" prop="address">
          <el-input v-model="addForm.address"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="close">取 消</el-button>
        <el-button type="primary" @click="addAddressList('addForm')">确 定</el-button>
      </span>
    </el-dialog>

    <div style="text-align: left;margin-top: 20px">
      <el-form :model="inquireForm" ref="inquireForm" :inline="true">
        <el-form-item label="姓名">
          <el-input v-model="inquireForm.name"></el-input>
        </el-form-item>
        <el-form-item label="部门">
          <el-input v-model="inquireForm.department"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="inquire">查询</el-button>
          <el-button type="warning" @click="inquire('all')">全部</el-button>
          <el-button type="primary" @click="dialogVisible = true">新增</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top:20px;">
      <el-table :data="addressList" border>
        <el-table-column label="姓名" align="center" prop="name"></el-table-column>
        <el-table-column label="电话" align="center" prop="phone"></el-table-column>
        <el-table-column label="部门" align="center" prop="department"></el-table-column>
        <el-table-column label="地点" align="center" prop="address"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="delClick(scope.row)">删除</el-button>
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
      rules: {
        name: [{ required: true, message: "请输入真实姓名", trigger: "blur" }],
        phone: [{ required: true, message: "请输入联系电话", trigger: "blur" }],
        department: [
          { required: true, message: "请输入部门信息", trigger: "blur" }
        ],
        address: [
          { required: true, message: "请输入地址信息", trigger: "blur" }
        ]
      },
      addressList: [], //通讯录列表
      dialogVisible: false, //新增通讯录弹出框
      dialogDel: false, //删除通讯录弹出框
      delId: null, //需要删除的通讯录id

      inquireForm: {
        name: "", //查询的姓名
        department: "" //查询的部门
      },
      addForm: {
        //新增通讯录
        name: "",
        phone: "",
        department: "",
        address: ""
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
    addAddressList(formName) {
      //添加通讯录
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post(`/api/v1/address_book/`, {
            name: this.addForm.name,
            phone: this.addForm.phone,
            department: this.addForm.department,
            address: this.addForm.address
          })
            .then(res => {
              this.$success("添加成功");
              this.close();
              this.getAddressList(this.page.currentPage, this.page.pageSize);
            })
            .catch(err => {
              this.$fail("添加失败");
            });
        }
      });
    },
    close() {
      //关闭窗口前初始化数据
      this.addForm = {
        name: "",
        phone: "",
        department: "",
        address: ""
      };
      this.$refs["addForm"].resetFields();
      this.dialogVisible = false;
    },
    getAddressList(page, pageSize) {
      //获取通讯录列表
      this.$get(`/api/v1/address_book/`, {
        page: page, //跳转的页数
        page_size: pageSize //每页显示的信息数目
      })
        .then(res => {
          this.addressList = res.data.results;
          this.page.total = res.data.count;
        })
        .catch(err => {
          this.$fail("获取通讯录失败");
        });
    },
    inquire(str) {
      //判断根据姓名或者部门查询
      this.page.currentPage = 1;
      this.getAddressList(this.page.currentPage, this.page.pageSize);
      if (str === "all") {
        return;
      } else {
        if (
          this.inquireForm.name === "" &&
          this.inquireForm.department === ""
        ) {
          this.$message("请填写要查询的姓名或者部门！");
        } else if (
          this.inquireForm.name !== "" &&
          this.inquireForm.department !== ""
        ) {
          this.search_name();
          this.search_department();
        }
      }
    },
    search_name() {},
    search_department() {},
    delClick(row) {
      //删除某个通讯录
      this.dialogDel = true;
      this.delId = row.id;
    },
    Del() {
      this.$delete(`/api/v1/address_book/${this.delId}/`)
        .then(res => {
          this.dialogDel = false;
          this.delId = null;
          this.page.currentPage = 1;
          this.$success("删除成功");
          this.getAddressList(this.page.currentPage, this.page.pageSize);
        })
        .catch(err => {
          this.$fail("删除失败");
        });
    }
  },
  computed: {},
  mounted() {
    this.getAddressList(this.page.currentPage, this.page.pageSize);
  }
};
</script>

<style>
</style>


