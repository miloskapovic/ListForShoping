import { Request, Response, Router } from "express";
import bcrypt, { compare } from "bcryptjs";

import { User } from "../models/user";

export const userRouter = Router();

const register = async (req: Request, res: Response) => {
  const { password, username } = req.body;

  if (!username)
    return res.send({ error: true, message: "Please enter an Username" });
  if (!password)
    return res.send({ error: true, message: "Please enter a Password" });

  const salt = bcrypt.genSaltSync(10);
  const encryptedPassword = bcrypt.hashSync(password, salt);

  try {
    const newMember = await new User({
      username,
      password: encryptedPassword,
      salt
    }).save();

    return res.send({ error: false, member: newMember });
  } catch (err) {
    console.error(err);
  }
};

const login = async (req: Request, res: Response) => {
  const { password, username } = req.body;

    const user: any = await User.findOne({username: username});

    if (!user) {
        res.status(400).send({error: 'Invalid username or password'});
        return;
    }

    const validPassword = await compare(password, user.password);

    if (!validPassword) {
        res.status(400).send({error: 'Invalid username or password'});
        return;
    }

    const token = user.generateAuthToken();

    res.send({auth_token: token});
};

export { register, login }