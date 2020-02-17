<template>
  <el-form
    :model="ruleForm"
    status-icon
    :rules="rules"
    ref="ruleForm"
    label-width="80px"
    class="demo-ruleForm"
  >
    <el-form-item label="链接名称" prop="name">
      <el-input v-model="ruleForm.name" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item label="链接地址" prop="url">
      <el-input v-model="ruleForm.url" autocomplete="off"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      <el-button @click="resetForm('ruleForm')">重置</el-button>
    </el-form-item>
  </el-form>
</template>
<script>
import { save } from "@/api/link";
export default {
  
  data() {
    var check = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("数据不能为空"));
      } else {
        callback();
      }
    };
    return {
      ruleForm: {
        name: "",
        url: ""
      },
      rules: {
        name: [{ validator: check, trigger: "blur" }],
        url: [{ validator: check, trigger: "blur" }]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
            save(this.ruleForm).then(response => {
                if(response.status == 200) {
                    this.formName.name = this.formName.url = "";
                    this.$message({
                        message : "添加数据成功",
                        type: "success"
                    });
                }
            });
        } else {
          this.$message({
              message : "数据不能为空",
              type : "error"
          })
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>
<style scoped>
.el-form {
  margin: 2%;
}
</style>
