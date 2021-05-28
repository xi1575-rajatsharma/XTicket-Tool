import React, { useState, useEffect } from "react";
import downArrow from "../../images/expand-arrow.png";

const MonthSelect = (props) => {
  const [areAllMonthsVisible, setAreAllMonthsVisible] = useState(false);
  const [allMonthsClassName, setAllMonthsClassName] = useState();
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [previouslySelectedMonth, setpreviouslySelectedMonth] = useState(null);

  const setAllMonthsVisibility = (event) => {
    event.stopPropagation();
    setAreAllMonthsVisible(!areAllMonthsVisible);
  };
  useEffect(() => {
    const array = props.allMonthsArray.filter((month) =>
      month.value === props.selectedMonth ? month.label : null
    );
    array[0]
      ? setpreviouslySelectedMonth(array[0].label)
      : setpreviouslySelectedMonth(null);
  }, [props.allMonthsArray, props.selectedMonth]);
  return (
    <div className="monthSelect">
      <div className="monthSelect-defaultContainer">
        <div
          className="monthSelect-defaultContainer--monthName"
          onClick={setAllMonthsVisibility}
        >
          {selectedMonth ? (
            <div>{selectedMonth}</div>
          ) : props.selectedMonth ? (
            previouslySelectedMonth
          ) : (
            "--Select Month --"
          )}
          <img
            src={downArrow}
            alt="down arrow"
            style={areAllMonthsVisible ? { transform: "rotate(180deg)" } : null}
          />
        </div>
        {areAllMonthsVisible ? (
          <div className={`monthSelect-allMonthsContainer growOutAnimation`}>
            {props.allMonthsArray.map((month) => {
              return (
                <div
                  className="monthSelect-allMonthsContainer__month"
                  onClick={(e) => {
                    if (props.selectedYear === props.currentDate.year) {
                      if (month.value <= props.currentDate.month) {
                        setSelectedMonth(month.label);
                        setAllMonthsVisibility(e);
                        props.setDates({ selectedMonth: month.value });
                      }
                    } else if (
                      props.selectedYear === (null || undefined) ||
                      props.selectedYear < props.currentDate.year
                    ) {
                      setSelectedMonth(month.label);
                      setAllMonthsVisibility(e);
                      props.setDates({ selectedMonth: month.value });
                    }
                  }}
                  style={
                    parseInt(props.currentDate.month) < month.value &&
                    props.selectedYear === props.currentDate.year
                      ? { backgroundColor: "rgba(0,0,0,.3)" }
                      : null
                  }
                >
                  {month.label}
                </div>
              );
            })}
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default MonthSelect;
