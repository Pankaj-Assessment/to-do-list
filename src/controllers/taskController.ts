import { FastifyRequest, FastifyReply } from "fastify";
import { createTask, getUserTasks, updateTask, deleteTask, shareTaskWithUser } from "../models/taskModel";
import prisma from "../utils/prisma";

export const createNewTask = async (
    req: FastifyRequest<{ Body: { title: string; content: string } }>,
    reply: FastifyReply
) => {
    const { title, content } = req.body;
    const userId = req.authUser?.userId;
    console.log(userId,"userId")

    if (!userId) return reply.status(401).send({ error: "Unauthorized" });

    const task = await createTask(title, content, userId);
    return reply.send({ message: "Task created", task });
};

// export const getTasks = async (req: FastifyRequest, reply: FastifyReply) => {
//     const userId = req.authUser?.userId;
//     if (!userId) return reply.status(401).send({ error: "Unauthorized" });

//     const tasks = await getUserTasks(userId);
//     return reply.send(tasks);
// };

export async function getTasks(req: FastifyRequest, reply: FastifyReply) {
    try {
      const tasks = await prisma.task.findMany();
      return reply.send(tasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
      return reply.status(500).send({ message: "Internal Server Error" });
    }
  }


export const updateTaskById = async (
    req: FastifyRequest<{ Params: { id: string }; Body: { title: string; content: string } }>,
    reply: FastifyReply
) => {
    const { id } = req.params;
    const { title, content } = req.body;
    const userId = req.authUser?.userId;

    if (!userId) return reply.status(401).send({ error: "Unauthorized" });

    const task = await updateTask(id, title, content, userId);
    return reply.send({ message: "Task updated", task });
};

export const deleteTaskById = async (
    req: FastifyRequest<{ Params: { id: string } }>,
    reply: FastifyReply
) => {
    const { id } = req.params;
    const userId = req.authUser?.userId;

    if (!userId) return reply.status(401).send({ error: "Unauthorized" });

    await deleteTask(id, userId);
    return reply.send({ message: "Task deleted" });
};

export const shareTask = async (
    req: FastifyRequest<{ Params: { id: string }; Body: { email: string } }>,
    reply: FastifyReply
) => {
    const { id } = req.params;
    const { email } = req.body;
    const userId = req.authUser?.userId;

    if (!userId) return reply.status(401).send({ error: "Unauthorized" });

    const result = await shareTaskWithUser(id, userId, email);
    if (!result) return reply.status(404).send({ error: "User not found" });

    return reply.send({ message: "Task shared successfully" });
};
