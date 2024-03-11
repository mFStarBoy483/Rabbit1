import express from "express";
const router = express. Router();
import { isAuthenticatedUser, 
    authorizeRoles } from '../middlewares/auth.js'
import { 
    getOrderDetails, 
    newOrder, 
    myOrders, 
    allorders, 
    updateOrder,
    deleteOrder } from "../controllers/orderControllers.js";

router.route('/orders/new').post(isAuthenticatedUser, newOrder);
router.route('/orders/:id').get(isAuthenticatedUser, getOrderDetails);
router.route("/me/orders").get(isAuthenticatedUser, myOrders);

router
.route("/admin/orders")
.get(isAuthenticatedUser, authorizeRoles ("admin"), allorders);

router
.route("/admin/orders/:id")
.put(isAuthenticatedUser, authorizeRoles ("admin"), updateOrder)
.delete(isAuthenticatedUser, authorizeRoles ("admin"), deleteOrder);


export default router