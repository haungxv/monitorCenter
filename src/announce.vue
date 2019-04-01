<template>
  <div class="announce">
    <el-form :model="form" ref="form" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" placeholder="请输入公告标题"></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="content">
        <el-input type="textarea" :rows="10" placeholder="请输入公告内容" v-model="form.content"></el-input>
      </el-form-item>
      <el-form-item style="text-align: right">
        <el-button type="success" @click="announce('form')">发布</el-button>
        <el-button @click="resetForm('form')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        title: "", //发布公告标题
        content: "" //发布公告内容
      },
      rules: {
        title: [{ required: true, message: "请输入公告标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入公告内容", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    announce(formName) {
      //添加通讯录
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$post(`/api/v1/public/`, {
            title: this.form.title,
            content: this.form.content
          })
            .then(res => {
              this.$success("添加公告成功");
              this.form = {
                title: "",
                content: ""
              };
            })
            .catch(err => {
              this.$fail("添加公告失败");
            });
        }
      });
    },
    resetForm(formName) {
      //重置
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style>
</style>
