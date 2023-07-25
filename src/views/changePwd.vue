<template>
  <section>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">
      <el-row>
        <el-col :span="8">
          <el-form-item label="用户名">
            <el-input v-model="form.name" disabled></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="旧密码" prop="old_pwd">
            <el-input v-model="form.old_pwd" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row>
        <el-col :span="8">
          <el-form-item label="新密码" prop="new_pwd">
            <el-input v-model="form.new_pwd" type="password"></el-input>
          </el-form-item>
        </el-col>
      </el-row>

      <el-form-item>
        <el-button type="primary" @click="onSubmit" size="mini">确认修改</el-button>
        <el-button size="mini">取消</el-button>
      </el-form-item>
    </el-form>
  </section>
</template>

<script>
import { modAdminPwd } from '@/api/admin'
export default {
  data() {
    return {
      form: {
        name: this.GLOBAL.user,
        old_pwd: "",
        new_pwd: ""
      },
      logining: false,
      rules: {
        old_pwd: [{ required: true, message: "请输入旧密码", trigger: "blur" }],
        new_pwd: [{ required: true, message: "请输入新密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    onSubmit() {
      this.$refs.form.validate(valid => {
        if (valid) {
          if(this.form.old_pwd !== this.form.new_pwd) {
            this.$message({
              message: "两次密码输入不一致",
              type: "warning"
            });
          }
          this.logining = true;
          modAdminPwd({pwd: this.form.old_pwd,})
            .then(res => {
              this.logining = false;
              this.$message({
                message: "修改成功",
                type: "success"
              });
              this.$router.push({ path: "/login" });
              sessionStorage.clear();
              location.reload();
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    // 将通讯录按照 ABCD字母的顺序排序
    sortObjByKey(obj) {
      var keys = Object.keys(obj).sort();
      var newObj = {};
      for (var i = 0; i < keys.length; i++) {
        var index = keys[i];
        newObj[index] = obj[index];
      }
      return newObj;
    }
  }
};
</script>

<style>
</style>