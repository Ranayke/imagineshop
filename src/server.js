import "dotenv/config";
import express from "express";
import { UserService } from "./services/user-service.js";

const app = express();
const port = 3000;

app.get("/", async (req, res) => {
  const userService = new UserService();

  const user = {
    name: "Ranayke",
    email: "ranayke@email.com",
    password: "12345678",
  };
  await userService.add(user);

  res.send("IMAGINE SHOP");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
