<script setup lang="ts">
import { ref } from "vue";
import AddTask from "../components/AddTask.vue";

const tasks = ref<{ title: string; content: string }[]>([]);

// Function to handle task addition
const handleTaskAdded = (task: { title: string; content: string }) => {
  tasks.value.push(task);
};
</script>

<template>
  <div>
    <h1>Task Manager</h1>
    <AddTask @taskAdded="handleTaskAdded" />
    
    <div v-if="tasks.length > 0">
      <h2>Task List</h2>
      <ul>
        <li v-for="(task, index) in tasks" :key="index">
          <h3>{{ task.title }}</h3>
          <p>{{ task.content }}</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
h1 {
  text-align: center;
}

ul {
  list-style: none;
  padding: 0;
}

li {
  border: 1px solid #ddd;
  padding: 10px;
  margin-top: 10px;
  border-radius: 5px;
  background: #f9f9f9;
}
</style>
