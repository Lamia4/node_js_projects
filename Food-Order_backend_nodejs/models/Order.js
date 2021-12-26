import mongoose from "mongoose";

const orderListItemSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "Product"
    },  
    quantity: {
        type: Number,
        default: 0,
    }
});

const orderSchema = new mongoose.Schema({

    userID: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    },
    orderList: {
        type: [orderListItemSchema],
        required: true
    },

    totalPrice: {
        type: Number,
        required: true
    }
},
{
    timestamps: true
});

const Order = mongoose.model("Order", orderSchema);

export default Order;