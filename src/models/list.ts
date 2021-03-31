import { Document, Schema, Model, model, Error } from "mongoose";
import { IProduct } from "./product";

export interface IShopingList extends Document {
  productId: String;
  userId: String;
  name: String;
  products: Array<IProduct>;
  creationDate: Date;
}

export const shopingListSchema = new Schema({
  shopingListId: {
    type: String, required: true,
    unique: true
  },
  name: {
    type: String, required: true,
    unique: true
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true
  },
  products: [{
      type: Schema.Types.ObjectId,
      ref: "Product"
  }],
  creationDate: { type: Date, default: Date.now }
});



export const ShopingList: Model<IShopingList> = model<IShopingList>("ShopingList", shopingListSchema);