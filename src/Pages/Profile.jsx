import { getAuth, updateProfile } from "firebase/auth";
import { doc, updateDoc } from "firebase/firestore";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { db } from "../firebase";
import { toast } from "react-toastify";

function Profile() {
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
  return (
    <>
      <section className=" w-[100%] md:w-[50%] px-3 my-6 flex justify-center items-center flex-col mx-auto">
        <h1 className="text-2xl md:text-3xl font-bold mb-6"> My Profile</h1>
        <form className="w-full ">
          <input
            disabled={changeData}
            type="text"
            id="name"
            value={name}
            onChange={(e) => {
              setProfileData({ ...profileData, [e.target.id]: e.target.value });
            }}
            className="w-full mb-6 "
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
      </section>
    </>
  );
}

export default Profile;
