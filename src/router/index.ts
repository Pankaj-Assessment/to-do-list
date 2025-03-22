import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../components/HomeView.vue";
import LoginView from "../components/LoginView.vue";
import { useAuthStore } from "../stores/auth";
import AddTask from "../components/AddTask.vue";

const routes = [
  { path: "/", component: HomeView, meta: { requiresAuth: true } },
  { path: "/login", component: LoginView },
  { path: "/createNewTask", component: AddTask },
  //{ path: "/login", component: LoginView },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// Navigation guard for protected routes
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.token) {
    next("/login"); // Redirect to login if not authenticated
  } else {
    next();
  }
});

export default router;
