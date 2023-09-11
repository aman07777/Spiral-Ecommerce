import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

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
// import CustomerProfile from "./pages/CustomerProfile";
// import AffliatorProfile from "./pages/AffliatorProfile";
// import Cart from './components/CartPageMobile'
import CartPageMobile from "./components/CartPageMobile";
import ErrorPage from './pages/ErrorPage';


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
          <Route path='/admin' >
            <Route index element={<Navigate replace to="home" />} />
            <Route path="home" element={<AdminHome />} />
            <Route path="product" element={<AdminProduct />} />
            <Route path="order" element={<AdminOrder />} />
            <Route path="customer" element={<AdminCustomer />} />
            <Route path="affilator" element={<AdminAffiliator />} />
            <Route path="setting" element={<AdminSettings />} />
          </Route>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/products" exact element={<ProductPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/error" element={<ErrorPage />} />

          <Route path='*' element={<p>404 Not Found</p>} />
        </Routes>
      </Router>
    </div >
  );
}

export default App;
