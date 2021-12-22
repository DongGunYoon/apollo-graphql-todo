import { createWebHistory, createRouter } from 'vue-router';

const requireAuth = () => (to, from, next) => {
  if (localStorage.getItem('token')) return next();
  alert("Please Login First!")
  next('/login');
}

const routes = [
  {
    path: '/home',
    name: 'Home',
    component: () => import('@/views/Home'),
    beforeEnter: requireAuth()
  },
  {
    path: '/friend',
    name: 'friend',
    component: () => import('@/views/Friend'),
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});