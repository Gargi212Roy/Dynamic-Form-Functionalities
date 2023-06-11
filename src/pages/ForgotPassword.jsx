import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const onChange = (e) => {
    setEmail(e.target.value);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const auth = getAuth();
      await sendPasswordResetEmail(auth, email);
      console.log("Email is sent for password reset");
    } catch (error) {
      console.log("could not sent for password reset");
    }
  };

  return (
    <div>
      <header>
        <p>Forgot password</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={onChange}
          />
          <Link to="/">Sign In</Link>
          <div>
            <button>
              <div>Send Reset Link</div>
            </button>
          </div>
        </form>
      </main>
    </div>
  );
}

export default ForgotPassword;
