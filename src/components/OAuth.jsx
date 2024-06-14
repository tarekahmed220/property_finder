import React from "react";
import { FcGoogle } from "react-icons/fc";
export default function OAuth() {
  return (
    <button
      onClick={(e) => e.preventDefault()}
      className="uppercase w-full bg-red-500 text-white py-[10px] rounded text-md flex justify-center items-center mt-6"
    >
      <FcGoogle className="mr-2 bg-white rounded-full text-2xl" />
      continue with google
    </button>
  );
}
