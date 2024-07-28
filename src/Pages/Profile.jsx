import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { toast } from "react-toastify";
import { FcHome } from "react-icons/fc";

function Profile() {
  const inputNameRef = useRef();
  const navigate = useNavigate();
  const auth = getAuth();
  const [profileData, setProfileData] = useState({
    name: auth.currentUser ? auth.currentUser.displayName : "",
    email: auth.currentUser ? auth.currentUser.email : "",
  });
  const [changeData, setChangeData] = useState(true);
  const { name, email } = profileData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }

  async function onSubmit() {
    try {
      if (auth.currentUser.displayName !== name) {
        // to update new data in authentication
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        // to update new data in fireStore
        const docRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(docRef, { name });
      }
      toast.success("Your name updated successfully");
    } catch (error) {
      toast.error("sorry, we can't update your name");
    }
  }
  useEffect(() => {
    if (!changeData) {
      inputNameRef.current.focus();
    }
  }, [changeData]);
  return (
    <>
      <section className=" w-[100%] md:w-[50%] px-3 my-6 flex justify-center items-center flex-col mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6"> My Profile</h1>
        <form className="w-full ">
          <input
            ref={inputNameRef}
            disabled={changeData}
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setProfileData({ ...profileData, [e.target.id]: e.target.value });
            }}
            className={`w-full mb-6 ${
              !changeData ? "bg-red-200 focus:border focus:border-gray-200" : ""
            }`}
          />
          <input
            disabled
            type="email"
            id="email"
            value={email}
            className="w-full mb-6 "
          />

          <div className="flex justify-between items-center flex-col md:flex-row">
            <p>
              Do want to change your name?{" "}
              <span
                onClick={() => {
                  !changeData && onSubmit();
                  setChangeData((prevState) => !prevState);
                }}
                className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer"
              >
                {" "}
                {changeData ? "Edit " : "Apply changes"}
              </span>
            </p>
            <p
              onClick={onLogout}
              className="text-blue-600 hover:text-blue-700 transition ease-in-out duration-200 cursor-pointer"
            >
              Sign out
            </p>
          </div>
        </form>
        <button
          type="submit"
          className="mt-4 w-full bg-blue-600 text-white uppercase py-3 px-7 text-sm font-medium rounded shadow-md hover:bg-blue-700 transition duration-150 ease-in-out hover:shadow-lg active:bg-blue-800 "
        >
          <Link
            to="/create-listing"
            className="flex justify-center items-center "
          >
            <FcHome className="mr-2 text-3xl bg-red-200 rounded-full p-1 border-2" />
            Sell or rent your home
          </Link>
        </button>
      </section>
    </>
  );
}

export default Profile;
