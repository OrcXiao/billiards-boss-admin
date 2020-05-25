<template>
  <div class="register-wrap">
    <el-row>
      <el-col :span="8">
        <el-form :model="register" :rules="registerRules" ref="register" label-width="100px">
          <el-form-item label="登录账号 :" prop="account">
            <el-input v-model="register.account" maxlength="20" placeholder="请输入登录账号"></el-input>
          </el-form-item>
          <el-form-item label="登录密码 :" prop="password">
            <el-input type="password" v-model="register.password" maxlength="20" placeholder="请输入登录密码"></el-input>
          </el-form-item>
          <el-form-item label="确认密码 :" prop="agnPassword">
            <el-input type="password" v-model="register.agnPassword" maxlength="20" placeholder="请再次输入密码"></el-input>
          </el-form-item>
          <el-form-item label="手机号码 :" prop="phone">
            <el-input v-model="register.phone" maxlength="11" placeholder="请输入手机号码"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button @click="submitRegister('register')" type="primary">提交</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
    const phoneReg = /^[1][1,2,3,4,5,6,7,8,9,0][0-9]{9}$/;

    export default {
        name: "register",
        data() {
            let validatAgnPassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('确认密码不能为空'));
                } else if (this.register.password !== this.register.agnPassword) {
                    callback(new Error('两次输入的密码不一致'));
                } else {
                    callback();
                }
            };
            let validatePhone = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('手机号码不能为空'));
                } else if (!phoneReg.test(value)) {
                    callback(new Error('请输入正确的手机号码格式'));
                } else {
                    callback();
                }
            };
            return {
                register: {
                    account: '',
                    password: '',
                    agnPassword: '',
                    phone: '',
                },
                registerRules: {
                    account: [
                        {required: true, message: '登录账号不能为空', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: '登录密码不能为空', trigger: 'blur'}
                    ],
                    agnPassword: [
                        {required: true, validator: validatAgnPassword, trigger: 'blur'}
                    ],
                    phone: [
                        {required: true, validator: validatePhone, trigger: 'blur'}
                    ],
                }
            }
        },
        computed: {},
        created() {
        },
        mounted() {
            //this.$ nextTick(() => {

            //})
        },
        methods: {
            //点击提交
            submitRegister(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        let params = {
                            account: this.register.account,
                            password: this.register.password,
                            phone: this.register.phone,
                        };
                        this.$api.login.register(params).then(res => {
                            if (res.data && res.data.resultCode === 0) {
                                this.$message.success('注册成功');
                            }
                        });

                    }
                })
            },
        },
        props: {},
        watch: {},
        mixins: [],
        filters: {},
        components: {},
    }
</script>

<style lang="scss" scoped>

</style>
