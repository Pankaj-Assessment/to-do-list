import Fastify from "fastify";
import dotenv from "dotenv";
import fastifyBcrypt from "fastify-bcrypt";
import fastifyJwt from "@fastify/jwt";
import authRoutes from "./routes/auth";
import taskRoutes from "./routes/task";
import fastifyCors from "@fastify/cors";

dotenv.config();

const app = Fastify();

// Register Plugins
app.register(fastifyBcrypt, { saltWorkFactor: 10 });
app.register(fastifyJwt, { secret: process.env.JWT_SECRET || "your_secret_key" });


app.register(fastifyCors, {
  origin: true, 
  credentials: true
});

app.get("/", async (_, reply) => {
  return reply.send({ message: "Server is running!" });
});
app.register(authRoutes);
app.register(taskRoutes)
const PORT = process.env.PORT || 3000;
app.listen({ port: Number(PORT), host: "0.0.0.0" }, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});

export default app;  
