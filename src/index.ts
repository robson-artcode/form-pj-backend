import express from "express";
import 'dotenv/config';
const sequelize = require('./database');

const app = express();

const port = process.env.PORT || 4568;

app.get("/ping", (req, res) => {
  return res.send("pong");
});

app.post("/register", async (req, res) => {
  try {
    await sequelize.authenticate();
    return res.json({ message: "✅ Conectado ao MySQL com sucesso!" });
  } catch (error) {
    return res.json({ message: `Erro ao conectar no MySQL: ${error}` });
  }
});

app.listen(port, () => {
  console.log(`Escutando na porta ${port}`);
});
