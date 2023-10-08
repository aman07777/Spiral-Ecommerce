import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
// import { ErrorBoundary } from "react-error-boundary";

// import Cart from './components/CartPageMobile'
// import CartPageMobile from "./components/CartPageMobile";
const PaymentOption = lazy(() => import("./pages/Customer/PaymentOption"));
const AddressBook = lazy(() => import("./pages/Customer/AddressBook"));
const MyWhislist = lazy(() => import("./pages/Customer/MyWhislist"));
const MyOrder = lazy(() => import("./pages/Customer/MyOrder"));
const MyReview = lazy(() => import("./pages/Customer/MyReview"));
const CustomerProfile = lazy(() => import("./pages/Customer/CustomerProfile"));
// const Fallback = lazy(() => import("./components/fallback"));
const AffliatorProfile = lazy(() =>
  import("./pages/affiliator/AffliatorProfile")
);
// const CheckAuth = lazy(() => import("./components/check-auth"));
const ResetPassword = lazy(() => import("./pages/ResetPassword"));
const AdminHome = lazy(() => import("./pages/Admin/AdminHome"));
const AdminProduct = lazy(() => import("./pages/Admin/product/AdminProduct"));
const AdminOrder = lazy(() => import("./pages/Admin/order/AdminOrder"));
const AdminCustomer = lazy(() => import("./pages/Admin/users/AdminCustomer"));
const AdminAffiliator = lazy(() =>
  import("./pages/Admin/affiliator/AdminAffliator")
);
const AdminSettings = lazy(() => import("./pages/Admin/AdminSetting"));
const ErrorPage = lazy(() => import("./pages/ErrorPage"));
const AddProduct = lazy(() =>
  import("./pages/Admin/product/add-product/add-product")
);
const AddOrder = lazy(() => import("./pages/Admin/order/add-order/add-order"));
// const AddCustomer = lazy(() =>
//   import("./pages/Admin/users/add-cutomer/add-customer")
// );
const AddAffiliator = lazy(() =>
  import("./pages/Admin/affiliator/add-affiliator/add-affiliator")
);
const Layout = lazy(() => import("./layout/layout"));
const Loader = lazy(() => import("./components/Loader"));
const Signup = lazy(() => import("./pages/Signup"));
const Home = lazy(() => import("./pages/home/Home"));
const Login = lazy(() => import("./pages/Login"));
const ProductPage = lazy(() => import("./pages/products/ProductPage"));
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const CartPage = lazy(() => import("./pages/CartPage"));
const EmailVerification = lazy(() => import("./pages/EmailVerification"));

function App() {
  return (
    <Router>
      {/* <ErrorBoundary FallbackComponent={Fallback}> */}
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="" element={<Home />} />
            <Route path="signup" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="products" exact element={<ProductPage />} />
            <Route path="products/:id" element={<ProductDetails />} />

            {/* <Route path="/protect/" element={<CheckAuth />}> */}
            <Route path="/protect/cart" element={<CartPage />} />
            <Route path="profile/customer" element={<CustomerProfile />} />
            {/* </Route> */}

            <Route path="profile/paymentoption" element={<PaymentOption />} />
            <Route path="profile/addressbook" element={<AddressBook />} />
            <Route path="profile/whishlist" element={<MyWhislist />} />
            <Route path="profile/myorders" element={<MyOrder />} />
            <Route path="profile/myreview" element={<MyReview />} />
            <Route path="profile/addressbook" element={<AddressBook />} />
          </Route>

          <Route path="/emailverification" element={<EmailVerification />} />
          <Route path="/resetpassword" element={<ResetPassword />} />

          <Route path="/adminHome" element={<AdminHome />} />
          <Route path="/adminProduct" element={<AdminProduct />} />
          <Route path="/admin-add-product" element={<AddProduct />} />
          <Route path="/adminOrder" element={<AdminOrder />} />
          <Route path="/admin-add-order" element={<AddOrder />} />
          <Route path="/adminCustomer" element={<AdminCustomer />} />
          {/* <Route path="/admin-add-customer" element={<AddCustomer />} /> */}
          <Route path="/adminAffliator" element={<AdminAffiliator />} />
          <Route path="/admin-add-affliator" element={<AddAffiliator />} />
          <Route path="/adminSetting" element={<AdminSettings />} />
          <Route path="/profile/affiliator" element={<AffliatorProfile />} />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </Suspense>
      {/* </ErrorBoundary> */}
    </Router>
  );
}

export default App;
