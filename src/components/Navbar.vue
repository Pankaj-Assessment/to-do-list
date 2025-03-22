<script setup lang="ts">
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";
import { computed } from "vue";

const authStore = useAuthStore();
const router = useRouter();


// Check if the user is logged in
const isLoggedIn = computed(() => !!authStore.token);

const logout = () => {
  authStore.logout();
  router.push("/login"); 
};

const goToLogin = () => {
  router.push("/login");
};

const AddTaskButton = () => {
  router.push("/createNewTask");
};
</script>

<template>
  <nav class="navbar">
    <div class="logo">My To Do List</div>
    <div class="actions">
      <template v-if="isLoggedIn">
        <!-- <span class="user-info">Logged in</span> -->
        <button @click="AddTaskButton">Create Task</button>
        <button @click="logout">Logout</button>
      </template>
      <template v-else>
        <button @click="goToLogin">Login</button>
      </template>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px;
  background-color: #1adbf1;
  color: white;
}

.logo {
  font-size: 1.2rem;
  font-weight: bold;
}

.actions {
  display: flex;
  gap: 10px;
}

button {
  background: white;
  color: #070707;
  padding: 8px 12px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}
</style>
