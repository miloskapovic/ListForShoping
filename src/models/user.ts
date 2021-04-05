import { Document, Schema, Model, model, Error } from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends Document {
  username: string;
  password: string;
};

export const userSchema: Schema = new Schema({
  username: String,
  password: {
    type: String,
    maxlength: 1000
  },
});


userSchema.pre<IUser>("save", function save(next) {
  const user = this;

  bcrypt.hash(this.password, 10, function(err: Error, hash) {
    if (err) { return next(err); }
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (candidatePassword: string, callback: any) {
  bcrypt.compare(candidatePassword, this.password, function(err: Error, isMatch: boolean) {
    callback(err, isMatch);
  });
};

export const User: Model<IUser> = model<IUser>("User", userSchema);
