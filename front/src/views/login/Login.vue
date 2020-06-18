<template>
  <div class="login-wrapper">
    <div class="login-content">
      <div class="login-main">
        <h2 class="login-main-title">{{language.title}}</h2>
        <el-form
          :model="dataForm"
          :rules="dataRule"
          ref="dataForm"
          @keyup.enter.native="dataFormSubmit()"
          status-icon
        >
          <el-form-item prop="userName">
            <el-input v-model="dataForm.userName" :placeholder="language.userName"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input v-model="dataForm.password" type="password" :placeholder="language.password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="dataForm.language"
              :placeholder="language.language"
              class="login-select"
              @change="updateLanguage"
            >
              <el-option :label="language.zh" value="zh"></el-option>
              <el-option :label="language.en" value="en"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button class="login-btn-submit" type="primary" @click="dataFormSubmit()">登录</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { setToken } from '@/http/auth'
export default {
  data() {
    return {
      dataForm: {
        userName: '',
        password: '',
        language: 'zh',
      },
      dataRule: {
        userName: [{
          required: true,
          message: this.$t("login.userNameNotNull"),
          trigger: 'blur'
        }],
        password: [{
          required: true,
          message: this.$t("login.passwordNotNull"),
          trigger: 'blur'
        }]
      }
    }
  },
  computed: {
    language() {
      return {
        title: this.$t("login.title"),
        userName: this.$t("login.userName"),
        password: this.$t("login.password"),
        language: this.$t("login.language"),
        zh: this.$t("language.zh"),
        en: this.$t("language.en"),
        signIn: this.$t("login.signIn")
      }
    }
  },
  methods: {
    ...mapActions('user', ['updateName']),
    ...mapActions('common', { updateLang: "updateLanguage", resetState: "resetState" }),
    //提交表单
    dataFormSubmit() {
      // TODO: 登录逻辑待完善
      //alert('以后完善')
      this.$http.login.getToken().then(response => {
        this.$message({
          message: this.$t("login.signInSuccess"),
          type: 'success'
        })
        setToken(response.data.token) //保存token
        this.updateName(this.dataForm.userName)
        console.log("%cresponse: ", "color:red", response)
        this.$router.replace({ name: 'Home' })
      })
    },
    updateLanguage() {
      this.$i18n.locale = this.dataForm.language
      this.updateLang(this.dataForm.language)
    }
  },
  created() {
    // 进入页面时，移除主页保存的state信息
    localStorage.removeItem("store")
    this.resetState()
    //页面创建时，获取当前系统语言，并显示在下拉框
    this.dataForm.language = this.$i18n.locale
  }
}
</script>

<style>
.login-wrapper {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  overflow: hidden;
  background-color: rgba(38, 50, 56, 0.6);
  background: url(~@/assets/bg.jpg) no-repeat;
  background-size: 100% 100%;
}

.login-content {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  margin: auto;
  height: 350px;
  width: 400px;
  background-color: #112234;
  opacity: 0.8;
}

.login-main {
  color: beige;
  padding: 20px 20px 10px 20px;
}

.el-scrollbar__wrap {
  overflow-x: scroll !important;
}

.login-select {
  left: -120px;
  width: 120px;
}
</style>
