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
    },
  },
});
