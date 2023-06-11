import React, { useState, useEffect } from "react";

const FounderDetails = () => {
  const [founderDetails, setFounderDetails] = useState(() => {
    const storeFounderDetails = localStorage.getItem("founderDetails");
    return storeFounderDetails
      ? JSON.parse(storeFounderDetails)
      : [
          {
            founderName: "",
            founderAge: "",
            founderNativeLocation: "",
            founderQualification: "",
            founderShare: "",
            founderRelationship: "",
          },
        ];
  });

  useEffect(() => {
    localStorage.setItem("founderDetails", JSON.stringify(founderDetails));
  }, [founderDetails]);

  const onChange = (index, e) => {
    setFounderDetails((prevState) => {
      const updatedFounders = [...prevState];
      updatedFounders[index] = {
        ...updatedFounders[index],
        [e.target.name]: e.target.value,
      };
      return updatedFounders;
    });
  };

  const addMore = () => {
    let newField = {
      founderName: "",
      founderAge: "",
      founderNativeLocation: "",
      founderQualification: "",
    };
    setFounderDetails([...founderDetails, newField]);
  };

  const removeFounder = (index) => {
    setFounderDetails((prevState) => {
      const updatedFounders = [...prevState];
      updatedFounders.splice(index, 1);
      return updatedFounders;
    });
  };

  return (
    <div>
      <div>Founder Details</div>
      {founderDetails.map((founder, index) => (
        <ul key={index}>
          <li>
            <input
              type="text"
              name="founderName"
              value={founder.founderName}
              onChange={(e) => onChange(index, e)}
              placeholder="Name"
            />
          </li>
          <li>
            <input
              type="number"
              name="founderAge"
              value={founder.founderAge}
              onChange={(e) => onChange(index, e)}
              placeholder="Age"
            />
          </li>
          <li>
            <input
              type="text"
              name="founderNativeLocation"
              value={founder.founderNativeLocation}
              onChange={(e) => onChange(index, e)}
              placeholder=" Location"
            />
          </li>
          <li>
            <input
              type="text"
              name="founderQualification"
              value={founder.founderQualification}
              onChange={(e) => onChange(index, e)}
              placeholder="Qualification"
            />
          </li>
          <li>
            <input
              type="text"
              name="founderShare"
              value={founder.founderShare}
              onChange={(e) => onChange(index, e)}
              placeholder="Shares"
            />
          </li>

          {index > 0 ? (
            <li>
              <input
                type="text"
                name="founderRelationship"
                value={founder.founderRelationship}
                onChange={(e) => onChange(index, e)}
                placeholder="Relation with the founders"
              />
            </li>
          ) : (
            <span></span>
          )}

          <button onClick={() => removeFounder(index)}>Remove</button>
        </ul>
      ))}
      <button onClick={addMore}>Add More</button>
    </div>
  );
};

export default FounderDetails;
