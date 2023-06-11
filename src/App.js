import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import ForgotPassword from "./pages/ForgotPassword";
import Profile from "./pages/Profile";

import FormFillup from "./pages/FormFillup";
import CompletionOfSubmission from "./pages/CompletionOfSubmission";
import "./styling/index.scss";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/form-fillup" element={<FormFillup />} />
          <Route
            path="/success-submission"
            element={<CompletionOfSubmission />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
