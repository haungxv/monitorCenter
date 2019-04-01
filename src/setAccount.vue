<template>
  <div class="setAccount">
    <!--编辑弹框-->
    <el-dialog title="编辑" :visible.sync="dialogVisible" width="40%">
        <el-form :model="form" :rules="rules" ref="form" label-width="65px">
          <el-form-item label="用户名" prop="username">
            <el-input v-model="form.username"></el-input>
          </el-form-item>
          <el-form-item label="电 话" prop="phone">
            <el-input v-model="form.phone" ></el-input>
          </el-form-item>
          <el-form-item label="邮 箱" prop="email">
            <el-input v-model="form.email"></el-input>
          </el-form-item>
          <el-form-item label="密 码" prop="password">
            <el-input v-model="form.password" type="password"></el-input>
          </el-form-item>
        </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('form')">确 定</el-button>
      </span>
    </el-dialog>
    <div style="text-align: left">
      <el-form :inline="true">
        <el-form-item label="账户">
          <el-input v-model="username"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="realname"></el-input>
        </el-form-item>
        <el-form-item label="职位">
          <el-select :clearable="true" v-model="position" placeholder="请选择职位">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="search">搜索</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div style="margin-top: 30px">
      <el-table border :data="accounts">
        <el-table-column align="center" prop="realname" label="姓名"></el-table-column>
        <el-table-column align="center" prop="username" label="账户名"></el-table-column>
        <el-table-column align="center" prop="phone" label="电话"></el-table-column>
        <el-table-column align="center" prop="email" label="邮箱"></el-table-column>
        <el-table-column align="center" prop="leavel" label="职位"></el-table-column>
        <el-table-column align="center" prop="createtime" label="创建时间"></el-table-column>
        <el-table-column fixed="right" align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="redactClick(scope.row)" type="text" size="small">编辑</el-button>
            <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
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
      dialogVisible: true,
      accounts: [], //账户列表
       form:{},//编辑用户
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
  },
  computed: {},
  mounted() {}
};
</script>

<style>
</style>


