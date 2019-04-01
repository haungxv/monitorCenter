<template>
  <div class="dutyRegisterCount">
    <div style="text-align: left;margin-top: 20px">
      <el-form :model="inquireForm" ref="inquireForm" :inline="true">
        <el-form-item label="日期">
          <el-date-picker v-model="inquireForm.time" type="date" placeholder="选择日期"></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="success" @click="inquire">查询</el-button>
          <el-button type="warning" @click="reset('inquireForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div>合计数量</div>
    <el-table>
      <el-table-column label="刑事案件" align="center" prop="a1" width="100"></el-table-column>
      <el-table-column label="治安、行政案件" align="center" prop="a2" width="135"></el-table-column>
      <el-table-column label="民事纠纷调解" align="center" prop="a3" width="125"></el-table-column>
      <el-table-column label="救助服务" align="center" prop="a4" width="100"></el-table-column>
      <el-table-column label="会议接待" align="center" prop="a54" width="100"></el-table-column>
      <el-table-column label="遗失" align="center" prop="a56" width="100"></el-table-column>
      <el-table-column label="其他性质" align="center" prop="a5" width="100"></el-table-column>
      <el-table-column label="盗窃自行车" align="center" prop="a6" width="110"></el-table-column>
      <el-table-column label="盗窃电瓶车" align="center" prop="a7" width="110"></el-table-column>
      <el-table-column label="盗窃摩托车" align="center" prop="a8" width="110"></el-table-column>
      <el-table-column label="盗窃其它贵重物品" align="center" prop="a9" width="150"></el-table-column>
      <el-table-column label="诈骗" align="center" prop="a10"></el-table-column>
      <el-table-column label="伤害" align="center" prop="a11"></el-table-column>
      <el-table-column label="损坏财物" align="center" prop="a12" width="100"></el-table-column>
      <el-table-column label="未关门窗" align="center" prop="a13" width="100"></el-table-column>
      <el-table-column label="火警" align="center" prop="a14"></el-table-column>
      <el-table-column label="性骚扰" align="center" prop="a15"></el-table-column>
      <el-table-column label="扰乱秩序" align="center" prop="a16" width="100"></el-table-column>
      <el-table-column label="不文明行为" align="center" prop="a17" width="125"></el-table-column>
      <el-table-column label="推销" align="center" prop="a18"></el-table-column>
      <el-table-column label="纠纷" align="center" prop="a19"></el-table-column>
      <el-table-column label="破坏周界围网" align="center" prop="a20" width="125"></el-table-column>
      <el-table-column label="交通肇事" align="center" prop="a21" width="100"></el-table-column>
      <el-table-column label="交通违章" align="center" prop="a22" width="100"></el-table-column>
      <el-table-column label="未关车窗" align="center" prop="a23" width="100"></el-table-column>
      <el-table-column label="交通放行" align="center" prop="a24" width="100"></el-table-column>
      <el-table-column label="通知维修" align="center" prop="a25" width="100"></el-table-column>
      <el-table-column label="救助服务" align="center" prop="a26" width="100"></el-table-column>
      <el-table-column label="失物招领" align="center" prop="a27" width="100"></el-table-column>
      <el-table-column label="咨询、投诉和建议" align="center" prop="a28" width="150"></el-table-column>
      <el-table-column label="其他类型" align="center" prop="a29" width="100"></el-table-column>
      <el-table-column label="治安科开条子" align="center" prop="a30" width="170"></el-table-column>
      <el-table-column label="视频调阅领导同意" align="center" prop="a31" width="150"></el-table-column>
      <el-table-column label="监控视频存储" align="center" prop="a32" width="125"></el-table-column>
      <el-table-column label="监控视频拷贝" align="center" prop="a33" width="125"></el-table-column>
      <el-table-column label="通知应急小组" align="center" prop="a34" width="125"></el-table-column>
      <el-table-column label="通知勤务分队" align="center" prop="a35" width="125"></el-table-column>
      <el-table-column label="通知交通班" align="center" prop="a36" width="125"></el-table-column>
      <el-table-column label="通知治安科" align="center" prop="a37" width="125"></el-table-column>
      <el-table-column label="通知值班干部" align="center" prop="a38" width="125"></el-table-column>
      <el-table-column label="通知处领导" align="center" prop="a39" width="125"></el-table-column>
      <el-table-column label="通知队领导" align="center" prop="a40" width="125"></el-table-column>
      <el-table-column label="通知119" align="center" prop="a41" width="125"></el-table-column>
      <el-table-column label="通知公安派出所" align="center" prop="a42" width="150"></el-table-column>
      <el-table-column label="通知校外相关单位" align="center" prop="a43" width="150"></el-table-column>
      <el-table-column label="通知校内相关单位" align="center" prop="a44" width="150"></el-table-column>
      <el-table-column label="损失手机" align="center" prop="a45" width="100"></el-table-column>
      <el-table-column label="损失笔记本" align="center" prop="a46" width="110"></el-table-column>
      <el-table-column label="损失平板" align="center" prop="a47" width="100"></el-table-column>
      <el-table-column label="损失自行车" align="center" prop="a48" width="110"></el-table-column>
      <el-table-column label="损失电瓶车" align="center" prop="a49" width="110"></el-table-column>
      <el-table-column label="损失摩托车" align="center" prop="a50" width="110"></el-table-column>
      <el-table-column label="损失现金" align="center" prop="a51" width="100"></el-table-column>
      <el-table-column label="损失证件" align="center" prop="a52" width="100"></el-table-column>
      <el-table-column label="损失其他" align="center" prop="a53" width="100"></el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      inquireForm: {
        time: "" ///根据时间查询
      }
    };
  },
  methods: {
    inquire() {
      //根据时间或者类型查询
    },
    reset(formName) {
      //重置查询的类型或者时间
      this.$refs[formName].resetFields();
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style>
</style>


