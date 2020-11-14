<template>
  <div class="login-container">
    <el-form ref="loginForm" :model="loginForm" :rules="loginRules" class="login-form" auto-complete="on" label-position="left">

      <div class="title-container">
        <h3 class="title">海龟 - 登陆入口</h3>
      </div>

      <el-form-item prop="account">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="account"
          v-model="loginForm.account"
          placeholder="手机/邮箱"
          name="account"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>

      <el-form-item v-if="loginForm.loginType === 'byPassword'" prop="password">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="password"
          v-model="loginForm.password"
          :type="passwordType"
          placeholder="密码"
          name="password"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <el-form-item v-if="loginForm.loginType === 'byCode'" prop="code">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          ref="code"
          v-model="loginForm.code"
          style="width: 330px;"
          placeholder="验证码"
          name="code"
          type="text"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleRegister"
        />
        <el-button v-if="!sendCoded" type="text" style="color: grey;" @click="getCode">获取验证码</el-button>
      </el-form-item>

      <el-button :loading="loading" type="primary" style="width:100%;margin-bottom:30px;" @click.native.prevent="handleLogin">登陆</el-button>

      <div class="tips">
        <el-row>
          <el-col :span="12">
            <el-link :underline="false" href="/#/register">
              还没有账号？点我注册
            </el-link>
          </el-col>
          <el-col :span="12">
            <el-link :underline="false" style="float: right;" @click="switchLoginType">
              {{ siwtchLoginTypeText }}
            </el-link>
          </el-col>
        </el-row>
      </div>

    </el-form>
  </div>
</template>

<script>
import { validUsername } from '@/utils/validate'
import { sendCode } from '@/api/message/message'

export default {
  name: 'Login',
  data() {
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error('请输入正确的账号名'))
      } else {
        callback()
      }
    }
    const validatePassword = (rule, value, callback) => {
      if (this.loginForm.loginType === 'byPassword') {
        if (value.length < 6) {
          callback(new Error('密码不能少于六位字符'))
        } else {
          callback()
        }
      }
    }
    const validateCode = (rule, value, callback) => {
      if (this.loginForm.loginType === 'byCode') {
        if (value === '') {
          callback(new Error('验证码不能为空'))
        } else {
          callback()
        }
      }
    }
    return {
      loginForm: {
        account: '',
        password: '',
        code: '',
        loginType: 'byPassword' // 默认登陆方式
      },
      loginRules: {
        account: [{ required: true, trigger: 'blur', validator: validateUsername }],
        password: [{ required: true, trigger: 'blur', validator: validatePassword }],
        code: [{ required: true, trigger: 'blur', validator: validateCode }]
      },
      loading: false,
      passwordType: 'password',
      sendCoded: false,
      siwtchLoginTypeText: '使用验证码登陆',
      redirect: undefined
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.loading = true
          this.$store.dispatch('user/login', this.loginForm).then(() => {
            this.$router.push({ path: this.redirect || '/' })
            this.loading = false
          }).catch(() => {
            this.loading = false
          })
        } else {
          console.log('登陆错误')
          return false
        }
      })
    },
    getCode() {
      sendCode({ account: this.loginForm.account, sceneCode: 'login_by_code' }).then(response => {
        this.$message({ message: '验证码发送成功', type: 'success' })
        this.sendCoded = true
      })
    },
    switchLoginType() {
      if (this.loginForm.loginType === 'byPassword') {
        // 切换验证码登陆
        this.loginForm.loginType = 'byCode'
        this.siwtchLoginTypeText = '使用密码登陆'
      } else {
        // 切换密码登陆
        this.loginForm.loginType = 'byPassword'
        this.siwtchLoginTypeText = '使用验证码登陆'
      }
    }
  }
}
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg:#283443;
$light_gray:#fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg:#2d3a4b;
$dark_gray:#889aa4;
$light_gray:#eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips {
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }

  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }

  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
