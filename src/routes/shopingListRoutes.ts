import { Router } from "express";
import { ShopingListController } from "../controllers/shopingListController";
import { AuthController } from "../controllers/authController";


export class ProductRoutes {

    public router: Router;
    public shopingListController: ShopingListController = new ShopingListController();
    public authController: AuthController = new AuthController();

    constructor() {
        this.router = Router();
        this.routes();
    }

    routes() {
        this.router.get("/", this.shopingListController.getShopingLists);
        this.router.get("/:id", this.shopingListController.getShopingList);
        this.router.post("/", this.authController.authenticateJWT, this.shopingListController.createShopingList);
        this.router.put("/:id", this.authController.authenticateJWT, this.shopingListController.updateShopingList);
        this.router.delete("/:id", this.authController.authenticateJWT, this.shopingListController.deleteShopingList);
    }
}