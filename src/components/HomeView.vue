<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";

const tasks = ref([]);

const fetchTasks = async () => {
  try {
    const response = await api.get("/getTasks"); 
    tasks.value = response.data;
  } catch (error) {
    console.error("Failed to fetch tasks", error);
  }
};

onMounted(fetchTasks);
</script>

<template>
  <div class="task-container">
    <h1>Task List</h1>
    <ul v-if="tasks.length">
      <li v-for="task in tasks" :key="task.id" class="task-item">
        <h3>{{ task.title }}</h3>
        <p>{{ task.content }}</p>
        <small>Created At: {{ new Date(task.createdAt).toLocaleString() }}</small>
      </li>
    </ul>
    <p v-else>No tasks available.</p>
  </div>
</template>

<style scoped>
.task-container {
  max-width: 600px;
  margin: auto;
  padding: 20px;
}

.task-item {
  border: 1px solid #ddd;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
</style>
