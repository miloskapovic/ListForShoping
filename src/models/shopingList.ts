import mongoose, { Document, Schema, Model, model, Error } from "mongoose";
const AutoIncrement = require('mongoose-sequence')(mongoose);

interface Product {
  name: String;
  quantity: Number;
}

export interface IShopingList extends Document {
  productId: Number;
  name: String;
  price: Number;
  quantity: Number;
  products: Array<Product>
}

export const shopingListSchema = new Schema({
  shopingListId: {
    type: Number
  },
  name: {
    type: String, required: true,
    unique: true
  },
  products: [{
    name: String,
    quantity: Number
  }],
  creationDate: { type: Date, default: Date.now }
});


shopingListSchema.plugin(AutoIncrement, {inc_field: 'shopingListId'});
export const ShopingList: Model<IShopingList> = model<IShopingList>("ShopingList", shopingListSchema);