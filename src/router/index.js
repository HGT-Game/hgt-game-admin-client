import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import LayoutAdmin from '@/layout-admin'

export const constantRoutes = [
  // 登陆
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  // 注册
  {
    path: '/register',
    component: () => import('@/views/register/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
      path: '/',
      component: LayoutAdmin,
      redirect: '/admin',
      hidden: true,
  },

  // 后台首页
  {
    path: '/admin',
    component: LayoutAdmin,
    redirect: '/admin/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/admin/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard' }
    }]
  },

  {
    path: '/admin/question',
    component: LayoutAdmin,
    name: 'Admin/Question',
    meta: { title: '汤管理', icon: 'example' },
    children: [
      {
        path: 'question-list',
        name: 'Question-List',
        component: () => import('@/views/admin/question/list'),
        meta: { title: '列表', icon: 'table' }
      },
      {
        path: 'question-add',
        name: 'Question-Add',
        component: () => import('@/views/admin/question/add'),
        meta: { title: '添加', icon: 'form' }
      }
    ]
  },

  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
