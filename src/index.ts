import "dotenv/config";
import express, { Request, Response } from "express";

import bodyParser from "body-parser";
const app = express();

import { connect } from "./db";
import { login, register } from "./controllers/register";
import { User } from "./models/user";
import { initConfig } from "./utils/config";

 connect().then(() => {
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  initConfig();
  app.get("/", async (req: Request, res: Response) => {
    return res.send(`Loading v3 of ${Math.random()}`);
  });

  app.get("/members", async (req: Request, res: Response) => {
    const members = await User.find().select("username");
    return res.send(members);
  });

  app.post("/register", register);
  app.post("/login", login);
  
  console.log("===APPLICATION RUNNING===")
  app.listen(80);
});
