<template>
  <section>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-row>
        <el-col :span="8">
          <el-form-item label="新密码" prop="pwd">
            <el-input v-model="form.pwd" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit()" size="mini"
          >确认修改</el-button
        >
        <el-button size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { modAdminPwd } from "@/api/admin";
export default {
  data() {
    return {
      form: {
        name: this.GLOBAL.user,
        pwd: "",
      },
      logining: false,
      rules: {
        pwd: [{ required: true, message: "请输入新密码", trigger: "blur" }],
      },
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate((valid) => {
        if (valid) {
          this.logining = true;

          var loginParams = {
            pwd: this.$md5(this.$md5(this.$md5(this.form.pwd))),
          };

          modAdminPwd(loginParams)
            .then((res) => {
              this.logining = false;
              this.$message({
                message: "修改成功",
                type: "success",
              });
              // this.$router.push({ path: "/login" });
              // sessionStorage.clear();
              // location.reload();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
  },
};
</script>

<style>
</style>