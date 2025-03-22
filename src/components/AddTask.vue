<script setup lang="ts">
import { ref } from "vue";
import { useAuthStore } from "../stores/auth";
import { useRouter } from "vue-router";

const title = ref("");
const content = ref("");
const authStore = useAuthStore();
const router = useRouter();
const emit = defineEmits(["taskAdded"]);

const addTask = async () => {
  if (!title.value.trim() || !content.value.trim()) {
    alert("Both fields are required!");
    return;
  }

  try {
    const response = await authStore.createNewTask(title.value, content.value);
    
    // Emit the new task to the parent component only if successful
    emit("taskAdded", response);

    // Clear input fields
    title.value = "";
    content.value = "";
    router.push("/");
  } catch (error) {
    console.error("Error adding task:", error);
    alert("Failed to add task. Please try again.");
  }
};

</script>

<template>
  <div class="task-form">
    <h2>Add New Task</h2>
    <input v-model="title" type="text" placeholder="Task Title" required />
    <textarea v-model="content" placeholder="Task Content" required></textarea>
    <button @click="addTask">Add Task</button>
  </div>
</template>

<style scoped>
.task-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  max-width: 400px;
  margin: auto;
}

input, textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

button {
  background-color: green;
  color: white;
  padding: 10px;
  border: none;
  cursor: pointer;
  border-radius: 5px;
}

button:hover {
  background-color: darkgreen;
}
</style>
