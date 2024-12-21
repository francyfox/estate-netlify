import { createRouter, createWebHistory } from 'vue-router';
import EstatesPage from '@/views/EstatesPage.vue';

const routes = [
  { path: '/', redirect: '/estates' },
  { path: '/estates', component: EstatesPage },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
