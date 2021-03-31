import { Document, Schema, Model, model, Error } from "mongoose";
import { IShopingList } from "./list";

export interface IProduct extends Document {
  productId: String;
  name: String;
  quantity: Number;
  shopingList: IShopingList;
  creationDate: Date;
}

export const productSchema = new Schema({
  productId: {
    type: String, required: true,
    unique: true
  },
  name: String,
  quantity: Number,
  shopingList: {
    type: Schema.Types.ObjectId,
    ref: "ShopingList",
    required: true
  },
  creationDate: { type: Date, default: Date.now }
});



export const Product: Model<IProduct> = model<IProduct>("Product", productSchema);