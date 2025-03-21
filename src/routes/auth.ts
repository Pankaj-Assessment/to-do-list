import { FastifyInstance } from "fastify";
import { signup ,login} from "../controllers/authController";

export default async function authRoutes(app: FastifyInstance) {
  app.post("/signup", signup);
  app.post("/login", login);
}
