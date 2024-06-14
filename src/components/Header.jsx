import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import ProjectLogo from "./logo/ProjectLogo";
export default function Header() {
  const navigate = useNavigate();
  const location = useLocation().pathname;
  console.log(location);
  function checkLocation(pageName) {
    if (location === pageName) {
      return true;
    }
  }
  return (
    <div className="sticky top-0 z-50 bg-white py-3">
      <div className="container mx-auto px-3 flex justify-between items-center">
        <div className="logo">
          <ProjectLogo navigate={navigate} />
        </div>
        <div className="links">
          <ul className="flex md:space-x-10 space-x-4 font-semibold text-[18px]">
            <li
              onClick={() => navigate("/")}
              className={`py-2 cursor-pointer  text-gray-400 ${
                checkLocation("/") &&
                " text-black  border-b-[3px] border-b-[#ef5e4e]"
              }`}
            >
              Home
            </li>
            <li
              onClick={() => navigate("/offers")}
              className={`py-2 cursor-pointer  text-gray-400 ${
                checkLocation("/offers") &&
                " text-black  border-b-[3px] border-b-[#ef5e4e]"
              }`}
            >
              Offers
            </li>
            <li
              onClick={() => navigate("/sign-in")}
              className={`  py-2 cursor-pointer   text-gray-400 ${
                checkLocation("/sign-in") &&
                " text-black  border-b-[3px] border-b-[#ef5e4e]"
              }`}
            >
              Sign in
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
