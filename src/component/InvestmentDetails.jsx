import React, { useState, useEffect } from "react";

function InvestmentDetails() {
  const [investor, setInvestor] = useState(() => {
    const storedInvestor = localStorage.getItem("investor");
    return storedInvestor ? JSON.parse(storedInvestor) : false;
  });

  const [investmentDetails, setInvestmentDetails] = useState(() => {
    const storeInvestmentDetails = localStorage.getItem("investmentDetails");
    return storeInvestmentDetails
      ? JSON.parse(storeInvestmentDetails)
      : [
          {
            name: "",
            year: "",
            moneyRaised: "",
            valuation: "",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("investor", JSON.stringify(investor));
  }, [investor]);

  useEffect(() => {
    localStorage.setItem(
      "investmentDetails",
      JSON.stringify(investmentDetails)
    );
  }, [investmentDetails]);

  const enterInvestors = (e) => {
    let boolean = null;
    if (e.target.value === "true") {
      boolean = true;
    }
    if (e.target.value === "false") {
      boolean = false;
    }
    setInvestor((prevState) => ({
      ...prevState,
      [e.target.id]: boolean ?? e.target.value,
    }));
  };

  const onChange = (index, e) => {
    setInvestmentDetails((prevState) => {
      const updatedInvestment = [...prevState];
      updatedInvestment[index] = {
        ...updatedInvestment[index],
        [e.target.name]: e.target.value,
      };
      return updatedInvestment;
    });
  };

  const addMore = () => {
    let newField = {
      name: "",
      year: "",
      moneyRaised: "",
      evaluation: "",
    };
    setInvestmentDetails([...investmentDetails, newField]);
  };

  const removeInvestment = (index) => {
    setInvestmentDetails((prevState) => {
      const updatedInvestment = [...prevState];
      updatedInvestment.splice(index, 1);
      return updatedInvestment;
    });
  };

  return (
    <>
      <div>Investment Details</div>

      <label>Existing Investors</label>
      <div>
        <button
          type="button"
          id="investor"
          value={true}
          onClick={enterInvestors}
          style={{ color: "green" }}
        >
          Yes
        </button>
        <br />
        <button
          type="button"
          id="investor"
          value={false}
          style={{ color: "red" }}
        >
          No
        </button>
      </div>
      {investor && (
        <div>
          {investmentDetails.map((investor, index) => (
            <div key={index}>
              <input
                type="text"
                name="name"
                value={investor.name}
                onChange={(e) => onChange(index, e)}
                placeholder="Name"
                required={investor}
              />
              <input
                type="text"
                name="year"
                value={investor.year}
                onChange={(e) => onChange(index, e)}
                placeholder="Year and Month"
                required={investor}
              />
              <input
                type="text"
                name="moneyRaised"
                value={investor.moneyRaised}
                onChange={(e) => onChange(index, e)}
                placeholder="Money Raised"
                required={investor}
              />
              <input
                type="text"
                name="valuation"
                value={investor.valuation}
                onChange={(e) => onChange(index, e)}
                placeholder="Valuation"
                required={investor}
              />
              <button onClick={() => removeInvestment(index)}>Remove</button>
            </div>
          ))}
          <button onClick={addMore}>Add More</button>
        </div>
      )}
    </>
  );
}

export default InvestmentDetails;
