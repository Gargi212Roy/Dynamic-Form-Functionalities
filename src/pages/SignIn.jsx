import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import visibilityIcon from "../assets/visibilityIcon.svg";
import OAuth from "../component/OAuth";

function SignIn() {
  const [showPassword, setShowPassword] = useState(false);
  const [signInData, setSignInData] = useState({
    email: "",
    password: "",
  });

  const { email, password } = signInData;

  const navigate = useNavigate();

  const onChange = (e) => {
    setSignInData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();

    try {
      const auth = getAuth();

      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      if (userCredentials.user) {
        navigate("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container">
        <div className="homePage"></div>
        <div>
          <header>
            <p>Welcome back!</p>
          </header>
          <main>
            <form onSubmit={onSubmit}>
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
                  className="formPassword"
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  id="password"
                  value={password}
                  onChange={onChange}
                />
                <img
                  className="showPassword"
                  src={visibilityIcon}
                  alt="show password"
                  onClick={() => setShowPassword((prevState) => !prevState)}
                />
              </div>
              <Link to="/forgot-password" className="forgotPasswordLink">
                Forgot Password?
              </Link>
              <div>
                <button type="submit" className="signInbtn">
                  sign in
                </button>
              </div>
            </form>
            <OAuth />

            <Link to="/sign-up">Don't have an account? Sign Up Instead</Link>
          </main>
        </div>
      </div>
    </>
  );
}

export default SignIn;
