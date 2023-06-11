import React, { useContext, useEffect } from "react";
import AppContext from "../context/AppContext";

function CompanyDetails() {
  const { companyDetails, setCompanyDetails } = useContext(AppContext);

  const { cName, website, start, startMonth, industry, idea } = companyDetails;
  const onChange = (e) => {
    setCompanyDetails((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  useEffect(() => {
    localStorage.setItem("companyDetails", JSON.stringify(companyDetails));
  }, [companyDetails]);

  return (
    <div>
      <div>Company Details</div>
      <ul>
        <li>
          <input
            type="text"
            placeholder="name"
            id="cName"
            onChange={onChange}
            value={cName}
          />
        </li>
        <li>
          <input
            type="text"
            placeholder="website"
            id="website"
            value={website}
            onChange={onChange}
          />
        </li>
        <li>
          <input
            type="text"
            placeholder="start date"
            id="start"
            value={start}
            onChange={onChange}
          />
        </li>
        <li>
          <input
            type="text"
            placeholder="start month"
            id="startMonth"
            value={startMonth}
            onChange={onChange}
          />
        </li>
        <li>
          <input
            type="text"
            placeholder="industry"
            id="industry"
            value={industry}
            onChange={onChange}
          />
        </li>
        <li>
          <textarea
            placeholder="Tell about it"
            id="idea"
            value={idea}
            onChange={onChange}
          ></textarea>
        </li>
      </ul>
    </div>
  );
}

export default CompanyDetails;
