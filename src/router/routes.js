import {createRouter,createWebHistory } from 'vue-router'
import { store } from '../../public/store.js'


const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/IndexPage.vue') },
      { path: 'login', component: () => import('pages/LoginPage.vue') },
      { path: 'signup', component: () => import('pages/SignupPage.vue') },
      { path: 'board', component: () => import('pages/DashboardPage.vue')},
      { path: 'stream', component: () => import('pages/StartStreamPage.vue')}
    ]
  },

  {
    path: '/board',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: ':id', component: () => import('pages/DashboardPage.vue') },
      { path: 'upload', component: () => import('pages/UploadSong.vue')}
    ],
    beforeEnter : (to, from) => {
      if (store.role != "A" )
      {
        return false
      }
      else
        return to.path
        
    },
  },

  {
    path: '/stream',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/StartStreamPage.vue') },
    ],
    beforeEnter : (to, from) => {
      if (!store.isAuth)
      {
        return from.path
      }
      else
        return to.path
        
    },
  },


  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]



export default routes
