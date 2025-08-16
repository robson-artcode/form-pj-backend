import express from "express";
import 'dotenv/config';
import userRoutes from "./modules/users/users.routes"
import { setupSwagger } from "../config/swagger";

const app = express();

const port = process.env.PORT || 4568;

app.use(express.json());

app.get("/ping", (req, res) => {
  return res.send("pong");
});

// Configura Swagger
setupSwagger(app);

// Configura rotas
app.use('/users', userRoutes);

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
