import React from "react";
import { FcGoogle } from "react-icons/fc";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { toast } from "react-toastify";
import { doc, getDoc, serverTimestamp, setDoc } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

export default function OAuth() {
  const navigate = useNavigate();
  async function onGoogleRegister(e) {
    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);
      if (!docSnap.exists()) {
        await setDoc(docRef, {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        });
        navigate("/");
        toast.success("success authorize with google");
      } else {
        await setDoc(
          docRef,
          {
            name: user.displayName,
            email: user.email,
            timestamp: serverTimestamp(),
          },
          { merge: true }
        );
        navigate("/");
      }
    } catch (error) {
      toast.error("could not authorize with google");
    }
  }
  return (
    <button
      type="button"
      onClick={onGoogleRegister}
      className="uppercase w-full bg-red-500 text-white py-[10px] rounded text-md flex justify-center items-center mt-6"
    >
      <FcGoogle className="mr-2 bg-white rounded-full text-2xl" />
      continue with google
    </button>
  );
}
