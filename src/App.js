import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Profile from "./Pages/Profile";
import Signin from "./Pages/Signin";
import SignUp from "./Pages/SignUp";
import Offers from "./Pages/Offers";
import ForgotPassword from "./Pages/ForgotPassword";
import PageNotFound from "./Pages/PageNotFound";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="profile" element={<Profile />} />
          <Route path="sign-in" element={<Signin />} />
          <Route path="sign-up" element={<SignUp />} />
          <Route path="offers" element={<Offers />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
