const Order = require("../models/ordermodels");
const product = require("../models/productmodels");
const Errorhander = require("../utils/errorhander");
const catchasyncerror = require("../middleware/catchasyncerror");
exports.newOrder = catchasyncerror(async (req, res, next) => {
    const {
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body
    const order = await Order.create({
        shippingInfo,
        orderItems,
        paymentInfo,
        itemPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paidAt: Date.now(),
        user: req.user._id,
    })
    res.status(201).json({
        success: true,
        order
    })
})
exports.getSingleOrder = catchasyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id).populate("user", "name email")
    if (!order) {
        return next(new Errorhander("order not found", 404))
    }
    res.status(200).json({
        success: true,
        order,
    })
})
exports.myOrders = catchasyncerror(async (req, res, next) => {
    const orders = await Order.find({ user: req.user._id })
    res.status(200).json({
        success: true,
        orders,
    })
})
exports.updateOrder = catchasyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new Errorhander("Order not found with this Id", 404));
    }
  
    if (order.orderStatus === "Delivered") {
      return next(new Errorhander("You have already delivered this order", 400));
    }
  
    if (req.body.status === "Shipped") {
      order.orderItems.forEach(async (o) => {
        await updateStock(o.product, o.quantity);
      });
    }
    order.orderStatus = req.body.status;
  
    if (req.body.status === "Delivered") {
      order.deliveredAt = Date.now();
    }
  
    await order.save({ validateBeforeSave: false });
    res.status(200).json({
      success: true,
    });
  });
async function updateStock(id,quantity){
    const products= await product.findById(id)
    products.Stock-=quantity
    await products.save({validateBeforeSave:false})
}
exports.getAllOrders=catchasyncerror(async(req,res,next)=>{
    const orders=await Order.find()
    let totalAmount=0;
    orders.forEach(order=>{
        totalAmount+=order.totalPrice
    })
    res.status(200).json({
        success:true,
        orders,
        totalAmount,
    })
})
exports.deleteOrder = catchasyncerror(async (req, res, next) => {
    const order = await Order.findById(req.params.id);
  
    if (!order) {
      return next(new Errorhander("Order not found with this Id", 404));
    }
  
    await order.deleteOne();
  
    res.status(200).json({
      success: true,
    });
  });