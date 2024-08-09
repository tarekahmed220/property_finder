import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Offers from "./Pages/Offers";
import ForgotPassword from "./Pages/ForgotPassword";
import PageNotFound from "./Pages/PageNotFound";
import Header from "./components/Header";
import { Bounce, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PrivateRoute from "./components/privateRoute";
import { useState } from "react";
import CreateListing from "./Pages/createListing";
import EditListing from "./Pages/EditListing";
import Listing from "./Pages/Listing";
import Category from "./Pages/Category";

function App() {
  const [showLinks, setShowLinks] = useState(false);
  return (
    <>
      <Router>
        <Header setShowLinks={setShowLinks} showLinks={showLinks} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<PrivateRoute />}>
            <Route path="" element={<Profile />} />
          </Route>
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="offers" element={<Offers />} />
          <Route path="/category/:categoryName" element={<Category />} />
          <Route
            path="category/:categoryName/:listingId"
            element={<Listing />}
          />
          <Route path="create-listing" element={<PrivateRoute />}>
            <Route path="" element={<CreateListing />} />
          </Route>
          <Route path="edit-listing" element={<PrivateRoute />}>
            <Route path="/edit-listing/:listingId" element={<EditListing />} />
          </Route>
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        transition={Bounce}
      />
    </>
  );
}

export default App;
// excalidraw.com
