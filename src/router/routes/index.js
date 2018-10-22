/**
 * @file Routes
 */

export default [
  {
    path: '',
    name: 'home',
    component: resolve => require(['../../pages/home.vue'], resolve),
  },
  {
    path: '/articles',
    component: resolve => require(['../../pages/articles/index.vue'], resolve),
    children: [
      {
        path: '',
        component: resolve => require(['../../pages/articles/list/index.vue'], resolve),
      },
    ],
  },
  {
    path: '/404',
    name: '404',
    component: resolve => require(['../../pages/404.vue'], resolve),
  },
  {
    path: '*',
    redirect: '/404',
  },
]

