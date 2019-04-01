<template>
  <div class="roomSituation">
    <!-- 添加涉密房间 -->
    <el-dialog title="添加涉密房间" :visible.sync="dialogAddRoom" width="30%">
      <div>
        <el-form :model="addForm" ref="addForm" label-position="left" label-width="80px">
          <el-form-item label="房间编号" prop="number">
            <el-input v-model="addForm.number"></el-input>
          </el-form-item>
          <el-form-item label="房间名称" prop="name">
            <el-input v-model="addForm.name"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogAddRoom = false">取 消</el-button>
        <el-button type="primary" @click="AddRoom">确 定</el-button>
      </span>
    </el-dialog>
    <!--涉密房间列表-->
    <el-dialog title="涉密房间列表" :visible.sync="dialogRoom" width="90%">
      <div>
        <div style="text-align: left">
          <el-form :model="roomForm" :inline="true">
            <el-form-item label="房间名称" prop="name">
              <el-input v-model="roomForm.name"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="info" @click="getRoom">查询</el-button>
              <el-button type="success" @click="dialogAddRoom = true">添加</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-table :data="roomTable" border>
            <el-table-column align="center" label="房间编号" prop="number"></el-table-column>
            <el-table-column align="center" label="房间名称" prop="name"></el-table-column>
            <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <el-button @click="deleteRoom(scope.row)" type="text" size="small">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
        <div style="margin-top: 10px">
          <el-pagination
            small
            layout="prev,pager,next"
            :page-size="10"
            @current-change="roomChange"
            :current-page.sync="roomPage"
            :total="roomNum"
          ></el-pagination>
        </div>
      </div>
    </el-dialog>
    <!--录入弹出层-->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="40%">
      <div>
        <el-form :model="form" label-position="left" label-width="80px">
          机房信息录入
          <hr>
          <br>
          <el-form-item label="温度">
            <el-input v-model="form.temperature"></el-input>
          </el-form-item>
          <el-form-item label="湿度">
            <el-input v-model="form.humidity"></el-input>
          </el-form-item>红外涉密报警器信息录入
          <hr>
          <br>
          <el-form-item label="布防数">
            <el-input v-model="form.protection"></el-input>
          </el-form-item>
          <el-form-item label="总 数">
            <el-input v-model="form.total"></el-input>
          </el-form-item>
          <el-form-item label="撤防数">
            <el-input v-model="form.removal"></el-input>
          </el-form-item>
          <el-form-item label="掉线数">
            <el-input v-model="form.spare2"></el-input>
          </el-form-item>
          <el-form-item label="布防房间">
            <el-select v-model="form.spare3" multiple placeholder="请选择" style="width: 100%">
              <el-option
                v-for="item in rooms"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="AddMessage">确 定</el-button>
      </span>
    </el-dialog>

    <div style="text-align:left">
      <el-button type="primary" @click="dialogVisible = true">录入</el-button>
      <el-button type="success" @click="openRoom">添加涉密房间</el-button>
    </div>
    <div style="text-align: left;margin-top: 40px">
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
    <div style="margin-top: 40px">
      <el-table :data="roomList" border>
        <el-table-column label="时间" align="center" prop="createtime" width="180"></el-table-column>
        <el-table-column label="温度" align="center" prop="spare1"></el-table-column>
        <el-table-column label="湿度" align="center" prop="humidity"></el-table-column>
        <el-table-column label="布防数" align="center" prop="protection"></el-table-column>
        <el-table-column label="总数" align="center" prop="total"></el-table-column>
        <el-table-column label="撤防数" align="center" prop="removal"></el-table-column>
        <el-table-column label="掉线数" align="center" prop="spare2"></el-table-column>
        <el-table-column
          label="布防房间"
          align="center"
          prop="spare3"
          width="500"
          show-overflow-tooltip
        ></el-table-column>
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
      dialogAddRoom: false, //添加涉密房间
      dialogRoom: false, //涉密房间列表弹出框
      dialogVisible: false, //录入信息弹出框

      roomList: [], //房间情况列表

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
        temperature: "",
        humidity: "",
        protection: "",
        total: "",
        removal: "",
        spare3: []
      },
      roomForm: {
        name: "" //搜索涉密房间名称
      },
      roomTable: [], //涉密房间列表
      addForm: {
        number: "", //添加涉密房间编号
        name: "" //添加涉密房间名称
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
    getRoomSecret(page, pageSize) {
      //获取涉密房间列表
      this.$get(`/api/v1/room/`, {
        page: page,
        page_size: pageSize
      });
    },
    getRoomSituation(page, pageSize) {
      //获取机房信息列表
      this.$get(`/api/v1/room_record/`, {
        page: page,
        page_size: pageSize
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
    this.getRoomSituation(this.page.currentPage, this.page.pageSize);
  }
};
</script>

<style>
</style>


