import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import AddNote from '../views/AddNote.vue';
import EditNote from '../views/EditNote.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/add-note',
      name: 'AddNote',
      component: () => import('../views/AddNote.vue'),
    },
    {
      path: '/edit-note/:id',
      name: 'EditNote',
      component: () => import('../views/EditNote.vue'),
    },
  ],
});

export default router;
