import {
    createRouter,
    createWebHistory
  } from 'vue-router';
  const router = createRouter({
    history: createWebHistory(),
    routes: [{
        path: '/',
        name: 'login',
        component: () => import('../views/login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import('../views/register.vue'),
        children:[
          {
            path: 'updateimg/:id',
            name: 'updateimg',
            component: () => import('../page/register/imgupdate.vue'),
          },
          {
            path: '',
            name: 'register',
            component: () => import('../page/register/register.vue'),
          },
        ]
      },  
      {
        path: '/home',
        name: 'home',
        component: () => import('../views/home.vue')
      },  
      {
        path: '/admin',
        name: 'admin',
        component: () => import('../views/admin.vue'),
        children:[
          {
            path:'',
            name:'admin',
            component:()=>import('../page/admin/home.vue')
          },
          {
            path:'user',
            name:'user',
            component:()=>import('../page/admin/user.vue')
          },
          {
            path:'course',
            name:'course',
            component:()=>import('../page/admin/course.vue')
          }
        ]
      }, 
      {
        path: '/creator',
        name: 'creator',
        component: () => import('../views/creator.vue'),
      }
    ]
  })
  export default router;