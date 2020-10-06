<template>
  <div class="login_container">
    <div class="login_box">
      <!-- header -->
      <div class="avatar_box">
        <img src="../assets/logo.png" alt />
      </div>
      <!-- form -->
      <el-form label-position="right" label-width="80px" class="login_form" :model="loginForm" :rules="logingFormRules" ref="loginFormRef">
        <el-form-item prop="username" label="用户名：">
          <el-input prefix-icon="el-icon-user-solid" v-model="loginForm.username" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password" label="密码：">
          <el-input prefix-icon="el-icon-lock" v-model="loginForm.password" show-password></el-input>
        </el-form-item>
        <el-form-item class="btns">
          <el-button type="primary" @click="login">登录</el-button>
          <el-button type="info" @click="resetLoginForm">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: "admin",
        password: "123456",
      },
      logingFormRules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 10, message: "长度在 3 到 10 个字符", trigger: "blur"},
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 15, message: "长度在 6 到 15 个字符", trigger: "blur"},
        ],
      },
    };
  },
  methods: {
    resetLoginForm() {
      this.$refs.loginFormRef.resetFields();
    },
    login() {
      this.$refs.loginFormRef.validate(async (valid) => {
        if (!valid) return;
        const { data: res } = await this.$axios.post("/login", this.loginForm).catch((error)=>{
          console.log(error);
        });
        if (res.code !== 200) {
          return this.$message.error('用户名或密码错误');
        }
        window.sessionStorage.setItem('token',res.message);
        this.$message.success('登陆成功');
        this.$message({
          type: "success",
          message: "登录成功",
          duration: 1500,
        });
        this.$router.push("/home");
      });
    },
  },
};
</script>

<style lang="less" scoped>
.login_container {
  background-color: #2b4b6b;
  height: 100%;
}
.login_box {
  width: 450px;
  height: 300px;
  background-color: #ffffff;
  border-radius: 3px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);

  .avatar_box {
    height: 130px;
    width: 130px;
    border: solid 1px #eeeeee;
    border-radius: 50%;
    padding: 10px;
    box-shadow: 0 0 10px #dddddd;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #ffffff;
    img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      background-color: #eeeeee;
    }
  }
}
.login_form {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 0 20px;
  box-sizing: border-box;
}

.btns {
  display: flex;
  justify-content: flex-end;
}
</style>