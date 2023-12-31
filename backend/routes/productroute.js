const express=require("express");
const { getallproducts, createProduct, updateProduct, deleteproduct, getProductDetails, createProductReview, getProductReviews, deleteReview, getAdminproducts} = require("../controllers/productcontrollers");
const { isAuthenticatedUser,authorizeRoles } = require("../middleware/auth");
const router=express.Router();
router.route("/products").get(getallproducts)
router.route("/admin/products/new").post(isAuthenticatedUser,authorizeRoles("admin"),createProduct)
router.route("/admin/products").get(isAuthenticatedUser,authorizeRoles("admin"),getAdminproducts)
router.route("/admin/products/:id").put(isAuthenticatedUser,authorizeRoles("admin"),updateProduct).delete(isAuthenticatedUser,authorizeRoles("admin"),deleteproduct)
router.route("/product/:id").get(getProductDetails)
router.route("/review").put(isAuthenticatedUser,createProductReview)
router.route("/reviews").get(getProductReviews).delete(isAuthenticatedUser,deleteReview)
module.exports=router 