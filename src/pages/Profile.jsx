import React from "react";
import { useState } from "react";
import { getAuth, updateProfile } from "firebase/auth";
import { useNavigate, Link } from "react-router-dom";
import { updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase.config";

function Profile() {
  const auth = getAuth();
  const [changeDetails, setChangeDetails] = useState(false);
  const [userData, setUserData] = useState({
    name: auth?.currentUser?.displayName,
    email: auth?.currentUser?.email,
  });

  const { name, email } = userData;

  const navigate = useNavigate();
  const onLogout = () => {
    auth.signOut();
    navigate("/");
  };

  const onSubmit = async () => {
    try {
      if (auth?.currentUser?.displayName !== name) {
        await updateProfile(auth.currentUser, {
          displayName: name,
        });
        const userRef = doc(db, "users", auth.currentUser.uid);
        await updateDoc(userRef, { name });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onChange = (e) => {
    setUserData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  return (
    <>
      <div className="container">
        <div className="homePage"></div>
        <div>
          <header>
            <p>MY PROFILE</p>
          </header>
          <main>
            <p className="personal">
              <p>Personal details</p>
              <p
                onClick={() => {
                  changeDetails && onSubmit();
                  setChangeDetails((prevState) => !prevState);
                }}
              >
                {changeDetails ? "done" : "change"}
              </p>
            </p>
            <div>
              <form className="profileForm">
                <div>
                  Name:
                  <input
                    value={name}
                    type="text"
                    id="name"
                    disabled={!changeDetails}
                    onChange={onChange}
                  />
                </div>
                <div>
                  Email:{" "}
                  <input
                    value={email}
                    type="text"
                    id="email"
                    disabled={!changeDetails}
                    onChange={onChange}
                  />
                </div>
              </form>
              <div>
                <Link to="/form-fillup">Go to Form Filling</Link>
              </div>
              <button className="signInbtn" type="button" onClick={onLogout}>
                log out
              </button>
            </div>
          </main>
        </div>
      </div>
    </>
  );
}

export default Profile;
