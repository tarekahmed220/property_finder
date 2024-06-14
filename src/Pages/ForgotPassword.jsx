import { useState } from "react";
import { IoIosEyeOff, IoIosEye } from "react-icons/io";
import { Link } from "react-router-dom";
import OAuth from "../components/OAuth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  function onChange(e) {
    setEmail(e.target.value);
  }
  return (
    <section>
      <h1 className="text-center text-3xl mt-6 font-bold">Forgot Password</h1>
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
              className="my-6 w-full px-3 py-3 rounded bg-white text-gray-700 lowercase text-md placeholder:uppercase"
              type="text"
              id="email"
              placeholder="Email Address"
              value={email}
              onChange={onChange}
            />
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
                to={"/sign-in"}
                className="text-blue-600  hover:text-blue-700 "
              >
                Sign in instead
              </Link>
            </div>
            <button
              onClick={(e) => e.preventDefault()}
              type="submit"
              className="bg-blue-700 text-white uppercase w-full py-[10px] mt-6 rounded hover:bg-blue-800 transition duration-200 ease-in-out"
            >
              {" "}
              send reset email
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

export default ForgotPassword;
