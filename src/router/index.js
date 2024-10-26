import { createRouter, createWebHistory } from 'vue-router';
import Home from '@/views/HomeView.vue'; // Beispiel für eine Startseite
import Login from '@/views/LoginView.vue'; // Beispiel für eine Login-Seite
import SingUp from '@/views/SingUpView.vue'

const routes = [
  { path: '/', 
    name: 'SingUp', 
    component: SingUp 
  },
  { path: '/login', 
    name: 'Login', 
    component: Login 
  },
  { path: '/home', 
    name: 'Home', 
    component: Home 
  },
  
  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;