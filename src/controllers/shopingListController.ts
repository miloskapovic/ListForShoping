
import { Request, Response } from "express";
import { IShopingList, ShopingList, Product } from "../models/shopingList";

export class ShopingListController {
    public async getShopingListsProductsQuantities(req: Request, res: Response): Promise<void> {
        if (req.body.startDate && req.body.endDate) {
            let shopingLists = await ShopingList.find({"creationDate": {"$gte": req.body.startDate, "$lt": req.body.endDate}})
            let productsList: Array<Product> = [];
            for(var i=0; i<shopingLists.length; i++){
                productsList = productsList.concat(shopingLists[i].products);
             }
            const summedProductsList = Array.from(
                productsList.reduce((m, { name, quantity }) => m.set(name, (m.get(name) || 0) + quantity), new Map),
                ([name, quantity]) => ({ name, quantity })
            );
            res.json({ summedProductsList });
        } else {
            res.sendStatus(422);
        }
    }

    public async getShopingLists(req: Request, res: Response): Promise<void> {
        const shopingLists = await ShopingList.find();
        res.json({ shopingLists });
    }

    public async getShopingList(req: Request, res: Response): Promise<void> {
        const shopingList = await ShopingList.findOne({ shopingListId: req.params.id });
        if (shopingList === null) {
            res.sendStatus(404);
        } else {
            res.json(shopingList);
        }
    }

    public async createShopingList(req: Request, res: Response): Promise<void> {
        const newShopingList: IShopingList = new ShopingList(req.body);
        const shopingList = await ShopingList.findOne({ shopingListId: req.body.shopingListId });
        if (shopingList === null) {
            const result = await newShopingList.save();
            if (result === null) {
                res.sendStatus(500);
            } else {
                res.status(201).json({ status: 201, data: result });
            }

        } else {
            res.sendStatus(422);
        }
    }

    public async updateShopingList(req: Request, res: Response): Promise<void> {
        const shopingList = await ShopingList.findOneAndUpdate({ shopingListId: req.params.id }, req.body);
        if (shopingList === null) {
            res.sendStatus(404);
        } else {
            const updatedShopingList = { shopingListId: req.params.id, ...req.body };
            res.json({ status: res.status, data: updatedShopingList });
        }
    }

    public async deleteShopingList(req: Request, res: Response): Promise<void> {
        const shopingList = await ShopingList.findOneAndDelete({ shopingListId: req.params.id });
        if (shopingList === null) {
            res.sendStatus(404);
        } else {
            res.json({ response: "ShopingList deleted Successfully" });
        }
    }
}