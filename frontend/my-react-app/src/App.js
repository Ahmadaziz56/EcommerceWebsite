import './App.css';
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import WebFont from "webfontloader";
import { useSelector } from 'react-redux';
import store from "./store";
import { loadUser } from './actions/userAction';
import Header from "./component/layout/header/header.js";
import Footer from "./component/layout/footer/Footer.js";
import Home from "./component/Home/Home.js";
import ProductDetails from "./component/product/ProductDetails.js";
import Products from "./component/product/Products.js";
import Search from "./component/product/Search.js";
import LoginSignUp from './component/User/loginSignUp';
import UserOption from "./component/layout/header/UserOption.js";
import Profile from "./component/User/Profile.js";
import ProtectedRoute from "./component/route/protectedRoute";
import UpdateProfile from "./component/User/UpdateProfile.js"
import UpdatePassword from "./component/User/UpdatePassword.js"
import ForgotPassword from "./component/User/ForgotPassword.js"
import ResetPassword from "./component/User/ResetPassword.js"
import Cart from "./component/Cart/Cart/Cart"
import Shipping from "./component/Cart/Shipping.js"
import ConfirmOrder from "./component/Cart/ConfirmOrder.js"
import OrderSuccess from "./component/Cart/OrderSuccess.js"
import MyOrders from "./component/Orders/MyOrders.js"
import Payment from "./component/Cart/Payment.js"
import axios from 'axios';
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from '@stripe/stripe-js';
import DashBoard from "./component/admin/dashboard.js"
import ProductList from "./component/admin/ProductList.js"
import NewProduct from "./component/admin/NewProduct.js"
import UpdateProduct from "./component/admin/UpdateProduct.js"
import OrderList from "./component/admin/OrderList.js"
import ProcessOrder from "./component/admin/ProcessOrder"
import UserList from "./component/admin/UserList.js"
import UpdateUser from "./component/admin/UpdateUser.js"
import ProductReviews from "./component/admin/ProductReviews.js"
import OrderDetails from "./component/Orders/OrderDetails.js"
import PageNotFound from "./component/layout/pageNotFound/PageNotFound"
import About from './component/layout/About/About';
import Contact from "./component/layout/Contact/Contact"
function App() {
  const { isAuthenticated, user } = useSelector(state => state.user);
  const [stripeApiKey, setStripeApiKey] = useState(""); // Define stripeApiKey state

  async function getStripeApiKey() {
    try {
      const { data } = await axios.get("/api/v1/stripeapikey");
      setStripeApiKey(data.stripeApiKey); // Set the Stripe API key
    } catch (error) {
      console.error("Error fetching Stripe API key:", error);
    }
  }

  useEffect(() => {
    WebFont.load({
      google: {
        families: ["Roboto", "Poppins", "Pacifico", "Oswald", "Exo"]
      }
    });
    store.dispatch(loadUser());
    getStripeApiKey(); // Fetch the Stripe API key when the component mounts
  }, []);
  window.addEventListener("contextmenu",(e)=>e.preventDefault())
  return (
    <Router>
      <Header />
      {isAuthenticated && <UserOption user={user} />}
      {stripeApiKey && (
            <Elements stripe={loadStripe(stripeApiKey)}>
              {isAuthenticated && <ProtectedRoute path="/process/payment" element={<Payment />} />}
            </Elements>
          )}
      {isAuthenticated && (
        <>
          <ProtectedRoute path="/account" element={<Profile />} />
          <ProtectedRoute path="/me/update" element={<UpdateProfile />} />
          <ProtectedRoute path="/account/password/update" element={<UpdatePassword />} />
          <ProtectedRoute path="/shipping" element={<Shipping />} />
          <ProtectedRoute path="/orders/confirm" element={<ConfirmOrder />} />
          <ProtectedRoute path="/success" element={<OrderSuccess />} />
          <ProtectedRoute isAdmin={true} path="/admin/dashboard" element={<DashBoard />} />
          <ProtectedRoute isAdmin={true} path="/admin/products" element={<ProductList />} />
          <ProtectedRoute isAdmin={true} path="/admin/product" element={<NewProduct />} />
          <ProtectedRoute isAdmin={true} path="/admin/product/:productId" element={<UpdateProduct />} />
          <ProtectedRoute isAdmin={true} path="/admin/orders" element={<OrderList />} />
          <ProtectedRoute isAdmin={true} path="/admin/order/:id" element={<ProcessOrder />} />
          <ProtectedRoute isAdmin={true} path="/admin/users" element={<UserList />} />
          <ProtectedRoute isAdmin={true} path="/admin/user/:id" element={<UpdateUser />} />
          <ProtectedRoute isAdmin={true} path="/admin/reviews" element={<ProductReviews />} />
          <ProtectedRoute path="/order/:id" element={<OrderDetails />} />
          <ProtectedRoute path="/orders" element={<MyOrders />} />
        </>
      )}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/products/product/:id" element={<ProductDetails />} />
        <Route path="/search" element={<Search />} />
        <Route path="/products" element={<Products />} />
        <Route path="/login" element={<LoginSignUp />} />
        <Route path="/products/:keyword" element={<Products />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <Footer />
    </Router >
  );
}

export default App;

