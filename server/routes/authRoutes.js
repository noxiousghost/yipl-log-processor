import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import fs from "fs-extra";
import path from "path";
import { v4 as uuidv4 } from "uuid";

const router = express.Router();
const userFilePath = path.resolve("data", "users.json");

const readUsers = async () => {
  try {
    const data = await fs.readJson(userFilePath);
    return data;
  } catch (err) {
    return [];
  }
};

const writeUsers = async (users) => {
  await fs.writeJson(userFilePath, users, { spaces: 2 });
};

router.post("/signup", async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();

  if (users.find((user) => user.username === username)) {
    return res.status(409).json({ message: "User already exists" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = { id: uuidv4(), username, password: hashedPassword };
  users.push(newUser);
  await writeUsers(users);

  const token = jwt.sign({ id: newUser.id, username }, "your_jwt_secret", {
    expiresIn: "1h",
  });
  res.status(201).json({ token });
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  const users = await readUsers();
  const user = users.find((u) => u.username === username);

  if (user && (await bcrypt.compare(password, user.password))) {
    const token = jwt.sign({ id: user.id, username }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.json({ token });
  } else {
    res.status(401).json({ message: "Invalid credentials" });
  }
});

export default router;
