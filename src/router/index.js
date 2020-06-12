import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [{
		path: '/Home',
		name: 'Home',
		component: () => import('@/views/Home.vue'),
		redirect: {
			name: 'HomePage'
		},
		children: [{
				path: '/Home/Page',
				name: 'HomePage',
				component: () => import('@/views/menu/HomePage.vue')
			},
			{
				path: '/Home/Demo/Echarts',
				name: 'Echarts',
				component: () => import('@/views/menu/Echarts.vue')
			},
			{
				path: 'Home/Demo/Ueditor',
				name: 'Ueditor',
				component: () => import('@/views/menu/Ueditor.vue')
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
	{
		path: '/404',
		name: '404',
		component: () => import('@/components/404.vue')
	},
	{
		path: '/Login',
		name: 'Login',
		component: () => import('@/views/login/Login.vue')
	}
]

const router = new VueRouter({
	routes
})

export default router
