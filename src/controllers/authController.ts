import { FastifyRequest, FastifyReply } from "fastify";
import bcrypt from "fastify-bcrypt";
import { createUser, findUserByEmail } from "../models/userModel";

export const signup = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as { email: string; password: string };

  const hashedPassword = await req.server.bcrypt.hash(password);

  try {
    const user = await createUser(email, hashedPassword);
    return reply.send({ message: "User created successfully", user });
  } catch (error) {
    return reply.status(400).send({ error: "User already exists" });
  }
};

export const login = async (req: FastifyRequest, reply: FastifyReply) => {
  const { email, password } = req.body as { email: string; password: string };

  const user = await findUserByEmail(email);
  if (!user || !(await req.server.bcrypt.compare(password, user.password))) {
    return reply.status(401).send({ error: "Invalid credentials" });
  }

  const token = req.server.jwt.sign({ userId: user.id, email: user.email });
  return reply.send({ message: "Login successful", token });
};
