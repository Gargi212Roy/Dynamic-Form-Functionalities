import React, { useState, useEffect } from "react";
import CompanyDetails from "../component/CompanyDetails";
import FounderDetails from "../component/FounderDetails";
import SalesDetails from "../component/SalesDetails";
import InvestmentDetails from "../component/InvestmentDetails";
import LastPage from "../component/LastPage";
import AppProvider from "../context/AppProvider";

function FormFillup() {
  const [page, setPage] = useState(0);
  const formTitles = [
    "Company Details",
    "Founder Details",
    "Sales Details",
    "Investment Details",
    "Last Page",
  ];

  useEffect(() => {
    const currPage = parseInt(localStorage.getItem("activePage"));
    setPage(currPage || 0);
  }, []);

  const pageDisplay = () => {
    switch (page) {
      case 0:
        return <CompanyDetails />;
      case 1:
        return <FounderDetails />;
      case 2:
        return <SalesDetails />;
      case 3:
        return <InvestmentDetails />;
      case 4:
        return <LastPage />;
      default:
        return null;
    }
  };

  return (
    <>
      <div>
        <div>
          <header>
            <h1>{formTitles[page]}</h1>
          </header>
          <main>
            <div>
              <AppProvider>{pageDisplay()}</AppProvider>
            </div>
          </main>
          <footer>
            <div>
              <button
                type="button"
                onClick={() => {
                  setPage((currPage) => {
                    localStorage.setItem("activePage", currPage);
                    return currPage + 1;
                  });
                }}
                disabled={page === formTitles.length - 1}
              >
                Next
              </button>
              <button
                type="button"
                onClick={() => {
                  setPage((currPage) => currPage - 1);
                }}
                disabled={page === 0}
              >
                Previous
              </button>
            </div>
          </footer>
        </div>
      </div>
    </>
  );
}

export default FormFillup;
