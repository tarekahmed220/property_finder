import React from "react";
import { BeatLoader } from "react-spinners";

export default function Spinner() {
  return (
    <BeatLoader
      size={"30px"}
      color="#ef5e4e"
      cssOverride={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%,-50%)",
      }}
    />
  );
}
