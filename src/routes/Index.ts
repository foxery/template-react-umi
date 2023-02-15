export default [
  {
    routes: [
      {
        path: '/login',
        component: '@/pages/login/Login',
        exact: true,
        title: '登录',
      },
      {
        path: '/personal',
        component: '@/pages/index/layout/Layout',
        wrappers: ['@/wrappers/auth/Auth'],
        routes: [
          {
            path: '/personal/index',
            component: '@/pages/index/Index',
            exact: true,
            title: '',
          },
        ],
      },
      {
        path: '*',
        redirect: '/login',
      },
    ],
  },
];
