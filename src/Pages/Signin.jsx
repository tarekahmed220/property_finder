import { useRef, useState } from "react";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";
import { signInWithEmailAndPassword, getAuth } from "firebase/auth";
import { toast } from "react-toastify";

function Signin() {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [emailstyle, setEmailStyle] = useState({});
  const [passwordStyle, setPasswordStyle] = useState({});

  const emailRef = useRef();
  const passwordRef = useRef();
  const inputRefs = [emailRef, passwordRef];

  const { email, password } = formData;
  const navigate = useNavigate();
  function onChange(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  }

  async function submitHandler(e) {
    e.preventDefault();
    if (!email || !password) {
      inputRefs.forEach((ref) => {
        if (!ref.current.value) {
          ref.current.style.border = "1px solid red ";
        }
      });
      toast.warning("please fill your email and password");
      return;
    }
    try {
      const auth = getAuth();
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      if (userCredential.user) {
        navigate("/");
      }
    } catch (error) {
      if (error.code === "auth/user-not-found") {
        toast.error("This email is not registered. Please sign up.");
      } else if (error.code === "auth/wrong-password") {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else if (error.code === "auth/invalid-credential") {
        toast.error(
          "Invalid credentials. Please check your email and password."
        );
      } else {
        toast.error("An error occurred. Please try again.");
      }
      console.error("Error signing in:", error);
    }
  }
  function handleBlur(inputRef, setEmailStyle) {
    if (!inputRef.current.value) {
      setEmailStyle({ border: "1px solid red" });
    } else {
      setEmailStyle({ border: "1px solid rgb(209 213 219)" });
    }
  }
  function handleFocus(setEmailStyle) {
    setEmailStyle({ border: "1px solid blue" });
  }

  return (
    <section>
      <h1 className="text-center text-3xl mt-6 font-bold">Sign In</h1>
      <div className="container mx-auto flex my-10 space-x-[5%] flex-wrap justify-between">
        <div className="imgContainer w-[100%] md:w-[40%] mx-5  ">
          <img
            className="max-w-full rounded-[1rem] "
            src="https://images.unsplash.com/flagged/photo-1564767609342-620cb19b2357?q=80&w=1973&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="singin img"
          />
        </div>
        <div className="formcontainer  w-[100%] md:w-[40%] !mx-5">
          <form>
            <input
              style={emailstyle}
              ref={emailRef}
              onBlur={() => handleBlur(emailRef, setEmailStyle)}
              onFocus={() => handleFocus(setEmailStyle)}
              className=" my-6 w-full px-3 py-3 rounded bg-white text-gray-700 lowercase text-md placeholder:uppercase"
              type="text"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
            />
            <div className="relative">
              <input
                onBlur={() => handleBlur(passwordRef, setPasswordStyle)}
                onFocus={() => handleFocus(setPasswordStyle)}
                style={passwordStyle}
                className="my-6 w-full px-3 py-3 rounded bg-white text-gray-700 lowercase text-md placeholder:uppercase"
                ref={passwordRef}
                type={showPassword ? "text" : "password"}
                id="password"
                placeholder="Password"
                value={password}
                onChange={onChange}
              />
              {showPassword ? (
                <IoIosEyeOff
                  className="absolute right-3 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
                  onClick={() => setShowPassword((state) => !state)}
                />
              ) : (
                <IoIosEye
                  className="absolute right-3 top-[50%] translate-y-[-50%] text-2xl cursor-pointer"
                  onClick={() => setShowPassword((state) => !state)}
                />
              )}
            </div>
            <div className="flex justify-between text-[15px] md:text-lg whitespace-nowrap md:flex-col lg:flex-row">
              <p>
                Don't have an account?{" "}
                <Link
                  to={"/sign-up"}
                  className="text-red-600 ml-1 hover:text-red-700  transition duration-100 ease-in-out"
                >
                  Register
                </Link>
              </p>
              <Link
                to={"/forgot-password"}
                className="text-blue-600  hover:text-blue-700 "
              >
                Forgot password
              </Link>
            </div>
            <button
              onClick={submitHandler}
              type="submit"
              className="bg-blue-700 text-white uppercase w-full py-[10px] mt-6 rounded hover:bg-blue-800 transition duration-200 ease-in-out"
            >
              {" "}
              Sign in
            </button>
            <div className="flex before:border-t before:flex-1 before:border-gray-300 justify-center items-center  my-4 after:border-t after:flex-1 after:border-gray-300">
              <p className="text-center mx-4">OR</p>
            </div>
            <OAuth />
          </form>
        </div>
      </div>
    </section>
  );
}

export default Signin;
