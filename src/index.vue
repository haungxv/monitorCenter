<template>
  <div class="index">
    <!-- 公告详情弹出框 -->
    <el-dialog title="公告详情" :visible.sync="dialogDetails" width="50%" :before-close="annouceClose">
      <div style="text-align: left">
        <p>
          <span class="text-primary">发布时间:</span>
          {{announce.add_time}}
        </p>
        <p>
          <span class="text-primary">标题:</span>
          {{announce.title}}
        </p>
        <p>
          <span class="text-primary">内容:</span>
          {{announce.content}}
        </p>
      </div>
    </el-dialog>
    <!-- 删除公告确认框 -->
    <el-dialog title="确定删除？" :visible.sync="dialogDel" size="tiny">
      <el-button @click="dialogDel = false">取 消</el-button>
      <el-button type="primary" @click="Del">确 定</el-button>
    </el-dialog>
    <el-row>
      <el-col :span="12">
        <div class="table">
          <el-table :data="announceTable" border height="800">
            <el-table-column label="公告" align="center">
              <el-table-column label="日期" align="center" prop="add_time"></el-table-column>
              <el-table-column label="标题" align="center" prop="title"></el-table-column>
              <el-table-column label="操作" align="center" width="100">
                <template slot-scope="scope">
                  <el-button @click="showDetail(scope.row)" type="text" size="small">查看</el-button>
                  <el-button @click="delClick(scope.row)" type="text" size="small">删除</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="table">
          <el-table :data="suspectTable" border height="800">
            <el-table-column label="嫌疑人员信息" align="center">
              <el-table-column label="创建时间" align="center" width="180" prop="createtime"></el-table-column>
              <el-table-column label="可疑犯罪类型" align="center" width="120" prop="spare1"></el-table-column>
              <el-table-column
                label="可疑人员详情"
                align="center"
                prop="describea"
                :show-overflow-tooltip="true"
              ></el-table-column>
              <el-table-column label="操作" align="center" width="150">
                <template slot-scope="scope">
                  <el-button @click="lookDetails(scope.row)" type="text" size="small">查看详情</el-button>
                  <el-button @click="lookClick(scope.row)" type="text" size="small">查看照片</el-button>
                </template>
              </el-table-column>
            </el-table-column>
          </el-table>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogDetails: false, //公告详情弹窗是否显示
      dialogDel: false, //删除确认框是否显示
      delId: 0,

      announceTable: [], //公告详情列表
      suspectTable: [], //嫌疑人列表
      announce: {
        //公告详情弹窗详细信息
        add_time: "",
        title: "",
        content: ""
      }
    };
  },
  methods: {
    annouceClose() {
      //关闭公告详情弹窗之前初始化数据
      this.announce = {
        //公告详情弹窗详细信息
        add_time: "",
        title: "",
        content: ""
      };
      this.delId = 0;
      this.dialogDel = false;
    },
    getAnnounce() {
      //获取公告列表
      this.$get(`/api/v1/public`)
        .then(res => {
          this.announceTable = res.data;
        })
        .catch(err => {
          this.$fail("获取公告列表失败");
        });
    },
    getSuspect() {
      //获取嫌疑人列表
    },
    showDetail(row) {
      //查看公告详情
      this.announce.add_time = row.add_time;
      this.announce.title = row.title;
      this.announce.content = row.content;
      this.dialogDetails = true;
    },
    delClick(row) {
      //显示删除公告确认框
      this.dialogDel = true;
      this.delId = row.id;
    },
    Del() {
      //删除公告
      this.$delete(`/api/v1/public/${this.delId}`)
        .then(res => {
          this.annouceClose();
          this.getAnnounce();
          this.$success("删除公告成功");
        })
        .catch(err => {
          this.$fail("删除公告失败");
        });
    }
  },
  mounted() {
    this.getAnnounce();
  },
  watch: {
    announceTable: function() {
      for (let i in this.announceTable) {
        this.announceTable[i].add_time = this.$handleTime(
          this.announceTable[i].add_time
        );
      }
    }
  }
};
</script>

<style>
.table {
  padding: 10px;
}
</style>

