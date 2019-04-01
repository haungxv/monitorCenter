<template>
  <div class="badPerson">
    <el-form :model="formInline">
      <el-form-item label="可疑犯罪类型">
        <el-input v-model="formInline.spare1"></el-input>
      </el-form-item>
      <el-form-item label="可疑人员详情：">
        <el-input type="textarea" v-model="formInline.describea" :rows="10"></el-input>
      </el-form-item>
      <el-form-item label="可疑人员照片上传：">
        <el-upload
          class="upload-demo"
          ref="upload"
          drag
          :action="urls"
          :on-success="OnSuccess"
          multiple
        >
          <i class="el-icon-upload"></i>
          <div class="el-upload__text">
            将文件拖到此处，或
            <em>点击上传</em>
          </div>
        </el-upload>
      </el-form-item>
      <el-form-item>
        <el-button @click="submit">保存</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formInline: {
        spare1: "",
        describea: ""
      },
      site: ""
    };
  },
  methods: {
    submit() {
      //添加嫌疑人
      this.$post(`/api/v1/suspect_monitor/`,{
        
      })
    }
  },
  computed: {},
  mounted() {}
};
</script>

<style>
</style>


