import prisma from "../utils/prisma";

export const createTask = async (title: string, content: string, ownerId: string) => {
  return prisma.task.create({ data: { title, content, ownerId } });
};

export const getUserTasks = async (userId: string) => {
  return prisma.task.findMany({
    where: {
      OR: [{ ownerId: userId }, { sharedWith: { some: { id: userId } } }],
    },
    include: { owner: true, sharedWith: true },
  });
};

export const updateTask = async (taskId: string, title: string, content: string, ownerId: string) => {
  return prisma.task.updateMany({
    where: { id: taskId, ownerId },
    data: { title, content },
  });
};

export const deleteTask = async (taskId: string, ownerId: string) => {
  return prisma.task.deleteMany({ where: { id: taskId, ownerId } });
};

export const shareTaskWithUser = async (taskId: string, ownerId: string, userEmail: string) => {
  const userToShare = await prisma.user.findUnique({ where: { email: userEmail } });

  if (!userToShare) return null;

  return prisma.task.update({
    where: { id: taskId, ownerId },
    data: { sharedWith: { connect: { id: userToShare.id } } },
  });
};
