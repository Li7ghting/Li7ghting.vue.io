export default {
  // 开启命名空间（防止模块间冲突），访问需要使用 模块名+方法名
  namespaced: true,
  // 管理数据 状态
  state: {
    userName: 'Admin'
  },
  //更改state (同步)
  mutations: {
    updateName(state, data) {
      if (data) {
        state.userName = data
      } else {
        state.userName = 'Admin'
      }
    }
  },
  //异步触发mutations
  actions: {
    updateName({ commit, state }, data) {
      commit("updateName", data)
    }
  }
}
