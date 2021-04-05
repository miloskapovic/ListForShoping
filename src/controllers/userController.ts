import bcrypt from "bcrypt";
import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import passport from "passport";
import "../auth/passportHandler";
import { User } from "../models/user";
import { JWT_SECRET } from "../util/secrets";

export class UserController {

  public async registerUser(req: Request, res: Response): Promise<void> {
    await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    const token = jwt.sign({ username: req.body.username, scope : req.body.scope }, JWT_SECRET || "");
    res.status(200).send({ token: token });
  }

  public authenticateUser(req: Request, res: Response, next: NextFunction) {
    passport.authenticate("local", function (err, user, info) {
      if (err) return next(err);
      if (!user && info.message) {
        return res.status(422).json({ status: "error", message: info.message });
      } else if (!user) {
        return res.status(401).json({ status: "error", code: "unauthorized" });
      } else {
        const token = jwt.sign({ username: user.username }, JWT_SECRET || "");
        res.status(200).send({ token: token });
      }
    })(req, res, next);
  }






}