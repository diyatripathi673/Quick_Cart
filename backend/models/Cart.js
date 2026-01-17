import mongoose from "mongoose";
const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },

  items: [
    {
      productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
      },
      name: String,
      price: Number,
      quantity: {
        type: Number,
        default: 1,
      },
    },
  ],

  totalPrice: {
    type: Number,
    default: 0,
  },
});

const Cart = mongoose.model("Cart", cartSchema);
export default Cart;
