<template>
  <div class="borrowReturn">
    <!-- 借还物品状态设置弹出框 -->
    <el-dialog title="案件状态设置" :visible.sync="dialogStatus" width="50%">
      <el-select v-model="changeStatus.status" placeholder="请选择">
        <el-option
          v-for="item in changeStatus.options"
          :key="item.name"
          :label="item.name"
          :value="item.id"
        ></el-option>
      </el-select>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogStatus = false">取 消</el-button>
        <el-button type="primary" @click="updateStatus">确 定</el-button>
      </span>
    </el-dialog>
    <!-- 借出登记弹出框 -->
    <el-dialog title="借出登记" width="50%" :visible.sync="dialogVisible" :before-close="close">
      <el-form :model="createForm" label-position="right" label-width="60px">
        <el-form-item label="姓名">
          <el-input v-model="createForm.name"></el-input>
        </el-form-item>
        <el-form-item label="电话">
          <el-input v-model="createForm.phone"></el-input>
        </el-form-item>
        <el-form-item label="物品">
          <el-input v-model="createForm.things"></el-input>
        </el-form-item>
      </el-form>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="addBorrow">确 定</el-button>
    </el-dialog>

    <div style="text-align: left;margin-top: 20px">
      <el-button type="primary" style="margin-bottom:30px;" @click="dialogVisible = true">借出登记</el-button>
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
    <el-table :data="borrowList" border style="width: 100%;margin-top:40px;">
      <el-table-column prop="createtime" label="日期" align="center"></el-table-column>
      <el-table-column prop="name" label="姓名" align="center"></el-table-column>
      <el-table-column prop="item" label="所借物品" align="center"></el-table-column>
      <el-table-column prop="returned" label="状态" align="center"></el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="edit(scope.row)">状态设置</el-button>
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
      borrowList: [], //借还物品列表
      dialogVisible: false, //借出登记弹出框
      dialogStatus: false, //修改借出状态弹出框
      changeThings: {
        id: 0, //需要修改状态的id
        name: "",
        phone: "",
        item: ""
      },
      changeStatus: {
        //修改借出物品状态
        status: true,
        options: [
          {
            name: "已归还",
            id: true
          },
          {
            name: "未归还",
            id: false
          }
        ]
      },
      inquireForm: {
        type: "", //查询的类型
        time: "", //查询的时间
        types: [
          {
            id: 1,
            name: "已归还"
          },
          {
            id: 2,
            name: "未归还"
          }
        ]
      },
      createForm: {
        //借出登记表
        name: "",
        phone: "",
        things: ""
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
    updateStatus() {
      //修改借出物品状态
      this.$put(`/api/v1/lend/${this.changeThings.id}/`, {
        name: this.changeThings.name,
        phone: this.changeThings.phone,
        item: this.changeThings.item,
        returned: this.changeStatus.status
      })
        .then(res => {
          this.changeThings = {
            id: 0,
            name: "",
            phone: "",
            item: ""
          };
          this.changeStatus.status = true;
          this.page.currentPage = 1;
          this.dialogStatus = false;
          this.getBorrowList(this.page.currentPage, this.page.pageSize);
          this.$success("修改借出状态成功");
        })
        .catch(err => {
          this.$fail("修改借出状态失败");
        });
    },
    close() {
      //关闭弹窗前初始化数据
      this.createForm = {
        //借出登记表
        name: "",
        phone: "",
        things: ""
      };
      this.dialogVisible = false;
    },
    addBorrow() {
      //添加借还物品
      this.$post(`/api/v1/lend/`, {
        name: this.createForm.name,
        phone: this.createForm.phone,
        item: this.createForm.things
      })
        .then(res => {
          this.close();
          this.page.currentPage = 1;
          this.getBorrowList(this.page.currentPage, this.page.pageSize);
          this.$success("添加借还物品成功");
        })
        .catch(err => {
          this.$fail("添加借还物品失败");
        });
    },
    getBorrowList(page, pageSize) {
      //获取借还物品列表
      this.$get(`/api/v1/lend/`, {
        page: page,
        page_size: pageSize
      })
        .then(res => {
          this.borrowList = res.data.results;
        })
        .catch(err => {
          this.$fail("获取借还物品列表失败");
        });
    },
    edit(row) {
      //修改物品状态
      this.dialogStatus = true;
      this.changeThings.id = row.id;
      this.changeThings.name = row.name;
      this.changeThings.phone = row.phone;
      this.changeThings.item = row.item;
    },
    handleCurrentChange() {
      //分页
      this.getBorrowList(this.page.currentPage, this.page.pageSize);
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
    this.getBorrowList(this.page.currentPage, this.page.pageSize);
  },
  watch: {
    borrowList: function() {
      for (let i in this.borrowList) {
        this.borrowList[i].returned = this.borrowList[i].returned
          ? "已归还"
          : "未归还";
      }
    }
  }
};
</script>

<style>
</style>


