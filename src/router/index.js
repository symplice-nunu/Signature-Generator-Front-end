import { createRouter, createWebHistory } from 'vue-router';
import SignupForm from '../components/Auth/Signup.vue';
import LoginForm from '../components/Auth/Login.vue';
import ResetPasswordForm from '../components/Auth/ResetPassword.vue';
import Dashboard from '../views/Dashboard.vue';
import CompanySettings from '../views/CompanySettings.vue'; 

const routes = [
  { path: '/signup', component: SignupForm },
  { path: '/login', component: LoginForm },
  { path: '/reset-password', component: ResetPasswordForm },
  { path: '/', redirect: '/login' },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
  },
  { path: '/company-settings', component: CompanySettings }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;