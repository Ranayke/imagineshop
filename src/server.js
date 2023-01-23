import express from "express";
import { User } from "./User.js";

const app = express();
const port = 3000;

app.get("/", (req, res) => {
  const user = new User("Ranayke", "ranayke@email.com");

  const user2 = new User('Fransisco', 'Francisco@email.com')

  console.log(user2);
  user2.name = 'João'
  console.log(user);
  console.log(user2);

  console.log(user.getFullName());

  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
