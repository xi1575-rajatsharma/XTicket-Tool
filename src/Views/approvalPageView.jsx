import React, { useState, useEffect } from "react";
import { fetch } from "../modules/httpServices";
import { constants } from "../modules/constants";
import Accepted from "../images/Accepted.png";
import Rejected from "../images/Rejected.png";
import ApprovalDetails from "./ApprovalDetails";

const ApprovalPageView = (props) => {
  const [approvalList, setApprovalList] = useState([]);
  const [approvalListLoading, setApprovalListLoading] = useState(false);
  const [view, setView] = useState("Pending");
  const [message, setMessage] = useState("");
  const [approvedRequests, setApprovedRequests] = useState([]);
  const [rejectedRequests, setRejectedRequests] = useState([]);
  const [pendingRequests, setPendingRequests] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [buttonText, setButtonText] = useState("");
  const [token, setToken] = useState(null);
  const [approver, setApprover] = useState("");
  const [ticketID, setTicketID] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [comment, setComment] = useState("");
  const [requestSubmitError, setrequestSubmitError] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [sidebar, setSidebar] = useState(false);
  const [ticketDetails, setTicketDetails] = useState({
    loading: false,
  });
  const [ticketApprovers, setTicketApprovers] = useState([]);
  const [rowDetails, setRowDetails] = useState(null);

  const setValues = (event, token, approver, ticketID, buttonText) => {
    event.stopPropagation();
    setButtonText(buttonText);
    setToken(token);
    setApprover(approver);
    setTicketID(ticketID);
    setShowPopup(true);
  };

  const submitAction = () => {
    fetch.post({
      url:
        constants.SERVICE_URLS.APPROVAL_JOURNEY +
        `${ticketID}?approver=${approver}&token=${token}&approverComment=${comment}`,
      callbackHandler: (response) => {
        const { payload, status, message } = response;
        if (status === constants.SUCCESS) {
          setSuccessMessage("Request Submitted Successfully");
        } else {
          setrequestSubmitError(true);
          setSuccessMessage("Something went wrong...");
        }
        console.log(response);
      },
    });
  };

  /** Get Ticket Details when an item is clicked (Temp) */
  const getTicketDetails = (ticketId) => {
    setTicketDetails({ ...ticketDetails, loading: true });
    setSidebar(true);

    fetch.get({
      url: `${constants.SERVICE_URLS.CUSTOM_TICKET_DETAILS}${ticketId}`,
      callbackHandler: (response) => {
        const { payload, status, message } = response;
        if (status === constants.SUCCESS) {
          setTicketDetails(payload.result.ticketDetails);
        }
      },
    });

    fetch.get({
      url: `${constants.SERVICE_URLS.CUSTOM_TICKET_MEMBERS}${ticketId}`,
      callbackHandler: (response) => {
        const { payload, status, message } = response;
        if (status === constants.SUCCESS) {
          setTicketApprovers(payload);
        }
      },
    });
    // import("./ticketDetails.json").then(({ default: data }) => {
    //     setTicketDetails(data.result.ticketDetails)
    // })
  };

  useEffect(() => {
    setApprovalListLoading(true);
    fetch.post({
      url: constants.SERVICE_URLS.APPROVAL_LIST,
      callbackHandler: (response) => {
        const { payload, status, message } = response;
        if (status === constants.SUCCESS) {
          setApprovalList(payload.data);
          setMessage("");
          setApprovalListLoading(false);

          payload.data.map((approvalItem) => {
            switch (approvalItem.approvalStatus) {
              case "APPROVED":
                setApprovedRequests(approvalItem.approval);
                break;
              case "REJECTED":
                setRejectedRequests(approvalItem.approval);
                break;
              case "PENDING":
                setPendingRequests(approvalItem.approval);
                setTableData(approvalItem.approval);
                break;
              default:
                console.log("default");
            }
          });
        } else {
          setMessage(message);
          setApprovalListLoading(false);
        }
      },
    });
    props.setIsTicketLoading();
  }, []);

  const submitHandler = (e) => {
    e.preventDefault();
    submitAction();
  };
  return (
    <>
      {sidebar && (
        <ApprovalDetails
          ticket={ticketDetails}
          t
          ticketApprovers={ticketApprovers}
          onToggleSidebar={setSidebar}
          setValues={setValues}
          rowDetails={rowDetails}
          view={view}
        />
      )}

      {showPopup ? (
        <div className="approvalPopup">
          <div className="approvalPopup__content">
            {requestSubmitError ? (
              <>
                <span className="approvalPopup__content--errorMessage">
                  {" "}
                  {successMessage}{" "}
                </span>
                <a
                  href="#"
                  className={"btn-close approval-btn"}
                  onClick={() => {
                    setShowPopup(false);
                    setSuccessMessage("");
                    setrequestSubmitError(false);
                  }}
                >
                  Close
                </a>
              </>
            ) : successMessage ? (
              <>
                <span className="approvalPopup__content--successMessage">
                  {" "}
                  {successMessage}{" "}
                </span>
                <a
                  href="#"
                  className={"btn-close approval-btn"}
                  onClick={() => {
                    setShowPopup(false);
                    setSuccessMessage("");
                    setrequestSubmitError(false);
                  }}
                >
                  Close
                </a>
              </>
            ) : (
              <>
                <span
                  className="approvalPopup__content--closeIcon"
                  onClick={() => setShowPopup(false)}
                >
                  X
                </span>
                <span className="approvalPopup__content--heading">
                  Add a comment<span className="asterisk">*</span>
                </span>
                <textarea
                  onChange={(e) => setComment(e.currentTarget.value)}
                  name="approvalComment"
                  placeholder="Write your comment here..."
                  className="approvalPopup__content--comment"
                  cols="30"
                  rows="10"
                ></textarea>
                <a
                  href="#"
                  className={
                    buttonText === "Approve"
                      ? "btn-approve approval-btn"
                      : "btn-reject approval-btn"
                  }
                  style={{ opacity: comment.length ? 1 : 0.7 }}
                  onClick={(e) => {
                    comment.length && submitHandler(e);
                  }}
                >
                  {buttonText}
                </a>
              </>
            )}
          </div>
        </div>
      ) : null}
      {approvalList ? (
        approvalList.length === 0 ? (
          approvalListLoading ? (
            <div className="approvalHolder__noApprovals">Loading..</div>
          ) : (
            <div className="approvalHolder__noApprovals">
              No Pending Approvals..
            </div>
          )
        ) : (
          <>
            <div className="approvalHolder">
              <div className="approvalHolder__approvalStatus">
                <div
                  className="approvalHolder__approvalStatus--Approved"
                  onClick={() => {
                    setView("Approved");
                    setTableData(approvedRequests);
                  }}
                  style={
                    view === "Approved"
                      ? { borderBottom: "3px solid #6C1D5F", fontWeight: "800" }
                      : null
                  }
                >
                  Approved
                </div>
                <div
                  className="approvalHolder__approvalStatus--Pending"
                  onClick={() => {
                    setView("Pending");
                    setTableData(pendingRequests);
                  }}
                  style={
                    view === "Pending"
                      ? { borderBottom: "3px solid #6C1D5F", fontWeight: "800" }
                      : null
                  }
                >
                  {" "}
                  Pending
                </div>
                <div
                  className="approvalHolder__approvalStatus--Rejected"
                  onClick={() => {
                    setView("Rejected");
                    setTableData(rejectedRequests);
                  }}
                  style={
                    view === "Rejected"
                      ? { borderBottom: "3px solid #6C1D5F", fontWeight: "800" }
                      : null
                  }
                >
                  {" "}
                  Rejected
                </div>
              </div>
            </div>
            <table className="ticketListingTable">
              <thead>
                <tr id="header-row">
                  <th>id</th>
                  <th>Ticket Id</th>
                  <th>Requested By</th>
                  <th>Approver</th>
                  <th>Approval Status</th>
                  {view !== "Pending" ? <th>Comment</th> : null}
                  {view === "Pending" ? <th>Action</th> : null}
                </tr>
              </thead>

              <tbody>
                {pendingRequests !== [] ? (
                  tableData.map((request) => {
                    return (
                      <React.Fragment key={request.id}>
                        <tr
                          className="clickable"
                          onClick={(e) => {
                            getTicketDetails(request.ticketId);
                            setRowDetails(request);
                          }}
                          key={request.id}
                        >
                          <td>{request.id}</td>
                          <td>{request.ticketId}</td>
                          <td>{request.createdByUser}</td>
                          <td>{request.approver}</td>
                          <td>{request.approvalStatus}</td>
                          {view !== "Pending" ? (
                            <td>
                              {view === "Pending" ? (
                                <input type="text" />
                              ) : request.approvarComment ? (
                                request.approvarComment
                              ) : (
                                "No Comment"
                              )}
                            </td>
                          ) : null}
                          {view === "Pending" ? (
                            <td>
                              {view === "Pending" ? (
                                <>
                                  {" "}
                                  <img
                                    src={Accepted}
                                    height="20px"
                                    title="Approve"
                                    onClick={(e) =>
                                      setValues(
                                        e,
                                        request.approvalToken,
                                        request.approver,
                                        request.ticketId,
                                        "Approve"
                                      )
                                    }
                                  />{" "}
                                  <img
                                    src={Rejected}
                                    title="Reject"
                                    height="20px"
                                    onClick={(e) =>
                                      setValues(
                                        e,
                                        request.rejectionToken,
                                        request.approver,
                                        request.ticketId,
                                        "Reject"
                                      )
                                    }
                                  />{" "}
                                </>
                              ) : null}{" "}
                            </td>
                          ) : null}
                        </tr>
                      </React.Fragment>
                    );
                  })
                ) : (
                  <tr>No approvals Here</tr>
                )}
              </tbody>
            </table>
          </>
        )
      ) : (
        <div className="approvalHolder__noApprovals">
          No Pending Approvals..
        </div>
      )}
    </>
  );
};

export default ApprovalPageView;
