import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import EmailVerification from "./pages/EmailVerification";
import ResetPassword from "./pages/ResetPassword";
import AdminHome from "./pages/Admin/AdminHome";
import Home from "./pages/Home";
import AdminProduct from "./pages/Admin/AdminProduct";
import AdminOrder from "./pages/Admin/AdminOrder";
import AdminCustomer from "./pages/Admin/AdminCustomer";
import AdminAffiliator from "./pages/Admin/AdminAffliator";
import AdminSettings from "./pages/Admin/AdminSetting";
import CartPage from "./pages/CartPage";
import ProductPage from "./pages/ProductPage";
import ProductDetails from "./pages/ProductDetails";

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/emailverification" element={<EmailVerification />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminProduct" element={<AdminProduct />} />
          <Route path="/adminOrder" element={<AdminOrder />} />
          <Route path="/adminCustomer" element={<AdminCustomer />} />
          <Route path="/adminAffliator" element={<AdminAffiliator />} />
          <Route path="/adminSetting" element={<AdminSettings />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" element={<ProductPage />} />
          <Route path="/productDetails" element={<ProductDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
