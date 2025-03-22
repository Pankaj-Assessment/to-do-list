import { defineStore } from "pinia";
import api from "../services/api";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    token: localStorage.getItem("token") || null,
  }),
  actions: {
    async login(email: string, password: string) {
      try {
        const response = await api.post("/login", { email, password });
        const token = response.data.token;
        localStorage.setItem("token", token);
        return response.data;
      } catch (error) {
        console.error("Login failed", error);
      }
    },
    logout() {
      
      this.token = null;
      localStorage.removeItem("token");
      this.$reset();
    },
    async createNewTask(title: string, content: string) {
      try {
        const token = localStorage.getItem("token"); // Get token from localStorage
        if (!token) {
          throw new Error("No authentication token found");
        }
    
        const response = await api.post(
          "/createNewTask",
          { title, content },
          {
            headers: {
              Authorization: `Bearer ${token}`, // Send token in headers
            },
          }
        );
    
        return response.data;
      } catch (error) {
        console.error("Task Creation failed", error);
        throw error; // Ensure proper error handling in UI
      }
    },
    
  },
});
