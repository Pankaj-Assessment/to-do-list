import { FastifyInstance } from "fastify";
import { createNewTask, getTasks, deleteTaskById, shareTask, updateTaskById } from "../controllers/taskController";
import { authMiddleware } from "../utils/authMiddleware";

export default async function taskRoutes(app: FastifyInstance) {
  app.post("/createNewTask", { preHandler: authMiddleware }, createNewTask);
  app.get("/getTasks", getTasks); // No auth required
  app.post("/shareTask", { preHandler: authMiddleware }, shareTask);
  app.post("/updateTaskById", { preHandler: authMiddleware }, updateTaskById);
  app.post("/deleteTaskById", { preHandler: authMiddleware }, deleteTaskById);
}
