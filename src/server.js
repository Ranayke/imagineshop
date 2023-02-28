import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";

import { authMiddleware } from "./middwares/authMiddleware.js";
import { ProductService } from "./services/product-service.js";
import { UserService } from "./services/user-service.js";

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());

app.get("/", async (req, res) => {
  res.send("IMAGINE SHOP");
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const userService = new UserService();
  const userLogged = await userService.login(email, password);
  if (userLogged) {
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign({ user: userLogged }, secretKey, {
      expiresIn: "3600s",
    });
    return res.status(200).json({ token });
  }
  return res
    .status(400)
    .json({ message: "Não foi encontrado nenhum usuário." });
});

app.get("/products", async (req, res) => {
  const productService = new ProductService();
  const products = await productService.findAll();
  return res.status(200).json(products);
});

app.use(authMiddleware);

app.post("/users", async (req, res) => {
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  await userService.create(user);
  return res.status(201).json(user);
});

app.get("/users", async (req, res) => {
  const userService = new UserService();
  const users = await userService.findAll();
  return res.status(200).json(users);
});

app.get("/users/:id", authMiddleware, async (req, res) => {
  const id = req.params.id;
  const userService = new UserService();
  const user = await userService.findById(id);
  if (user) {
    return res.status(200).json(user);
  }
  return res.status(404).json({ message: "Usuário não encontrado!" });
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id;
  const { name, email, password } = req.body;
  const user = { name, email, password };
  const userService = new UserService();
  const findUser = await userService.findById(id);
  if (findUser) {
    await userService.update(id, user);
    return res.status(200).json({ message: "Usuário atualizado com sucesso!" });
  }
  return res.status(404).json({ message: "Usuário não encontrado!" });
});

app.delete("/users/:id", async (req, res) => {
  const id = req.params.id;
  const userService = new UserService();
  const user = await userService.findById(id);
  if (user) {
    await userService.delete(id);
    return res.status(200).json({ message: "Usuário excluído com sucesso!" });
  }
  return res.status(404).json({ message: "Usuário não encontrado!" });
});

app.post("/products", async (req, res) => {
  const { name, description, price, summary, stock } = req.body;
  const product = { name, description, price, summary, stock };
  const productService = new ProductService();
  await productService.create(product);
  return res.status(201).json(product);
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
