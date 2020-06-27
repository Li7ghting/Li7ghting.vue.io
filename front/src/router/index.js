import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/http/auth'
import http from '@/http/http.js'
import { isURL, isDynamicRoutes } from '@/utils/validate.js'

Vue.use(VueRouter)

const routes = [
	{
		path: '/',
		redirect: {
			name: 'Login'
		}
	},
	{
		path: '/404',
		name: '404',
		component: () => import('@/components/404.vue')
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('@/views/login/Login.vue')
	},
	{
		path: '/Home',
		name: 'Home',
		component: () => import('@/views/Home.vue'), // 采用懒加载，路由被访问时再加载
		redirect: {
			name: 'HomePage'
		},
		children: [
			{
				path: '/Home/Page',
				name: 'HomePage',
				component: () => import('@/views/menu/HomePage.vue'),
				meta: {
					isRouter: true
				}
			},
			{
				path: '/Home/Demo/Echarts',
				name: 'Echarts',
				component: () => import('@/views/menu/Echarts.vue'),
				meta: {
					isRouter: true,
					isTab: true
				}
			},
			{
				path: 'Home/Demo/Ueditor',
				name: 'Ueditor',
				component: () => import('@/views/menu/Ueditor.vue'),
				meta: {
					isRouter: true,
					isTab: true
				}
			},
			{
				path: '/Home/Demo/Baidu',
				name: 'Baidu',
				meta: {
					isRouter: true,
					isTab: true,
					iframeUrl: 'https://www.baidu.com'
				}
			},
			// 路由匹配失败时，跳转到 404 页面
			{
				path: "*",
				redirect: {
					name: '404'
				}
			},
		]
	},
	// {
	// 	path: '/about',
	// 	name: 'About',
	// 	// route level code-splitting
	// 	// this generates a separate chunk (about.[hash].js) for this route
	// 	// which is lazy-loaded when the route is visited.
	// 	component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	// }
]

const router = new VueRouter({
	routes, // 用于定义路由跳转 规则
	mode: 'history', // 用于除去地址中 #
	// 用于定义路由切换时，页面滚动
	scrollBehavior: () => ({
		y: 0
	}),
	isAddDynamicMenuRoutes: false, // 表示是否加载过动态路由（防止频繁请求动态菜单）
})

// 添加全局路由导航守卫
router.beforeEach((to, from, next) => {
	// 当开启导航守卫时，验证token是否存在
	// to.meta.isRouter 暂时用来验证token是否存在
	// isDynamicRoutes 判断该路由是否为动态路由（页面刷新时，动态路由没有 isRouter 值，此时 to.meta.isRouter 条件不成立，即动态路由拼接逻辑不能执行）
	if (to.meta.isRouter || isDynamicRoutes(to.path)) {
		// 获取 token 值
		let token = getToken()
		console.log(token)
		// token不存在时，跳转到 登录界面
		if (!token || !/\S/.test(token)) {
			next({ name: 'Login' }) // 表示跳转到指定路由
		}
		// token 存在时，判断是否已经获取过 动态菜单，未获取，即 false 时，需要获取
		if (!router.options.isAddDynamicMenuRoutes) {
			http.menu.getMenus().then(response => {
				if (response && response.data.code === 200) {
					//设置动态菜单为true，表示不再获取
					router.options.isAddDynamicMenuRoutes = true
					// 获取动态菜单数据
					let results = fnAddDynamicMenuRoutes(response.data.data)
					console.log("results:",results)
					
					if (results && results.length > 0) {
						// 遍历第一层数据
						results.map(value => {
							// 如果path值不存在，则对其赋值，并指定 component 为 Home.vue
							if (!value.path) {
								value.path = `/DynamicRoutes-${value.meta.menuId}`
								value.name = `DynamicHome-${value.meta.menuId}`
								value.component = () => import('@/views/Home.vue')
							}
						})
					}
					// 使用vuex 管理动态路有数据
					router.app.$options.store.dispatch('common/updateDynamicRoutes', results)
					// 使用router实例addRoutes方法，给当前router实例添加一个动态路由
					router.addRoutes(results)
				}
			})
		}
	}
	next() // 表示执行下一个守卫规则，若所有规则执行完毕，则结束并跳转到指定路由
})

// 用于处理动态菜单数据，将其转为 route 形式
function fnAddDynamicMenuRoutes(menuList = [], routes = []) {
	// 用于保存普通路由数据
	let temp = []
	// 用于保存存在子路由的路由数据
	let route = []
	// 遍历数据
	for (let i = 0; i < menuList.length; i++) {
		// 存在子路由，则递归遍历，并返回数据作为 children 保存
		if (menuList[i].subMenuList && menuList[i].subMenuList.length > 0) {
			// 获取路由的基本格式
			route = getRoute(menuList[i])
			console.log("route:",route)
			// 递归处理子路由数据，并返回，将其作为路由的 children 保存
			route.children = fnAddDynamicMenuRoutes(menuList[i].subMenuList)
			// 保存存在子路由的路由
			routes.push(route)
		} else {
			console.log("parent route:",getRoute(menuList[i]))
			// 保存普通路由
			temp.push(getRoute(menuList[i]))
		}
	}
	// 返回路由结果
	return routes.concat(temp)
}

// 返回路由的基本格式
function getRoute(item) {
	// 路由基本格式
	let route = {
		// 路由的路径
		path: '',
		// 路由名
		name: '',
		// 路由所在组件
		component: null,
		meta: {
			// 开启路由守卫标志
			isRouter: true,
			// 开启标签页显示标志
			isTab: true,
			// iframe 标签指向的地址（数据以 http 或者 https 开头时，使用 iframe 标签显示）
			iframeUrl: '',
			// 开启动态路由标志
			isDynamic: true,
			// 动态菜单名称（nameZH 显示中文， nameEN 显示英文）
			name_zh: item.name_zh,
			name_en: item.name_en,
			// 动态菜单项的图标
			icon: item.icon,
			// 菜单项的 ID
			menuId: item.menuId,
			// 菜单项的父菜单 ID
			parentId: item.parentId,
			// 菜单项排序依据
			orderNum: item.orderNum,
			// 菜单项类型（0: 目录，1: 菜单项，2: 按钮）
			type: item.type
		},
		// 路由的子路由
		children: []
	}
	// 如果存在 url，则根据 url 进行相关处理（判断是 iframe 类型还是 普通类型）
	if (item.url && /\S/.test(item.url)) {
		// 若 url 有前缀 /，则将其去除，方便后续操作。
		item.url = item.url.replace(/^\//, '')
		// 定义基本路由规则，将 / 使用 - 代替
		route.path = item.url.replace('/', '-')
		route.name = item.url.replace('/', '-')
		// 如果是 外部 url，使用 iframe 标签展示，不用指定 component，重新指定 path、name 以及 iframeUrl。
		if (isURL(item.url)) {
			route['path'] = `iframe-${item.menuId}`
			route['name'] = `iframe-${item.menuId}`
			route['meta']['iframeUrl'] = item.url
		} else {
			// 如果是项目模块，使用 route-view 标签展示，需要指定 component(加载指定目录下的 vue 组件)
			route.component = () => import(`@/views/dynamic/${item.url}.vue`) || null
		}
	}
	// 返回 route
	return route
}

// 解决相同路径跳转报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return routerPush.call(this, location, onResolve, onReject)
	return routerPush.call(this, location).catch(error => error)
};

export default router
