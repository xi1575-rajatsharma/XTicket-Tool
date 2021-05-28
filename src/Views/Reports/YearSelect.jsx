import React, { useState, useEffect } from "react";
import downArrow from "../../images/expand-arrow.png";

const YearSelect = (props) => {
  const [areAllYearsVisible, setAreAllYearsVisible] = useState(false);
  const [allYearsClassName, setAllYearsClassName] = useState();
  const [selectedYear, setSelectedYear] = useState(null);

  const setAllYearsVisibility = () => {
    setAreAllYearsVisible(!areAllYearsVisible);
  };
  return (
    <div className="yearSelect">
      <div
        className="yearSelect-defaultContainer"
        onClick={() => setAllYearsVisibility()}
      >
        <div className="yearSelect-defaultContainer--yearName">
          {selectedYear ? (
            <div>{selectedYear}</div>
          ) : (
            props.selectedYear || "Select Year"
          )}
          <img
            src={downArrow}
            alt="down arrow"
            style={areAllYearsVisible ? { transform: "rotate(180deg)" } : null}
          />
        </div>
        {areAllYearsVisible ? (
          <div className={`yearSelect-allYearsContainer`}>
            <div
              className="yearSelect-allYearsContainer__year"
              onClick={() => {
                setSelectedYear(props.currentYear);
                setAllYearsVisibility();
                props.setDates({ selectedYear: props.currentYear });
              }}
            >
              {props.currentYear}
            </div>
            <div
              className="yearSelect-allYearsContainer__year"
              onClick={() => {
                setSelectedYear(props.currentYear - 1);
                setAllYearsVisibility();
                props.setDates({ selectedYear: props.currentYear - 1 });
              }}
            >
              {props.currentYear - 1}
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default YearSelect;
