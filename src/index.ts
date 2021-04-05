import "dotenv/config";
import express from "express";

import bodyParser from "body-parser";
const app = express();

import { connect } from "./db";
import { UserRoutes } from "./routes/userRoutes";
import { ProductRoutes } from "./routes/shopingListRoutes";
import compression from "compression";
import cors from "cors";

 connect().then(() => {
  app.use(compression());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(bodyParser.json());

  app.use("/api/user", new UserRoutes().router);
  app.use("/api/shopingList", new ProductRoutes().router);
  
  console.log("===APPLICATION RUNNING===")
  app.listen(80);
});
