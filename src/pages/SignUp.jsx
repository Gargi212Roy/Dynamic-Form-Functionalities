import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { setDoc, doc, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase.config";
import visibilityIcon from "../assets/visibilityIcon.svg";
import OAuth from "../component/OAuth";

function SignUp() {
  const [showPassword, setShowPassword] = useState(false);
  const [signUpData, setSignUpData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = signUpData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setSignUpData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();

      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredentials.user;

      updateProfile(auth.currentUser, {
        displayName: name,
      });

      const signUpDataCopy = { ...signUpData };

      delete signUpDataCopy.password;
      signUpDataCopy.timestamp = serverTimestamp();
      await setDoc(doc(db, "users", user.uid), signUpDataCopy);

      navigate("/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div></div>
        <div>
          <header>
            <p>Welcome</p>
          </header>

          <main>
            <form onSubmit={onSubmit}>
              <input
                className="formEmail"
                type="text"
                placeholder="Name"
                id="name"
                value={name}
                onChange={onChange}
              />
              <input
                className="formEmail"
                type="email"
                placeholder="Email"
                id="email"
                value={email}
                onChange={onChange}
              />
              <div className="passwordDiv">
                <input
                  className="formPasswordSignUp"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <img
                  className="showPasswordSignUp"
                  src={visibilityIcon}
                  alt="show password"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>
              <div>
                <button type="submit" className="signInbtn">
                  sign up
                </button>
              </div>
            </form>
            <OAuth />
            <Link to="/">Sign In Instead</Link>
          </main>
        </div>
      </div>
    </>
  );
}

export default SignUp;
