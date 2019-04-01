<template>
  <div class="manager">
    <el-row>
      <div class="left">
        <div
          style="color: #ff2217;font-size: 12px;cursor: pointer;margin-top:20px;"
          @click="exit"
        >退出</div>
        <el-menu
          default-active="activeIndex"
          :router="true"
          class="el-menu-vertical-demo"
          background-color="#324057"
          text-color="#fff"
          active-text-color="#20a0ff"
          :unique-opened="true"
        >
          <el-menu-item v-if="on_off1" index="/manager/index">首页</el-menu-item>
          <el-menu-item v-if="on_off1" index="/manager/announce">发布公告</el-menu-item>

          <el-menu-item v-if="on_off1" index="/manager/reviewMessage">案件审核</el-menu-item>
          <el-menu-item index="/manager/caseEntry">案件录入</el-menu-item>
          <el-menu-item index="/manager/message">消息通知</el-menu-item>
          <el-menu-item index="/manager/addressList">通讯录</el-menu-item>
          <el-menu-item index="/manager/lookMonitor">查看监控</el-menu-item>
          <el-submenu index="1" v-if="on_off2">
            <template slot="title">
              <span>值班管理</span>
            </template>
          <el-menu-item v-if="on_off1" index="/manager/visitor">来客登记</el-menu-item>
            <el-menu-item index="/manager/dutyChange">值班交接</el-menu-item>
            <el-menu-item index="/manager/dutyRegister">值班登记</el-menu-item>
            <el-menu-item index="/manager/maintenanceRecord">维保记录</el-menu-item>
            <el-menu-item index="/manager/roomSituation">机房情况</el-menu-item>
            <el-menu-item index="/manager/badPerson">可疑人员</el-menu-item>
            <el-menu-item index="/manager/borrowReturn">借还物品</el-menu-item>
          </el-submenu>
          <el-menu-item index="/manager/dutyRegisterCount">值班登记统计</el-menu-item>
          <el-menu-item index="/manager/dutyReportsCount">值班报表统计</el-menu-item>
          <el-menu-item index="/manager/workSummary">工作总结</el-menu-item>
          <el-submenu v-if="on_off1" index="3">
            <template slot="title">
              <span>账户管理</span>
            </template>
            <el-menu-item index="/manager/addAccount">新增账户</el-menu-item>
            <el-menu-item index="/manager/setAccount">账户设置</el-menu-item>
          </el-submenu>
        </el-menu>
      </div>
      <div class="right">
        <router-view></router-view>
      </div>
    </el-row>
  </div>
</template>
<script>
import axios from "axios";
import { mapState, mapMutations } from "vuex";

export default {
  data() {
    return {
      activeIndex: "/manager/announce",
      userName: "",
      on_off1: true,
      on_off2: true
    };
  },
  methods: {
    exit() {
      //退出登录
      this.$router.push("/");
    }
  },
  computed: {
    user() {
      return JSON.parse(sessionStorage.userData);
    },
    ...mapState({
      token: state => state.token
    })
  },
  mounted() {
    // axios.defaults.headers.common["Authorization"] = "JWT " + this.token;
  }
};
</script>
<style>
.manager {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
}

.left {
  box-sizing: border-box;
  background-color: #324057;
  width: 12.5%;
  min-height: 100%;
  left: 0;
  z-index: 2;

  top: 0;
  bottom: 0;
  position: fixed;
  overflow-y: auto;
  overflow-x: hidden;
}

.right {
  box-sizing: border-box;
  width: 87.5%;
  height: 100%;
  margin-left: 12.5%;
  padding: 50px;
}

/* span {
  font-size: 16px;
} */

.left .el-menu {
  border-right: 1px solid #324057;
}
.el-submenu .el-menu-item {
  min-width: 100%;
}
</style>

