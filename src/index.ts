import express from "express";
import 'dotenv/config';
import userRoutes from "./modules/users/users.routes"

const app = express();

const port = process.env.PORT || 4568;

app.use(express.json());

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.use('/api', userRoutes); // Monta as rotas com prefixo '/api' (ex.: POST /api/users)

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
