<template>
  <div class="login-wrap dis-fl ju-ct al-ct wd100 hg100">
    <div class="login-box bo-r6 pd20">
      <div class="te-ct fs18 ft-b pd-b20">台球+后台管理系统</div>
      <!--      <el-tabs v-model="activeName" @tab-click="handleClick">-->
      <!--        <el-tab-pane label="登 录" name="1">-->
      <el-form :model="login" :rules="loginRules" ref="login">
        <el-form-item prop="user">
          <el-input maxlength="20" v-model="login.user" placeholder="请输入账号"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input maxlength="20" v-model="login.password" type="password" placeholder="请输入密码"></el-input>
        </el-form-item>
        <el-form-item prop="authCode">
          <div class="dis-fl auth-wrap">
            <el-input
              class="auth-input"
              maxlength="20"
              v-model="login.authCode"
              placeholder="请输入验证码"
            ></el-input>
            <div class="auth-code" title="点击更换验证码" @click="getAuthCode">
              <img class="wd100 hg100 cu-pt" :src="verificationCode" alt="验证码" />
            </div>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="btnLoginState"
            @click="submitLogin('login')"
            class="wd100"
            type="primary"
          >登 录</el-button>
        </el-form-item>
      </el-form>
      <!--        </el-tab-pane>-->
      <!--        <el-tab-pane label="注 册" name="2">-->
      <!--          <el-form :model="register" :rules="loginRules" ref="register">-->
      <!--            <el-form-item prop="user">-->
      <!--              <el-input maxlength="20" v-model="register.user" placeholder="请输入账号"></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item prop="password">-->
      <!--              <el-input maxlength="20" v-model="register.password" type="password" placeholder="请输入密码"></el-input>-->
      <!--            </el-form-item>-->
      <!--            <el-form-item>-->
      <!--              <el-button @click="submitRegister('register')" class="wd100" type="primary">注 册</el-button>-->
      <!--            </el-form-item>-->
      <!--          </el-form>-->

      <!--        </el-tab-pane>-->
      <!--      </el-tabs>-->
    </div>
  </div>
</template>

<script>
import Vue from "vue";

export default {
  name: "login",
  data() {
    return {
      verificationCode: "",
      login: {
        user: "",
        password: "",
        authCode: ""
      },
      loginRules: {
        user: [{ required: true, message: "请输入账号", trigger: "blur" }],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }],
        authCode: [{ required: true, message: "请输入验证码", trigger: "blur" }]
      },
      activeName: "1",
      register: {
        user: "",
        password: ""
      },
      btnLoginState: false
    };
  },
  computed: {},
  created() {
    //TiYi
    let vm = this;
    Vue.prototype.WebInstance.On("AdminLoginResult_GC", d => {
      vm.btnLoginState = false;
      vm.getAuthCode();

      if (d.errCode === 0) {
        localStorage.setItem(
          "userLoginLog",
          this.login.user + new Date().getTime() + ""
        );
        Vue.prototype.Account = d.account;
        this.$message.success("登录成功");
        this.$router.push("/admin");
      }

      console.log("Recv Login :", d);
    });
  },
  mounted() {
    localStorage.clear();
    this.getAuthCode();
  },
  methods: {
    //获取验证码
    getAuthCode() {
      let params = {
        with: 100,
        height: 40
      };
      this.$api.login
        .getCode(params)
        .then(res => {
          return (
            "data:image/png;base64," +
            btoa(
              new Uint8Array(res.data).reduce(
                (data, byte) => data + String.fromCharCode(byte),
                ""
              )
            )
          );
        })
        .then(data => {
          this.verificationCode = data;
        });
    },
    //切换选项卡
    handleClick(tab, event) {
      this.login = {
        user: "",
        password: ""
      };
      this.register = {
        user: "",
        password: ""
      };
      this.$refs["login"].resetFields();
      this.$refs["register"].resetFields();
    },
    //点击登录
    submitLogin(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.btnLoginState = true;
          /*
            let params = {
              account: this.login.user,
              password: this.login.password,
              randcheckcode: this.login.authCode,
            };
            this.$api.login.selectUser(params).then(res => {
              this.btnLoginState = false;
              this.getAuthCode();
              if (res.data.resultCode === 0) {
                localStorage.setItem('userLoginLog', this.login.user + new Date().getTime() + '');
                this.$message.success('登录成功');
                this.$router.push('/admin');
              }
            });
            */

          let vm = this;

          let params = {
            user: this.login.user,
            passworld: this.login.password,
            vertiCode: this.login.authCode
          };
          this.$api.socket.login(params);

          // Vue.prototype.WebInstance.On("AdminLoginResult_GC", d => {
          //   vm.btnLoginState = false;
          //   vm.getAuthCode();

          //   if (d.errCode === 0) {
          //     localStorage.setItem(
          //       "userLoginLog",
          //       this.login.user + new Date().getTime() + ""
          //     );

          //     this.$message.success("登录成功");
          //     this.$router.push("/admin");
          //   }

          //   console.log("Recv Login :", d);
          // });
        }
      });
    },
    //点击注册
    submitRegister(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
        }
      });
    }
  },
  props: {},
  watch: {},
  mixins: [],
  filters: {},
  components: {}
};
</script>

<style lang="scss" scoped>
.login-wrap {
  background: url("../../assets/img/login-bg.jpg") no-repeat;

  & > .login-box {
    width: 300px;
    height: auto;
    background: #ffffff;

    .auth-wrap {
      .auth-input {
        width: 150px;
      }

      .auth-code {
        width: 100px;
        height: 40px;
        margin-left: 10px;
        border-radius: 4px;
        border: 1px solid #dcdfe6;
      }
    }
  }

  /deep/ .el-tabs__nav {
    width: 100%;

    .el-tabs__item {
      width: 50%;
      padding: 0 !important;
      text-align: center;
    }

    .el-tabs__active-bar {
      width: 50% !important;
    }
  }
}
</style>
