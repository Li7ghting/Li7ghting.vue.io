import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/http/auth'

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
			}
		]
	},
	{
		path: '/about',
		name: 'About',
		// route level code-splitting
		// this generates a separate chunk (about.[hash].js) for this route
		// which is lazy-loaded when the route is visited.
		component: () => import( /* webpackChunkName: "about" */ '../views/About.vue')
	},
	// {
	// 	path: "*",
	// 	redirect: {
	// 		name: '404'
	// 	}
	// }
]

const router = new VueRouter({
	routes, // 用于定义路由跳转 规则
	mode: 'history', // 用于除去地址中 #
	// 用于定义路由切换时，页面滚动
	scrollBehavior: () => ({
		y: 0
	})
})

// 添加全局路由导航守卫
router.beforeEach((to, from, next) => {
	// 当开启导航守卫时，验证token是否存在
	if (to.meta.isRouter) {
		// 获取 token 值
		let token = getToken()
		console.log(token)
		// token不存在时，跳转到 登录界面
		if (!token || !/\S/.test(token)) {
			next({ name: 'Login' }) // 表示跳转到指定路由
		}
	}
	next() // 表示执行下一个守卫规则，若所有规则执行完毕，则结束并跳转到指定路由
})

// 解决相同路径跳转报错
const routerPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location, onResolve, onReject) {
	if (onResolve || onReject)
		return routerPush.call(this, location, onResolve, onReject)
	return routerPush.call(this, location).catch(error => error)
};

export default router
