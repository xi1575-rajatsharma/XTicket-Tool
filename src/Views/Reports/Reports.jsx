/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useRef, Component } from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Tooltip,
  Sector,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
} from "recharts";
import PieRating from "./PieRating";
import Ratings from "./Ratings";
import SLAMissedByStatus from "./SLAMissedByStatus";
import AverageEfficiency from "./AverageEfficiency";
import StatusBarChart from "./StatusBarChart";
import ReportInfo from "../../images/ReportsInfo.svg";
import MonthSelect from "./monthSelect";
import YearSelect from "./YearSelect";
import { convertDatetoReportFormat } from "../../utils/Constants";
import closeWindow from "../../images/closewindow.png";
import { allMonthsArray } from "../../utils/ReportPageUtils/ReportPageUtils";
import Loader from "../../Components/Loader/Loader";

export default class Reports extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSelect: "TicketStatus",
      currentFilterCategory: null,
      isFilterVisible: false,
      selectedYear: null,
      selectedMonth: null,
      isDateError: false,
      dateVisibilityObject: {
        achievedVsMissed: { date: null, isDateVisible: false },
        userSLA: { date: null, isDateVisible: false },
      },
    };
  }

  updateState = (value) => this.setState({ currentSelect: value });
  setIsFilterValues = (value, shouldDateVisbilityObjectUpdate) => {
    this.setState(
      {
        isFilterVisible: !this.state.isFilterVisible,
        currentFilterCategory: value,
      },
      () => {}
    );

    if (shouldDateVisbilityObjectUpdate) {
      this.setState((prevState) => {
        const currentFilterCategory = prevState.currentFilterCategory;
        const dateVisibilityObject = prevState.dateVisibilityObject;

        dateVisibilityObject[
          currentFilterCategory
        ].date = `${this.state.selectedYear}-${this.state.selectedMonth}`;
        dateVisibilityObject[currentFilterCategory].isDateVisible = true;
        const date = {
          year: this.state.selectedYear,
          month:
            this.state.selectedMonth < 9
              ? `0${this.state.selectedMonth}`
              : this.state.selectedMonth,
        };
        this.props.handleDateSubmit(this.state.currentFilterCategory, date);
        return {
          dateVisibilityObject,
        };
      });
    }
  };

  setDates = (value) => {
    this.setState(value);
  };

  render() {
    const {
      SLAPie,
      ratings,
      missedByStatus,
      averageHours,
      status,
      slaMissedByDate,
      slaByDept,
    } = this.props;
    return (
      <div className="reports-container" ref={(node) => (this.node = node)}>
        {this.state.isFilterVisible ? (
          <div className="reports-container__overlay">
            <div className="reports-container__overlay--filterContainer">
              <a
                className="reports-container__overlay--filterContainer--closeImage"
                onClick={() =>
                  this.setIsFilterValues(this.state.currentFilterCategory)
                }
              >
                X
              </a>
              <div className="reports-container__overlay--filterContainer--selectOptions">
                <MonthSelect
                  allMonthsArray={allMonthsArray}
                  selectedMonth={this.state.selectedMonth}
                  currentDate={this.props.currentDate}
                  selectedYear={this.state.selectedYear}
                  setDates={this.setDates}
                />
                <YearSelect
                  currentYear={this.props.currentDate.year}
                  selectedYear={this.state.selectedYear}
                  setDates={this.setDates}
                />
              </div>
              {parseInt(this.props.currentDate.month) <
                this.state.selectedMonth &&
              this.state.selectedYear === this.props.currentDate.year ? (
                <p className="reports-container__overlay--filterContainer--error">
                  Please enter a valid Date
                </p>
              ) : null}
              <a
                href="#"
                className="reports-container__overlay--filterContainer--submit"
                onClick={() => {
                  if (
                    parseInt(this.props.currentDate.month) <
                      this.state.selectedMonth &&
                    this.state.selectedYear === this.props.currentDate.year
                  ) {
                    return;
                  } else {
                    if (this.state.selectedMonth && this.state.selectedYear) {
                      this.setIsFilterValues(
                        this.state.currentFilterCategory,
                        true
                      );
                    }
                  }
                }}
                style={
                  parseInt(this.props.currentDate.month) <
                    this.state.selectedMonth &&
                  this.state.selectedYear === this.props.currentDate.year
                    ? {
                        marginTop: "0%",
                        marginBottom: "-19%",
                        backgroundColor: "grey",
                      }
                    : this.state.selectedMonth && this.state.selectedYear
                    ? { marginTop: "16.5%", marginBottom: "-17%" }
                    : {
                        marginTop: "16.5%",
                        marginBottom: "-17%",
                        backgroundColor: "grey",
                      }
                }
              >
                Submit
              </a>
            </div>
          </div>
        ) : null}
        <div className="reports-container__top">
          <div
            className="reports-container__top--report"
            style={{ flexGrow: 3 }}
          >
            <div
              className="reports-container__top--report-header"
              style={{ textAlign: "center" }}
            >
              <>
                SLA's Achived Vs Missed
                <p className="reports-container__top--report-date">
                  {this.state.dateVisibilityObject.achievedVsMissed &&
                  this.state.dateVisibilityObject.achievedVsMissed
                    .isDateVisible &&
                  this.state.dateVisibilityObject.achievedVsMissed.date
                    ? `- ${this.state.dateVisibilityObject.achievedVsMissed.date}`
                    : null}
                </p>
              </>
              <button
                className="reports-container__top--report-filter"
                onClick={() => this.setIsFilterValues("achievedVsMissed")}
              >
                Filter
              </button>
            </div>
            <PieRating SLAPie={SLAPie} />
          </div>
          <div
            className="reports-container__top--report"
            style={{ flexGrow: 2 }}
          >
            <div
              className="reports-container__top--report-header"
              style={{ textAlign: "center" }}
            >
              <>Ratings</>{" "}
              <div className="">
                <img src={ReportInfo} alt="" height="30px" />
              </div>
            </div>
            {ratings ? <Ratings ratings={ratings} /> : <Loader />}
          </div>
          <div className="reports-container__top--report">
            <div
              className="reports-container__top--report-header"
              style={{ textAlign: "center", marginBottom: "2rem" }}
            >
              <>SLA Missed Status</>{" "}
              <div className="">
                <img src={ReportInfo} alt="" height="30px" />
              </div>
            </div>
            <SLAMissedByStatus missedByStatus={missedByStatus} />
          </div>
          <div className="reports-container__top--report">
            <div
              className="reports-container__top--report-header"
              style={{ textAlign: "left" }}
            >
              <>Your Efficiency</>{" "}
              <div className="">
                <img src={ReportInfo} alt="" height="30px" />
              </div>
            </div>
            <AverageEfficiency averageHours={averageHours} />
          </div>
        </div>
        <div className="reports-container__bottom">
          <div className="reports-container__bottom--header">
            <div className="reports-container__bottom--header-headerBottomLine"></div>
            <div className="reports-container__bottom--header-headingsConainer">
              <div
                className="reports-container__bottom--header-heading"
                onClick={() => this.updateState("TicketStatus")}
                style={
                  this.state.currentSelect === "TicketStatus"
                    ? { borderBottom: "2px solid green", zIndex: 2 }
                    : null
                }
              >
                Current Ticket Status
              </div>
              <div
                className="reports-container__bottom--header-heading"
                onClick={() => this.updateState("SLA")}
                style={
                  this.state.currentSelect === "SLA"
                    ? { borderBottom: "2px solid green", zIndex: 2 }
                    : null
                }
              >
                Missed SLA Trend
              </div>

              <div
                className="reports-container__bottom--header-heading"
                onClick={() => this.updateState("USER_SLA")}
                style={
                  this.state.currentSelect === "USER_SLA"
                    ? { borderBottom: "2px solid green", zIndex: 2 }
                    : { borderBottom: "0px solid green", zIndex: 2 }
                }
              >
                SLA Missed per User
              </div>
              {/* <div
              className="reports-container__bottom--header-headerHighlighter"
              style={
                this.state.currentSelect === "TicketStatus"
                  ? { width: this.refs.offsetWidth, left: 0 }
                  : this.state.currentSelect === "SLA"
                  ? {
                      width: this.refs.offsetWidth - 10,
                      left: this.refs.offsetWidth + 10,
                    }
                  : {
                      width: this.refs.offsetWidth - 10,
                      left: this.refs.offsetWidth * 2 + 10,
                    }
              }
            ></div> */}
            </div>
            {this.state.currentSelect === "USER_SLA" ? (
              <button
                className="reports-container__top--report-filter"
                onClick={() => this.setIsFilterValues("userSLA")}
              >
                Filter
              </button>
            ) : null}
          </div>

          <div className={"reports-container__bottom--reports"}>
            {this.state.currentSelect === "TicketStatus" ? (
              <StatusBarChart status={status} />
            ) : this.state.currentSelect === "SLA" ? (
              <ResponsiveContainer height="100%" width="70%">
                <LineChart
                  width={500}
                  height={300}
                  data={slaMissedByDate}
                  margin={{
                    top: 5,
                    right: 30,
                    left: 20,
                    bottom: 5,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="value"
                    stroke="#8884d8"
                    activeDot={{ r: 8 }}
                  />
                  {/* <Line type="monotone" dataKey="uv" stroke="#82ca9d" /> */}
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <>
                <ResponsiveContainer height="100%" width="100%">
                  <LineChart
                    width={500}
                    height={300}
                    data={slaByDept}
                    margin={{
                      top: 5,
                      right: 30,
                      left: 20,
                      bottom: 5,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="empName" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="resolved"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="missed" stroke="#82ca9d" />
                  </LineChart>
                </ResponsiveContainer>
              </>
            )}
          </div>
        </div>
      </div>
    );
  }
}

// const Reports = (props) => {

//     const heading1Ref = useRef(null);
//     const heading2Ref = useRef(null);

//     const handleLoad = () => console.log("hello");

//     return (
//         <div className="reports-container">
//            <div className="reports-container__top">
//                <div className="reports-container__top--report" style={{flexGrow:2}}>
//                     <div style={{ textAlign:"center"}}>SLA's Achived Vs Missed</div>
//                         <PieRating SLAPie= {SLAPie}/>
//                 </div>
//                 <div className="reports-container__top--report" style={{flexGrow:2}}>
//                     <div style={{ marginRight:20, textAlign:"center"}}>Ratings</div>
//                     <Ratings ratings={ratings} />
//                 </div>
//                 <div className="reports-container__top--report">
//                     <div style={{ marginRight:20, textAlign:"center", marginBottom:"2rem"}}>Ratings</div>
//                     <SLAMissedByStatus missedByStatus={missedByStatus} />
//                 </div>
//                     <div className="reports-container__top--report">Hellllo
//                     <AverageEfficiency averageHours={averageHours} />
//                </div>
//            </div>
//            <div className="reports-container__bottom">
//                 <div className="reports-container__bottom--header">
//                     <div className="reports-container__bottom--header-headerBottomLine"></div>
//                     <div className="reports-container__bottom--header-heading" ref={heading1Ref}>Current Ticket Status</div>
//                     <div className="reports-container__bottom--header-heading" ref={heading2Ref}>SLA's Missed By Date</div> {console.log(heading1Ref.current)}
//                     <div className="reports-container__bottom--header-headerHighlighter" style={{width: heading1Ref.offsetWidth}}></div>
//                 </div>
//            </div>
//         </div>
//     )
// }

// export default Reports

// <BarChart
//                   width="90%"
//                   height={100}
//                   data={status}
//                   margin={{
//                     top: 5, right: 30, left: 20, bottom: 5,
//                   }}
//                 >
//         {/* <CartesianGrid strokeDasharray="10 10" /> */}
//         <XAxis dataKey="name"/>
//         <YAxis />
//         <Tooltip cursor={{width: 110,fill: '#99ffff'}} />
//         {/* <Legend /> */}
//         {/* <Bar dataKey="pv" fill="#8884d8" /> */}
//         <Bar dataKey="value" barSize={35}> {
//           status.map((entry,index) => {
//             switch(entry.name){
//               case "OPEN":
//               return <Cell width={40} fill= { "#ff8000"} />;
//               case "INPROGRESS":
//               return <Cell width={40} fill= { "#99cc00"} />;
//               case "AWATING":
//               return <Cell width={40} fill= { "#0000e6"} />;
//               case "REVIEW":
//               return <Cell width={40} fill= { "#220066"} />;
//               case "ESCALATED":
//               return <Cell width={40} fill= { "#ff3300"} />;
//               case "REOPENED":
//               return <Cell width={40} fill= { "#cc0052"} />;
//               case "CLOSED":
//               return <Cell width={40} fill= { "#5cd65c"} />;
//               case "RESOLVED":
//               return <Cell width={40} fill= { "#003300"} />;
//               default:
//               return <Cell width={40} fill= { "#80ff80"} />;
//             }
//           })
//         } </Bar>
//       </BarChart>
