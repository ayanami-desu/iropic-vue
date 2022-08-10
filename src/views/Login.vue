<template>
  <div class="container">
    <div
      class="logintext"
      v-if="hasLogin"
    >
      <div>
        <h2>已经登陆了</h2>
      </div>
      <el-button @click="logout">
        注销
      </el-button>
    </div>
    <div
      class="loginbody"
      v-else
    >
      <div class="logintext">
        Welcome
      </div>
      <el-form
        ref="form"
        :model="form"
        :rules="rules"
        class="form-body"
      >
        <el-form-item prop="username">
          <el-input
            v-model="form.username"
            clearable
            placeholder="请输入账号"
          />
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="form.password"
            clearable
            placeholder="请输入密码"
            show-password
          />
        </el-form-item>
      </el-form>
      <div class="butt">
        <el-button
          type="primary"
          @click.native.prevent="login('form')"
        >
          登录
        </el-button>
        <el-button
          type="primary"
          @click.native.prevent="logout"
        >
          清除token
        </el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { getTokenReq, checkLoginReq, refreshTokenReq } from "@/api/api.js";

export default {
  name: "Login",
  data() {
    return {
      hasLogin: false,
      form: {
        password: "",
        username: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { max: 10, message: "不能大于10个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { max: 16, message: "不能大于16个字符", trigger: "blur" },
        ],
      },
    };
  },
  created: function () {
    this.checkLogin();
  },
  methods: {
    checkLogin() {
      let accessToken = localStorage.getItem('accessToken')
      if ( !accessToken ) {
        this.$message('请登录！')
        return
      }
      checkLoginReq()
        .then((res) => {
          if (res.code === 1) {
            this.hasLogin = true;
            this.$message({
                type: 'success',
                message: '已经登录了'
              })
          }
        })
        .catch(() => {
          let refreshToken = localStorage.getItem("refreshToken");
          refreshTokenReq({
            refresh: refreshToken || "123",
          }).then((res) => {
              localStorage.setItem("accessToken", res.access);
              localStorage.setItem("refreshToken", res.refresh);
              this.$message({
                type: 'success',
                message: 'token刷新成功'
              })
              this.hasLogin = true;
          }).catch((err) => {
            console.log(err)
            this.$message('token过期，请登录！')
          })

        });
    },
    login(form) {
      this.$refs[form].validate((valid) => {
        if (valid) {
          getTokenReq(this.form)
            .then((res) => {
                localStorage.setItem("accessToken", res.access);
                localStorage.setItem("refreshToken", res.refresh);
                this.$message({
                  message: "登录成功啦",
                  type: "success",
                  showClose: true,
                });
                this.$router.replace('/')
            })
            .catch(() => {
              this.$message({
                message: "账户名或密码错误",
                type: "error",
                showClose: true,
              });
            });
        } else {
          return false;
        }
      });
    },
    logout(){
      try{
        localStorage.removeItem('accessToken')
        localStorage.removeItem('refreshToken')
        this.$message('注销成功')
        this.$router.replace('/')
      }
      catch (err){
        console.log(err)
        this.$message('注销失败')
      }
    }
  },
};
</script>

<style scoped>
.container{
  width: 100%;
}
.loginbody {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.logintext {
  margin-bottom: 20px;
  line-height: 50px;
  text-align: center;
  font-size: 30px;
  font-weight: bolder;
  color: white;
  text-shadow: 2px 2px 4px #000000;
}
.butt {
  margin-top: 10px;
  text-align: center;
}
.form-body {
  display: flex;
  width: 50%;
  flex-direction: column;
  align-items: center;
}
</style>