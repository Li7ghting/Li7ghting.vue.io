<template>
  <div class='header'>
    <!--是否展开侧边栏-->
    <div class='header-title' @click='foldOrOpen'>
      <a class='el-icon-s-fold' v-if='foldAside' title='language.foldAside' />
      <a class='el-icon-s-unfold' v-else title='language.unFoldAside' />
    </div>
    <!--设置、文档。用户设置等-->
    <div class='header-menu'>
      <el-menu mode='horizontal' class='header-menu-submenu'>
        <el-menu-item title='language.setUp' index='1' @click="showSetup">
          <i class='el-icon-setting'></i>
          {{language.setUp}}
        </el-menu-item>
        <el-submenu title='language.help' index='2'>
          <template slot='title'>
            <i class='el-icon-info'></i>
            {{language.help}}
          </template>
          <el-menu-item index='2-1'>
            <a
              href='https://www.cnblogs.com/l-y-h/'
              target='_blank'
              class='header-submenu-a'
            >{{language.blogAddress}}</a>
          </el-menu-item>
          <el-menu-item index='2-2'>
            <a
              href='https://www.cnblogs.com/l-y-h/'
              target='_blank'
              class='header-submenu-a'
            >{{language.codeAddress}}</a>
          </el-menu-item>
        </el-submenu>
        <el-submenu title='language.userSetUp' index='3'>
          <template slot='title'>
            <span class='header-span'>{{userName}}</span>
          </template>
          <el-menu-item index='3-1' @click='showPasswordBox'>
            <i class='el-icon-edit'></i>
            {{language.updatePassword}}
          </el-menu-item>
          <el-menu-item index='3-2' @click='logout'>
            <i class='el-icon-close'></i>
            {{language.logOut}}
          </el-menu-item>
        </el-submenu>
      </el-menu>
    </div>
    <!--密码修改框-->
    <UpdatePassword v-if='UpdatePasswordVisible' ref='updatePassword'></UpdatePassword>
    <!--设置框-->
		<Setup v-if="setUpVisible" ref="setUp"></Setup>
  </div>
</template>

<script>
import UpdatePassword from '@/views/home/UpdatePassword.vue'
import Setup from '@/views/home/Setup'
import { mapState } from 'vuex'
export default {
  name: 'Header',
  data() {
    return {
      foldAside: true,
      //userName: 'admin', // 引入vuex后，删除该属性，避免冲突
			UpdatePasswordVisible: false,
			setUpVisible: false
    }
  },
  computed: {
    // mapState 引入state写法 一种数组，直接写state中变量名即可
    ...mapState('user', ['userName']),
    // 另一种对象形式，可以直接自定义变量名
    //...mapState('user', { userName: 'userName' })
    //定义国际化
    language() {
      return {
        foldAside: this.$t("header.foldAside"),
        unFoldAside: this.$t("header.unFoldAside"),
        setUp: this.$t("header.setUp"),
        help: this.$t("header.help"),
        blogAddress: this.$t("header.blogAddress"),
        codeAddress: this.$t("header.codeAddress"),
        userSetUp: this.$t("header.userSetUp"),
        updatePassword: this.$t("header.updatePassword"),
        logOut: this.$t("header.logOut")
      }
    }
  },
  components: {
		UpdatePassword,
		Setup
  },
  methods: {
		showSetup() {
			this.setUpVisible = true,
			this.$nextTick(()=>{
				this.$refs.setUp.init()
			})
		},
    showPasswordBox() {
      this.UpdatePasswordVisible = true
      // 表示数据渲染后，执行密码框初始化
      this.$nextTick(() => {
        this.$refs.updatePassword.init()
      })
    },
    foldOrOpen() {
      this.foldAside = !this.foldAside
      // this.$emit 用于触发父组件的方法，且传参数值
      this.$emit('foldOrOpenAside', this.foldAside)
    },
    //退出登录
    logout() {
      // TODO: 退出逻辑待完成
      alert("退出逻辑未完成")
      this.$router.push({
        name: "Login"
      })
    }
  }
}
</script>

<style>
.header {
  padding: 0 10px;
  display: flex;
  height: 50px;
  line-height: 50px;
}

.header-title {
  height: 50px;
  width: 50px;
  float: left;
  font-size: 50px;
  cursor: pointer;
}

.header-menu {
  height: 50px;
  width: 100%;
  flex: 1;
  line-height: 50px;
  font-size: 30px;
}

.header-menu-submenu {
  float: right;
}

.header-submenu-a {
  text-decoration: none;
  color: #4cc4b8;
  font-weight: bold;
  font-size: 16px;
}

.header-submenu-a:hover {
  background-color: #2c3e50;
}

.el-menu--horizontal > .el-menu-item,
.el-menu--horizontal > .el-submenu .el-submenu__title {
  height: 50px !important;
  line-height: 50px !important;
}

.el-menu--collapse .el-menu .el-submenu,
.el-menu--popup {
  min-width: auto !important;
}

.header-span img {
  width: 40px;
  height: 40px;
  line-height: 40px;
  margin: 5px 10px 10px 10px;
}

.header-span {
  font-size: 20px;
}
</style>
