import React, { useContext, useEffect } from "react";
import { useState } from "react";
import AppContext from "../context/AppContext";

function SalesDetails() {
  const { companyDetails } = useContext(AppContext);
  const month = companyDetails.startMonth;

  const prevMonth = "March";
  const startMonth = "April";

  const data = parseInt(companyDetails.start, 10);

  const currYear = new Date().getFullYear();
  const totYear = currYear - data;

  const [salesDetails, setSalesDetails] = useState(() => {
    const storeSalesDetails = localStorage.getItem("salesDetails");
    return storeSalesDetails
      ? JSON.parse(storeSalesDetails)
      : {
          data: Array(totYear + 1).fill({
            yrRevenue: "",
            yrGrossMargin: "",
            yrNetProfit: "",
          }),
        };
  });

  useEffect(() => {
    localStorage.setItem("salesDetails", JSON.stringify(salesDetails));
  }, [salesDetails]);

  useEffect(() => {
    localStorage.setItem("data", JSON.stringify(data));
  }, [data]);

  const onChange = (index, e) => {
    setSalesDetails((prevState) => {
      const updatedSales = [...prevState.data];
      updatedSales[index] = {
        ...updatedSales[index],
        [e.target.name]: e.target.value,
      };
      return {
        ...prevState,
        data: updatedSales,
      };
    });
  };
  return (
    <>
      <div>Sales Details</div>
      {companyDetails && (
        <div>
          total sales since: {data} {month}
        </div>
      )}

      <div>
        {salesDetails.data.map((sales, index) => (
          <div key={index}>
            <h3>
              {index === totYear ? (
                <span>last two months</span>
              ) : index > 0 ? (
                <span>
                  {startMonth} {index + data} to {prevMonth} {index + data + 1}{" "}
                </span>
              ) : (
                <span>
                  {month} {index + data} to {prevMonth} {index + data + 1}{" "}
                </span>
              )}
            </h3>
            <input
              type="text"
              name="yrRevenue"
              value={sales.yrRevenue}
              onChange={(e) => onChange(index, e)}
              placeholder="Yearly Revenue"
            />
            <input
              type="text"
              name="yrGrossMargin"
              value={sales.yrGrossMargin}
              onChange={(e) => onChange(index, e)}
              placeholder=" Gross Margin"
            />
            <input
              type="text"
              name="yrNetProfit"
              value={sales.yrNetProfit}
              onChange={(e) => onChange(index, e)}
              placeholder="Net Profit"
            />
          </div>
        ))}
        <div></div>
      </div>
    </>
  );
}

export default SalesDetails;
