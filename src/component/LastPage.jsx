import React, { useState, useEffect, useRef } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebase.config";
import { useNavigate } from "react-router-dom";
function LastPage() {
  const [finalDetails, setFinalDetails] = useState(() => {
    const storedDetails = localStorage.getItem("finalDetails");

    return storedDetails
      ? JSON.parse(storedDetails)
      : {
          needMoney: "",
          futurePlanning: "",
          whyShark: "",
          amtNeeded: "",
          evaluation: "",
          noOfSharks: "",
          sharkPreference: "",
          userRef: "",
        };
  });

  const {
    needMoney,
    futurePlanning,
    whyShark,
    amtNeeded,
    evaluation,
    noOfSharks,
    sharkPreference,
  } = finalDetails;

  useEffect(() => {
    localStorage.setItem("finalDetails", JSON.stringify(finalDetails));
  }, [finalDetails]);

  const onChange = (e) => {
    setFinalDetails((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const auth = getAuth();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted.current) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFinalDetails((prevState) => ({
            ...prevState,
            userRef: user.uid,
          }));
        } else {
          console.log("Not a user. Log in.");
        }
      });
    }
    return () => {
      isMounted.current = false;
    };
  }, []);
  const companyDetails = JSON.parse(localStorage.getItem("companyDetails"));
  const founderDetails = JSON.parse(localStorage.getItem("founderDetails"));
  const salesStartYear = JSON.parse(localStorage.getItem("data"));
  const salesDetails = JSON.parse(localStorage.getItem("salesDetails"));
  const investment = JSON.parse(localStorage.getItem("investor"));
  const investmentDetails = JSON.parse(
    localStorage.getItem("investmentDetails")
  );

  const navigate = useNavigate();

  const onSubmit = async (e) => {
    e.preventDefault();
    const userDetails = {
      companyDetails,
      founderDetails,
      salesStartYear,
      salesDetails,
      investment,
      investmentDetails,
      finalDetails,
    };
    try {
      await addDoc(collection(db, "userDetails"), {
        userDetails,
      });
    } catch (error) {
      console.error("Error adding document: ", error);
    }

    localStorage.removeItem("activePage");
    localStorage.removeItem("companyDetails");
    localStorage.removeItem("founderDetails");
    localStorage.removeItem("data");
    localStorage.removeItem("salesDetails");
    localStorage.removeItem("investor");
    localStorage.removeItem("investmentDetails");
    navigate("/success-submission");
  };

  return (
    <>
      <div>Last page</div>

      <form onSubmit={onSubmit}>
        <div>
          <div>
            <label> Why need Money?</label>
            <br />
            <textarea
              name="needMoney"
              id="needMoney"
              placeholder="Why need money?"
              value={needMoney}
              onChange={onChange}
            ></textarea>
          </div>
          <div>
            <label> Future Planning?</label>
            <br />
            <textarea
              name="futurePlanning"
              id="futurePlanning"
              placeholder="Future Planning?"
              value={futurePlanning}
              onChange={onChange}
            ></textarea>
          </div>
          <div>
            <label> Why from shark?</label>
            <br />
            <textarea
              name="whyShark"
              id="whyShark"
              placeholder="Why from shark?"
              value={whyShark}
              onChange={onChange}
            ></textarea>
          </div>
          <div>
            <label> Ask of money?</label>
            <br />
            <input
              name="amtNeeded"
              id="amtNeeded"
              placeholder="Ask of money?"
              value={amtNeeded}
              onChange={onChange}
            />
          </div>
          <div>
            <label> Evaluation?</label>
            <br />
            <input
              name="evaluation"
              id="evaluation"
              placeholder="Evaluation?"
              value={evaluation}
              onChange={onChange}
            />
          </div>
          <div>
            <label> Number of Sharks </label>
            <br />
            <input
              name="noOfSharks"
              id="noOfSharks"
              placeholder="No. of Sharks?"
              value={noOfSharks}
              onChange={onChange}
            />
          </div>
          <div>
            <label> Shark Preference</label>
            <br />
            <input
              name="sharkPreference"
              id="sharkPreference"
              placeholder="Shark Preference?"
              value={sharkPreference}
              onChange={onChange}
            />
          </div>
        </div>
        <button type="submit">submit</button>
      </form>
    </>
  );
}

export default LastPage;
