import { getAuth } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();
  const auth = getAuth();
  const [profileData, setProfileData] = useState({
    name: auth.currentUser ? auth.currentUser.displayName : "",
    email: auth.currentUser ? auth.currentUser.email : "",
  });
  const { name, email } = profileData;
  function onLogout() {
    auth.signOut();
    navigate("/");
  }
  return (
    <>
      <section className=" w-[100%] md:w-[60%] px-3 my-6 flex justify-center items-center flex-col mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6"> My Profile</h1>
        <form className="w-full ">
          <input
            disabled
            type="text"
            id="name"
            value={name}
            className="w-full mb-6 "
          />
          <input
            disabled
            type="email"
            id="email"
            value={email}
            className="w-full mb-6 "
          />

          <div className="flex justify-between items-center">
            <p>
              Do want to change your name?{" "}
              <span className="text-red-600 hover:text-red-700 transition ease-in-out duration-200 cursor-pointer">
                {" "}
                Edit
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
      </section>
    </>
  );
}

export default Profile;
