import Order from "../models/Order.js";

export default {

    createNewOrderListItem: async function (req, res, next) {
        try {
            const {productId, quantity} = req.body;
            const orderListItem = new OrderList({
                productId,
                quantity
            });
            await orderListItem.save();
            res.json("you get a new orderListItem");
        } catch (error) {
            next(error);
        }
    },

    createNewOrder: async function (req, res, next) {
        try {
            
            const {userID, orderList, totalPrice} = req.body;

            const order = new Order({
                userID,
                orderList,
                totalPrice
                
            });
            await order.save();
            res.status(200).json("you get the order");
        } catch (error) {
            next(error);
        }
    },

    getOrders: async(req, res) => {
        try {
            const orders = await Order.find().populate({
                path: "userID"
            }).populate({
                path: "orderList.productId"
            })
            res.json(orders)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    }

}