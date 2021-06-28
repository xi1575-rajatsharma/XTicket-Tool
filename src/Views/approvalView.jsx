import React, { useEffect, useState } from "react";
import icon from "../images/newIcon.png";
import { fetch } from "../modules/httpServices";
import { constants } from "../modules/constants";
import axios from "axios";
import Loader from "core/Loader/Loader";

const ApprovalView = (props) => {
  const [approvalStatus, setApprovalStatus] = useState("");
  const [approvalMessage, setApprovalMessage] = useState("");
  const [state, setState] = useState({
    fetchedUrlParams: {
      url_string: null,
      params: null,
      ticketID: null,
      approver: null,
      token: null,
      options: null,
    },
    comment: "",
    isApprovalLoading: false,
  });

  useEffect(() => {
    const url_string = window.location.href;
    const params = new URL(url_string);
    const ticketID = params.searchParams.get("ticketid");
    const approver = params.searchParams.get("approver");
    const token = params.searchParams.get("token");
    const options = {
      headers: { "x-access-channel": "WEB" },
    };

    setState({
      ...state,
      fetchedUrlParams: {
        url_string,
        params,
        ticketID,
        approver,
        token,
        options,
      },
    });
  }, []);

  const onSubmit = () => {
    mapChangesToState({ isApprovalLoading: true });
    axios
      .post(
        `${constants.SERVICE_URLS.APPROVAL_JOURNEY}/${state.fetchedUrlParams.ticketID}?approver=${state.fetchedUrlParams.approver}&token=${state.fetchedUrlParams.token}`
      )
      .then((res) => {
        setApprovalStatus(res.status);
        setApprovalMessage(res.data.result.approvalStatus);
        mapChangesToState({ isApprovalLoading: false });
      })
      .catch((error) => {
        setApprovalStatus(error.response.status);
        mapChangesToState({ isApprovalLoading: false });
      });
  };

  const mapChangesToState = (value) => setState({ ...state, ...value });

  return (
    <div className="approval">
      <div className="approval__overlay">
        <div className="approval__form">
          {state.isApprovalLoading ? (
            <div className="approval__form--loading">
              <Loader />
            </div>
          ) : approvalStatus ? (
            <div className="approval__ticket-info">
              <img src={icon} alt="New Icon" className="approval__icon" />
              {approvalStatus === 409
                ? "Action already taken!"
                : approvalStatus === 404
                ? "No approvals needed for the ticket"
                : approvalStatus === 200
                ? "You " + approvalMessage + " the request"
                : approvalStatus === ""
                ? "Loading.."
                : "Something went wrong..."}
              <br />
            </div>
          ) : (
            <>
              <div className="approval__form--heading">
                Ticket ID: {state.fetchedUrlParams.ticketID}
              </div>
              <div className="approval__form--comment">
                <div className="comment">
                  Add Comment<span className="asterisk">*</span>
                </div>
                <textarea
                  rows="10"
                  onChange={(e) =>
                    mapChangesToState({ comment: e.target.value })
                  }
                ></textarea>
              </div>
              <div className="approval__form--submit">
                <button
                  className="approval__form--submit--sub"
                  style={!state.comment.length ? { opacity: 0.6 } : null}
                  onClick={state.comment.length && onSubmit}
                >
                  Submit
                </button>
                {/* <button
              className="approval__form--submit--can"
              onClick={closeWindow}
            >
              Cancel
            </button> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ApprovalView;
