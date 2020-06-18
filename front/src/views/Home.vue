<template>
  <!--  <div class="home">-->
  <!--    <img alt="Vue logo" src="../assets/logo.png">-->
  <!--    <HelloWorld msg="Welcome to Your Vue.js App"/>-->
  <!--  </div>-->
  <!--v-loading\element-loading-text... -->
  <el-container
    class="container"
    v-loading="false"
    element-loading-text="拼命加载中"
    element-loading-background="rgba(0,0,0,0.8)"
    element-loading-spinner="el-icon-loading"
  >
    <!--侧边栏-->
    <Aside :foldAside="foldAside"></Aside>
    <!-- 用于垂直布局 -->
    <el-container direction="vertical">
      <!--头部导航栏-->
      <Header @foldOrOpenAside="foldOrOpen"></Header>
      <!--内容-->
      <Content></Content>
    </el-container>
  </el-container>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'
import Header from '@/views/home/Header.vue'
import Aside from '@/views/home/Aside.vue'
import Content from '@/views/home/Content.vue'

export default {
  name: 'Home',
  components: {
    Header,
    Aside,
    Content
  },
  data() {
    return {
      foldAside: true
    }
  },
  methods: {
    foldOrOpen(data) {
      this.foldAside = data
    }
  },
  created() {
    //在页面加载时读取localStorage里的状态信息
    if (localStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({}, this.$store.state, JSON.parse(localStorage.getItem("store"))))
    }

    //在页面刷新时将vuex里的信息保存到localStorage里
    window.addEventListener("beforeunload", () => {
      localStorage.setItem("store", JSON.stringify(this.$store.state))
    })
  }
}
</script>

<style>
.container {
  height: 100%;
}
</style>
