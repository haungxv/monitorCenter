<template>
  <div class="dutyRegister">
    <!--值班登记弹框-->
    <el-dialog title="新增值班登记" size="large" :visible.sync="dialogVisible" width="90%">
      <div style="text-align: left;margin-top: 20px">
        案发情况
        <hr>
        <el-form :model="caseInformation" :rules="rules.baseInfo" ref="case_1" :inline="true">
          <el-form-item label="报案人姓名">
            <el-input v-model="caseInformation.name"></el-input>
          </el-form-item>
          <el-form-item label="案发地点">
            <el-input v-model="caseInformation.occur_place"></el-input>
          </el-form-item>
          <el-form-item label="案发时间" prop="caseTime">
            <el-date-picker v-model="caseInformation.caseTime" type="datetime" placeholder="选择日期时间"></el-date-picker>
          </el-form-item>
          <el-form-item label="报案类型" prop="caseType">
            <el-cascader
              expand-trigger="hover"
              :options="caseInformation.caseTypes"
              v-model="caseInformation.caseType"
              placeholder="请选择报案类型"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="案件性质">
            <el-cascader
              expand-trigger="hover"
              :options="caseInformation.caseNatures"
              v-model="caseInformation.caseNature"
              placeholder="请选择案件性质"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="损失情况">
            <el-cascader
              expand-trigger="hover"
              :options="caseInformation.caseLosses"
              v-model="caseInformation.caseLoss"
              placeholder="请选择损失情况"
            ></el-cascader>
          </el-form-item>
          <el-form-item label="案件详情">
            <el-input
              type="textarea"
              v-model="caseInformation.desc"
              :rows="5"
              placeholder="请输入内容"
              style="width: 1000px"
            ></el-input>
            <div style="text-align: left">
              处置结果:
              <el-checkbox-group v-model="caseInformation.checkList">
                <el-checkbox label="治安科开条子" style="width:22%"></el-checkbox>
                <el-checkbox label="监控视频调阅领导同意" style="width:22%"></el-checkbox>
                <el-checkbox label="监控视频存储" style="width:22%"></el-checkbox>
                <el-checkbox label="监控视频拷贝" style="width:22%"></el-checkbox>
                <el-checkbox label="通知应急小组" style="width:22%"></el-checkbox>
                <el-checkbox label="通知勤务分队" style="width:22%"></el-checkbox>
                <el-checkbox label="通知交通班" style="width:22%"></el-checkbox>
                <el-checkbox label="通知治安科" style="width:22%"></el-checkbox>
                <el-checkbox label="通知值班干部" style="width:22%"></el-checkbox>
                <el-checkbox label="通知处领导" style="width:22%"></el-checkbox>
                <el-checkbox label="通知队领导" style="width:22%"></el-checkbox>
                <el-checkbox label="通知119" style="width:22%"></el-checkbox>
                <el-checkbox label="通知公安派出所" style="width:22%"></el-checkbox>
                <el-checkbox label="通知校外相关单位" style="width:22%"></el-checkbox>
                <el-checkbox label="通知校内相关单位" style="width:22%"></el-checkbox>
              </el-checkbox-group>
            </div>
          </el-form-item>
          <div style="text-align: left;margin-top: 5px">
            <span style="margin-right: 20px">是否紧急情况:</span>
            <el-radio class="radio" v-model="caseInformation.emergency" :label="true">是</el-radio>
            <el-radio class="radio" v-model="caseInformation.emergency" :label="false">否</el-radio>
          </div>
          <div style="text-align: left;margin-top: 20px">
            <span style="margin-right: 20px">是否查看监控:</span>
            <el-radio class="radio" v-model="caseInformation.saw_monitoring" :label="true">是</el-radio>
            <el-radio class="radio" v-model="caseInformation.saw_monitoring" :label="false">否</el-radio>
          </div>
        </el-form>
      </div>
      <div style="text-align: left;margin-top: 35px">
        <span>人员信息</span>
        <hr>
        <el-form :model="reporter" :inline="true" :rules="rules.componentInfo" ref="case_3">
          <el-form-item label="姓名" prop="name">
            <el-input v-model="reporter.name"></el-input>
          </el-form-item>
          <el-form-item label="性别">
            <el-radio class="radio" v-model="reporter.gender" :label="true">男</el-radio>
            <el-radio class="radio" v-model="reporter.gender" :label="false">女</el-radio>
          </el-form-item>
          <el-form-item label="年龄" prop="age">
            <el-input v-model.number="reporter.age"></el-input>
          </el-form-item>
          <el-form-item label="身份证">
            <el-input v-model="reporter.id_card"></el-input>
          </el-form-item>

          <el-form-item label="年级">
            <el-input v-model="reporter.grade"></el-input>
          </el-form-item>
          <el-form-item label="学院">
            <el-input v-model="reporter.college"></el-input>
          </el-form-item>
          <el-form-item label="邮箱">
            <el-input v-model="reporter.email"></el-input>
          </el-form-item>
          <el-form-item label="电话">
            <el-input v-model="reporter.phone"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="addRegister">确定</el-button>
      </span>
    </el-dialog>

    <div style="text-align:left;">
      <el-button type="primary" @click="dialogVisible = true">新增值班登记</el-button>
    </div>
    <div style="text-align: left;margin-top: 30px">
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

    <div style="margin-top: 50px">
      <el-table :data="tableData" border>
        <el-table-column label="案件编号" align="center" prop="caseid"></el-table-column>
        <el-table-column label="案件类型" align="center" prop="type"></el-table-column>
        <el-table-column label="时间" align="center" prop="alarmtime"></el-table-column>
        <el-table-column label="报案人" align="center" prop="callpeople"></el-table-column>
        <el-table-column label="操作" align="center">
          <template slot-scope="scope">
            <el-button type="text" size="small" @click="look(scope.row)">查看详情</el-button>
            <el-button type="text" size="small" @click="editor(scope.row)">编辑</el-button>
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
      dialogVisible: true, //新增值班登记弹出框

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

      rules: {
        baseInfo: {
          caseTime: [
            { required: true, message: "请填写登记时间", trigger: "blur" }
          ],
          caseType: [
            { required: true, message: "请选择报案类型", trigger: "blur" }
          ],
          period: [
            { required: true, message: "请选择案发时间段", trigger: "blur" }
          ],
          occur_place: [
            { required: true, message: "请选择案发地点", trigger: "blur" }
          ]
        },
        componentInfo: {
          name: [{ required: true, message: "姓名不能为空", trigger: "blur" }],
          age: [
            {
              type: "number",
              max: 32767,
              message: "请填写小于32767的整数",
              trigger: "blur"
            }
          ]
        },
        lossInfo: {
          name: [{ required: true, message: "姓名不能为空", trigger: "blur" }]
        }
      },
      caseInformation: {
        name: "", //报案人姓名
        occur_place: "", //案发地点
        caseTime: "", //案发时间
        caseType: [], //案件类型
        caseTypes: [
          {
            value: "盗窃",
            label: "盗窃",
            children: [
              {
                value: "盗窃自行车",
                label: "盗窃自行车"
              },
              {
                value: "盗窃电瓶车",
                label: "盗窃电瓶车"
              },
              {
                value: "盗窃摩托车",
                label: "盗窃摩托车"
              },
              {
                value: "盗窃其他贵重物品",
                label: "盗窃其他贵重物品"
              }
            ]
          },
          {
            value: "诈骗",
            label: "诈骗"
          },
          {
            value: "伤害",
            label: "伤害"
          },
          {
            value: "损坏财物",
            label: "损坏财物"
          },
          {
            value: "未关门窗",
            label: "未关门窗"
          },
          {
            value: "火警",
            label: "火警"
          },
          {
            value: "性骚扰",
            label: "性骚扰"
          },
          {
            value: "扰乱秩序",
            label: "扰乱秩序"
          },
          {
            value: "不文明行为",
            label: "不文明行为"
          },
          {
            value: "推销",
            label: "推销"
          },
          {
            value: "纠纷",
            label: "纠纷"
          },
          {
            value: "破坏周围网",
            label: "破坏周围网"
          },
          {
            value: "交通",
            label: "交通",
            children: [
              {
                value: "交通肇事",
                label: "交通肇事"
              },
              {
                value: "交通违章",
                label: "交通违章"
              },
              {
                value: "未关车窗",
                label: "未关车窗"
              },
              {
                value: "交通放行",
                label: "交通放行"
              }
            ]
          },
          {
            value: "通知维修",
            label: "通知维修"
          },
          {
            value: "通知消防科",
            label: "通知消防科"
          },
          {
            value: "救助服务",
            label: "救助服务"
          },
          {
            value: "失物招领",
            label: "失物招领"
          },
          {
            value: "咨询、投诉和建议",
            label: "咨询、投诉和建议"
          },
          {
            value: "遗失",
            label: "遗失"
          },
          {
            value: "其他",
            label: "其他"
          }
        ],
        caseNature: [], //案件性质
        caseNatures: [
          {
            value: "刑事案件",
            label: "刑事案件"
          },
          {
            value: "治安、行政案件",
            label: "治安、行政案件"
          },
          {
            value: "民事纠纷调解",
            label: "民事纠纷调解"
          },
          {
            value: "救助服务",
            label: "救助服务"
          },
          {
            value: "其他",
            label: "其他"
          }
        ],
        caseLoss: [], //损失情况
        caseLosses: [
          {
            value: "手机",
            label: "手机"
          },
          {
            value: "笔记本",
            label: "笔记本"
          },
          {
            value: "平板",
            label: "平板"
          },
          {
            value: "自行车",
            label: "自行车"
          },
          {
            value: "电瓶车",
            label: "电瓶车"
          },
          {
            value: "现金",
            label: "现金"
          },
          {
            value: "证件",
            label: "证件"
          },
          {
            value: "其他",
            label: "其他"
          }
        ],
        desc: "", //案情
        checkList: [], //处理结果
        emergency: false, //是否紧急情况
        saw_monitoring: false //是否查看监控
      },
      reporter: {
        //人员信息
        name: "",
        gender: true,
        age: null,
        id_card: "",
        grade: null,
        college: null, //学院
        email: "", //邮箱
        phone: ""
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
    inquire() {
      //根据时间或者类型查询
    },
    reset(formName) {
      //重置查询的类型或者时间
      this.$refs[formName].resetFields();
    },
    addRegister() {
      //新增值班登记
      this.$post(`/api/v1/record/`, {
        occur_time: this.caseInformation.caseTime,
        reporter: this.caseInformation.name,
        occur_place: this.caseInformation.occur_place,
        police_call_type: this.caseInformation.caseType.join("."),
        case_type: this.caseInformation.caseNature.join("."),
        loss: this.caseInformation.caseLoss.join("."),
        detail: this.caseInformation.desc,
        result: this.caseInformation.checkList.join("."),
        name: this.reporter.name,
        gender: this.reporter.gender,
        age: this.reporter.age,
        identity_card: this.reporter.id_card,
        school: this.reporter.college,
        grade: this.reporter.grade,
        email: this.reporter.email,
        phone: this.reporter.phone
      })
        .then(res => {
          this.$success("新增值班登记成功");
        })
        .catch(err => {
          this.$fail("新增值班登记失败");
        });
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style>
/* *{
    box-sizing: border-box
} */
</style>


