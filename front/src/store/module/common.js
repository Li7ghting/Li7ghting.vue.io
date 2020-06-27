export default {
    // 开启命名空间（防止各模块间命名冲突），访问时需要使用 模块名 + 方法名
    namespaced: true,
    // 管理数据（状态）
    state: {
        // 用于保存语言设置（国际化），默认为中文
        language: 'zh',
        // 表示侧边栏选中的菜单项的名
        menuActiveName: '',
        // 表示标签页数据，数组
        mainTabs: [],
        // 表示标签页中选中的标签名
        mainTabsActiveName: '',
        // 用于保存动态路由的数据
        dynamicRoutes: [],
    },
    // 更改 state（同步）
    mutations: {
        updateLanguage(state, data) {
            state.language = data
        },
        updateMenuActiveName(state, name) {
            state.menuActiveName = name
        },
        updateMainTabs(state, tabs) {
            state.mainTabs = tabs
        },
        updateMainTabsActiveName(state, name) {
            state.mainTabsActiveName = name
        },
        updateDynamicRoutes(state, routes) {
            state.dynamicRoutes = routes
        },
        // 重置项目state
        resetState(state) {
            let stateTmp = {
                language: 'zh',
                menuActiveName: '',
                mainTabs: [],
                mainTabsActiveName: ''
            }
            Object.assign(state,stateTmp)
        }
    },
    // 异步触发 mutations
    actions: {
        updateLanguage({ commit, state }, data) {
            commit("updateLanguage", data)
        },
        updateMenuActiveName({ commit, state }, name) {
            console.log("updateMenuActiveName")
            commit("updateMenuActiveName", name)
        },
        updateMainTabs({ commit, state }, tabs) {
            console.log("updateMainTabs")
            commit("updateMainTabs", tabs)
        },
        updateMainTabsActiveName({ commit, state }, name) {
            console.log("updateMainTabsActiveName")
            commit("updateMainTabsActiveName", name)
        },
        updateDynamicRoutes( {commit, state}, routes) {
            commit("updateDynamicRoutes", routes)
        },
        resetState({commit,state}) {
            commit("resetState")
        }
    }
}
