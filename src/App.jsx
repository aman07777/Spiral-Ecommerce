import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import AdminHome from "./pages/Admin/AdminHome";
import Home from "./pages/Home";
import AdminProduct from "./pages/Admin/product/AdminProduct";
import AdminOrder from "./pages/Admin/order/AdminOrder";
import AdminCustomer from "./pages/Admin/AdminCustomer";
import AdminAffiliator from "./pages/Admin/AdminAffliator";
import AdminSettings from "./pages/Admin/AdminSetting";
import CartPage from "./pages/CartPage";
import ProductDetails from "./pages/ProductDetails";
// import CustomerProfile from "./pages/CustomerProfile";
// import AffliatorProfile from "./pages/AffliatorProfile";
// import Cart from './components/CartPageMobile'
import ErrorPage from "./pages/ErrorPage";
import Layout from "./layout/layout";
import CheckAuth from "./components/check-auth";
import ProductPage from "./pages/products/ProductPage";
import AddProduct from "./pages/Admin/product/add-product/add-product";
import AddOrder from "./pages/Admin/order/add-order/add-order";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="" element={<Home />} />
          <Route path="signup" element={<Signup />} />
          <Route path="login" element={<Login />} />
          <Route path="products" exact element={<ProductPage />} />
          <Route path="products/:id" element={<ProductDetails />} />

          {/* <Route path="/protect/" element={<CheckAuth />}> */}
          <Route path="/protect/cart" element={<CartPage />} />
          {/* </Route> */}
        </Route>
        <Route path="/emailverification" element={<EmailVerification />} />

        <Route path="/resetpassword" element={<ResetPassword />} />
        <Route path="/adminHome" element={<AdminHome />} />
        <Route path="/adminProduct" element={<AdminProduct />} />
        <Route path="/admin-add-product" element={<AddProduct />} />
        <Route path="/adminOrder" element={<AdminOrder />} />
        <Route path="/admin-add-order" element={<AddOrder />} />
        <Route path="/adminCustomer" element={<AdminCustomer />} />
        <Route path="/adminAffliator" element={<AdminAffiliator />} />
        <Route path="/adminSetting" element={<AdminSettings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </Router>
  );
}

export default App;
