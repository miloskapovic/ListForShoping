import { sign } from 'jsonwebtoken';
import config from 'config';
import mongoose, { Document, Schema, Model, model, Error } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

export interface IUser extends Document {
  userId: number;
  username: string;
  password: string;
}

export const userSchema: Schema = new Schema({
  userId: {
    type: Number,
    unique: true
  },
  username: String,
  password: String,
  salt: {
    type: String,
    required: true
  },
});

userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

userSchema.methods.generateAuthToken = function() {
  return sign({_id: this._id, isAdmin: this.isAdmin}, config.get('jwtPrivateKey'));
};
export const User: Model<IUser> = model<IUser>("User", userSchema);
