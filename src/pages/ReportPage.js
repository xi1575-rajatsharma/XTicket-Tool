import React, { Component } from "react";
import BarView from "../Views/Reports/BarView";
import SLAUser from "../Views/Reports/SLAUser";
import PieRating from "../Views/Reports/PieRating";
import ViolationByStatus from "../Views/Reports/ViolationByStatus";
import ViolationByDate from "../Views/Reports/ViolationByDate";
import AchievedVsViolated from "../Views/Reports/AchievedVsViolated";
import AverageEfficiency from "../Views/Reports/AverageEfficiency";
import DeparmtmentFilter from '../Views/departmentFilter';
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
      statusDataCopy: {
        OPEN: 0,
        INPROGRESS: 0,
        AWATING: 0,
        REVIEW: 0,
        ESCALATED: 0,
        REOPENED: 0,
        CLOSED: 0,
        RESOLVED: 0,
      },
      departmentStatusCount: [],
      isDepartmentStatusCountValid: false,
      departments: [],
      rating: {
        oneStars: 0,
        twoStars: 0,
        threeStars: 0,
        fourStars: 0,
        fiveStars: 0,
      },
      achieved_vs_missed: {},
      status: null,
      average_efficiency: {},
      averageHours: 0,
      statusByDate: [],
      view: "ticketStatus"
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
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            case "ASSIGNED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.ASSIGNED = statusData.ASSIGNED + 1;
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            case "INPROGRESS":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.INPROGRESS = statusData.INPROGRESS + 1;
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            case "AWATING":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.AWATING = statusData.AWATING + 1;
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            case "REVIEW":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.REVIEW = statusData.REVIEW + 1;
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            case "ESCALATED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.ESCALATED = statusData.ESCALATED + 1;
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            case "REOPENED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.REOPENED = statusData.REOPENED + 1;
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            case "CLOSED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.CLOSED = statusData.CLOSED + 1;
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            case "RESOLVED":
              this.setState((prevState) => {
                let statusData = Object.assign({}, prevState.statusData);
                statusData.RESOLVED = statusData.RESOLVED + 1;
                this.setState({ statusDataCopy: statusData })
                return { statusData };
              });
              break;
            default:
            // console.log("oops");
          }
        });
        this.setState({ statusDataCopy: this.state.statusData })
      }
    );
    /////////////////////////////////API CALL 2////////////////////////////////////////////////
    fetch.get({
      url: constants.SERVICE_URLS.RATING,
      callbackHandler: (response) => {
        const {
          message,
          payload: { result },
        } = response;
        // console.log(result);
        this.setState({
          rating: result,
          message: message,
        });
      },
    });
    ///////////////////////////////////////API CALL 3//////////////////////////////////////
    fetch.get({
      url: constants.SERVICE_URLS.MISSED_VS_ACHIEVED,
      callbackHandler: (response) => {
        const {
          message,
          payload: { result },
        } = response;

        //console.log(response.payload.result);
        this.setState({
          achieved_vs_missed: result,
          message: message,
        });
        // console.log(message);
      },
    });

    //////////////////////////////////////API CALL 4/////////////////////////////////////
    fetch.get({
      url: constants.SERVICE_URLS.MISSED_BY_STATUS,
      callbackHandler: (response) => {
        const {
          message,
          payload: { data },
        } = response;
        this.setState({
          status: data,
        });
      },
    });

    /////////////////////////////////////////API CALL 5//////////////////////////////////
    fetch.get({
      url: constants.SERVICE_URLS.AVERAGE_EFFICIENCY,
      callbackHandler: (response) => {

        const {
          message,
          payload: { data },
        } = response;
        this.setState({
          average_efficiency: data,
        });
        let sum = 0;
        for (let i of this.state.average_efficiency) {
          sum += i.hoursToRespond;
        }
        let average = sum / this.state.average_efficiency.length;
        //console.log("average" + average);
        this.setState({
          averageHours: average,
        });
        //console.log(this.state.averageHours);
      },
    });
    ////////////////////////////////////////////API CALL 6///////
    fetch.get({
      url: constants.SERVICE_URLS.SLA_DATE,
      callbackHandler: (response) => {
        const {
          message,
          payload: { data }
        } = response;
        this.setState({
          statusByDate: data
        });
      },
    });
    ////////////////////////////////////////// API CALL 7 ////////////////////////

    fetch.get({
      url: constants.SERVICE_URLS.ADMIN_STATUS_COUNT,
      callbackHandler: response => {
        const { status, payload } = response;

        if (status === constants.SUCCESS) {
          this.setState({ departmentStatusCount: payload.result.departments, isDepartmentStatusCountValid: true })
        } else {
          this.setState({ isDepartmentStatusCountValid: false })
        }
      }
    })

    ////////////////////////////////////////// API CALL 8////////////////////////
    fetch.get({
      url: constants.SERVICE_URLS.GET_DEPARTMENTS,
      callbackHandler: response => {
        const { status, payload: { result: { departments } } } = response;
        if (status === constants.SUCCESS) {
          this.setState({ departments: departments });
        }
      }
    })

    // fetch.get({
    //   url: constants.SERVICE_URLS.DEPARTMENT_RATING,
    //   callbackHandler: response => console.log(response)
    // })
    this.props.setIsTicketLoading();
  };

  getTicketsByMonth = (date) => {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    console.log(dd, '/', date, '/', yyyy);
    fetch.get({
      url: constants.SERVICE_URLS.MONTHLY_FLITER + `${yyyy}-${date}-${dd}`,
      callbackHandler: response => {
        const { status, payload: { data } } = response;
        console.log(data);
        if (status === constants.SUCCESS) {
          let statusData = {
            OPEN: 0,
            INPROGRESS: 0,
            AWATING: 0,
            REVIEW: 0,
            ESCALATED: 0,
            REOPENED: 0,
            CLOSED: 0,
            RESOLVED: 0,
          };
          data.map(ticketStatus => {
            switch (ticketStatus.status) {
              case ("OPEN"):
                statusData.OPEN = ticketStatus.count;
                break;
              case ("ASSIGNED"):
                statusData.ASSIGNED = ticketStatus.count;
                break;
              case ("INPROGRESS"):
                statusData.INPROGRESS = ticketStatus.count;
                break;
              case ("AWAITING"):
                statusData.AWAITING = ticketStatus.count;
                break;
              case ("REVIEW"):
                statusData.REVIEW = ticketStatus.count;
                break;
              case ("ESCALATED"):
                statusData.ESCALATED = ticketStatus.count;
                break;
              case ("CLOSED"):
                statusData.CLOSED = ticketStatus.count;
                break;
              case ("REOPENED"):
                statusData.REOPENED = ticketStatus.count;
                break;
              case ("RESOLVED"):
                statusData.RESOLVED = ticketStatus.count;
                break;
              default:
                this.setState({ statusData: statusData });
                break;
            }
          })
          this.setState({ statusData: statusData });
        }
      }
    })
  }

  onDepartmentChange = (value) => {
    let statusData = JSON.stringify(this.state.statusData);
    switch (value) {
      case "All":
        this.setState({ statusData: this.state.statusDataCopy });
        break;
      case "Human Resource":
        let hrDepartmentStatusCount = JSON.stringify(this.state.departmentStatusCount['Human Resource']);
        statusData = hrDepartmentStatusCount;
        this.setState({ statusData: JSON.parse(statusData) });
        break;
      case "Administration":
        let adminDepartmentStatusCount = JSON.stringify(this.state.departmentStatusCount.Administration);
        statusData = adminDepartmentStatusCount;
        this.setState({ statusData: JSON.parse(statusData) });
        break;
      case "Finance":
        let financeDepartmentStatusCount = JSON.stringify(this.state.departmentStatusCount.Finance);
        statusData = financeDepartmentStatusCount;
        this.setState({ statusData: JSON.parse(statusData) });
        break;
      case "IT":
        let ITDepartmentStatusCount = JSON.stringify(this.state.departmentStatusCount.IT);
        statusData = ITDepartmentStatusCount;
        this.setState({ statusData: JSON.parse(statusData) });
        break;
      case "01":
      case "02":
      case "03":
      case "04":
      case "05":
      case "06":
      case "07":
      case "08":
      case "09":
      case "10":
      case "11":
      case "12":
        this.getTicketsByMonth(value);
        break;
      default:
        this.setState({ ...this.state });
    }
  }

  render() {
    return (
      <>
        <div className="report-container">
          <div className="report-container__left">
            <nav>
              <ul className="mcd-menu">
                <li>
                  <a href="#" onClick={() => this.setState({ view: "ticketStatus" })} >
                    <strong>Ticket Status</strong>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => this.setState({ view: "performance" })}>
                    <strong>Performance</strong>
                  </a>
                </li>
                <li>
                  <a href="#" onClick={() => this.setState({ view: "SLA" })}>
                    <strong>SLA's Missed</strong>
                  </a>
                </li>
              </ul>
            </nav>
          </div>
          <div className="report-container__right">
            {this.state.view === "ticketStatus" ?
              <div className="report-container__right__BarChart">
                <span className="report-container__right__select">
                  <DeparmtmentFilter
                    departments={this.state.departments}
                    onDepartmentChange={this.onDepartmentChange}
                    departmentCount={this.state.isDepartmentStatusCountValid} />
                </span>
                <BarView statusData={this.state.statusData} />
              </div> :
              this.state.view === "performance" ?
                <>
                  <div className="report-container__right__AverageEfficiency">
                    <AverageEfficiency averageHours={this.state.averageHours} />
                  </div>
                  <div className="report-container__right__Pierating">
                    <PieRating ratings={this.state.rating} />
                  </div> </> :
                this.state.view === "SLA" ?
                  <>
                    <div className="report-container__right__ViolationByStatus">
                      <ViolationByStatus status={this.state.status} />
                    </div>
                    <div className="report-container__right__AchievedVsViolated">
                      <AchievedVsViolated
                        achieved_vs_missed={this.state.achieved_vs_missed}
                      />
                    </div>
                    <div className="report-container__right__ViolationByTime">
                      <ViolationByDate statusByDate={this.state.statusByDate} />
                    </div></> : null
            }
          </div>
        </div>
      </>
    );
  }
}

export default ReportPage;