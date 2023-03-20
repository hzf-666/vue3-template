import { createRouter, createWebHashHistory } from 'vue-router';
import interceptor from './interceptor.js';

const routes = [
  {
    path: '/home',
    name: 'Home',
    meta: {
      title: '首页',
    },
    component: () => import('@v/Home/index.vue'),
  },
  {
    path: '/404',
    name: '404',
    meta: {
      title: '404 not found',
    },
    component: () => import('@v/Error/404.vue'),
  },
  { path: '/', redirect: '/home' },
  { path: '/:catchAll(.*)', redirect: '/404' },
];

export default interceptor(
  createRouter({
    history: createWebHashHistory(),
    routes,
  })
);
