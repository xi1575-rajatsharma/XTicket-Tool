import React, { Component } from "react";
import BarView from "../Views/Reports/BarView";
import SLAUser from "../Views/Reports/SLAUser";
import PieRating from "../Views/Reports/PieRating";
import ViolationByStatus from "../Views/Reports/ViolationByStatus";
import ViolationByTime from "../Views/Reports/ViolationByTime";
import AchievedVsViolated from "../Views/Reports/AchievedVsViolated";
import AverageEfficiency from "../Views/Reports/AverageEfficiency";

import { fetch } from "../modules/httpServices";
import { constants } from "../modules/constants";

class ReportPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      allTickets: [],
      message: "",
      statusData: {
        OPEN: 0,
        INPROGRESS: 0,
        AWATING: 0,
        REVIEW: 0,
        ESCALATED: 0,
        REOPENED: 0,
        CLOSED: 0,
        RESOLVED: 0,
      },
      rating: {
        oneStars: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 0,
      },
    };
  }

  componentDidMount() {
    this.getTickets();
  }

  getTickets = () => {
    const _listingData = JSON.parse(
      window.localStorage.getItem("_listingData")
    );
    this.setState(
      {
        allTickets: _listingData,
      },
      () => {
        this.state.allTickets.map((ticket) => {
          switch (ticket.status) {
            case "OPEN":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.OPEN = statusData.OPEN + 1;
                return { statusData };
              });
              break;
            case "ASSIGNED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.ASSIGNED = statusData.ASSIGNED + 1;
                return { statusData };
              });
              break;
            case "INPROGRESS":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.INPROGRESS = statusData.INPROGRESS + 1;
                return { statusData };
              });
              break;
            case "AWATING":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.AWATING = statusData.AWATING + 1;
                return { statusData };
              });
              break;
            case "REVIEW":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.REVIEW = statusData.REVIEW + 1;
                return { statusData };
              });
              break;
            case "ESCALATED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.ESCALATED = statusData.ESCALATED + 1;
                return { statusData };
              });
              break;
            case "REOPENED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.REOPENED = statusData.REOPENED + 1;
                return { statusData };
              });
              break;
            case "CLOSED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.CLOSED = statusData.CLOSED + 1;
                return { statusData };
              });
              break;
            case "RESOLVED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.RESOLVED = statusData.RESOLVED + 1;
                return { statusData };
              });
              break;
            default:
            // console.log("oops");
          }
        });
      }

    );
    /////////////////////////////////API CALL 2////////////////////////////////////////////////
    fetch.get({
      url: constants.SERVICE_URLS.XYZ,
      callbackHandler: (response) => {
        console.log(response)
      },
    });
    fetch.get({
      url: constants.SERVICE_URLS.XYZ,
      callbackHandler: (response) => {
        console.log(response)
      }
    })
  };
  render() {
    return (
      <div style={{ width: "100%", height: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <h1>Coming soon!</h1>
      </div>
    );
  }
}

export default ReportPage;


/*
 <>
        <div className="report-container">
          <div className="report-container__left">
            <nav>
              <ul class="mcd-menu">
                <li>
                  <a href="">
                    <strong>Ticket Status</strong>
                  </a>
                </li>
                <li>
                  <a href="">
                    <strong>Average efficiency</strong>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="report-container__right">
            <div className="report-container__right__BarChart">
              <BarView statusData={this.state.statusData} />
            </div>
            <div className="report-container__right__AverageEfficiency">
              <AverageEfficiency />
            </div>
            <div className="report-container__right__Pierating">
              <PieRating ratings={this.state.rating} />
            </div>
            <div className="report-container__right__SLAUser">
              <SLAUser />
            </div>
            <div className="report-container__right__SLAUser">
              <SLAUser />
            </div>
            <div className="report-container__right__ViolationByStatus">
              <ViolationByStatus />
            </div>
            <div className="report-container__right__AchievedVsViolated">
              <AchievedVsViolated />
            </div>
            <div className="report-container__right__ViolationByTime">
              <ViolationByTime />
            </div>
          </div>
        </div>
      </>
*/