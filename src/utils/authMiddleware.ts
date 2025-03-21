import { FastifyRequest, FastifyReply } from "fastify";
import jwt from "jsonwebtoken";

interface DecodedToken {
    userId: string;
}
declare module 'fastify' {
    interface FastifyRequest {
      authUser?: DecodedToken; 
    }
  }
export const authMiddleware = async (request: FastifyRequest, reply: FastifyReply) => {
    try {
        const token = request.headers.authorization?.split(" ")[1];
        if (!token) {
            return reply.status(401).send({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as DecodedToken;

        request.authUser = { userId: decoded.userId }; // ✅ Use authUser instead of user

    } catch (error) {
        return reply.status(401).send({ message: "Invalid token" });
    }
};
