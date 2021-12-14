import { createWebHistory, createRouter } from 'vue-router';

const requireAuth = () => (to, from, next) => {
  if (localStorage.getItem('token')) return next();
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
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login'),
  },
];

export const router = createRouter({
  history: createWebHistory(),
  routes,
});