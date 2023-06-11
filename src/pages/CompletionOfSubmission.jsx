import React from "react";
import { Link } from "react-router-dom";
function CompletionOfSubmission() {
  return (
    <div className="containerSubmit">
      <div></div>
      <div>
        <h1>Hooray! Form submitted Successfully!</h1>
        <h1>We'll get back to you soon!!!</h1>
        <button type="button" className="submitBackBtn">
          <Link to="/">Back</Link>
        </button>
      </div>
    </div>
  );
}

export default CompletionOfSubmission;
