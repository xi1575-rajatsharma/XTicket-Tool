import React, { useState } from 'react'
import Sidebar from '../../Components/UI/Sidebar'
import orangeReply from '../../images/orange-reply.png';
import { fetch } from '../../modules/httpServices';
import { constants } from '../../modules/constants';
import Reply from './Reply';
import Replies from './Replies';
import TicketBasicDetails from './TicketBasicDetails';
import DMFormatter from '../../Components/UI/DMFormatter';
import axios from 'axios';
import giphy from '../../images/giphy.webp';

const ApprovalDetails = ({ onToggleSidebar, ticket, ticketApprovers, rowDetails, setValues, view }) => {

  console.log(rowDetails)
  const [currentReply, setReplyType] = useState(null)
  const [isreplyLoading, setIsReplyLoading] = useState(false)



  const { conversations, ...ticketDetails } = ticket
  const onSubmitHandler = data => {
    setIsReplyLoading(true);
    axios.interceptors.request.use(function (config) {
      const token = window.localStorage.getItem('_token');

      config.headers['x-access-channel'] = 'ANDROID';
      config.headers['Content-Type'] = 'application/json';

      if (token != null) {
        config.headers.Authorization = `Bearer ${token}`;
      }

      return config;
    }, function (err) {

      return Promise.reject(err);

    });
    const request = JSON.stringify({
      text: data.text,
      "conversationType": "ReplyAll",
      "userRecepients": ticketApprovers.slice(0)[0].email,
      "managerRecepients": ticketApprovers.slice(1)[0].email,
    });
    const bodyFOrmData = new FormData()
    bodyFOrmData.append('request', request);
    // fetch.post({
    //   url: `${constants.SERVICE_URLS.CUSTOM_TICKET_REPLIES}${ticketDetails.id}`,
    //   requestBody: {
    //     text: data.text,
    //     "conversationType": "ReplyAll",
    //     "userRecepients": ticketApprovers.slice(0)[0].email,
    //     "managerRecepients": ticketApprovers.slice(1)[0].email,
    //   },
    //   callbackHandler: response => {
    //     const { payload, status, message } = response;
    //     if (status === constants.SUCCESS) {

    //     } else {

    //     }
    //     console.log(response)
    //   }
    // })
    axios({
      method: 'post',
      url: constants.SERVICE_URLS.TICKET_REPLY + ticketDetails.id,
      data: bodyFOrmData
    }).then(() => {
      setTimeout(() => setIsReplyLoading(false), 2000);
    })
      .catch(error => console.log(error))
  }


  console.log(conversations);
  return (
    <Sidebar title={ticketDetails.subject} id={ticketDetails.id} onClose={() => onToggleSidebar(false)} classes={['approvalDetails']} styles={{ width: '60%', alignItems: 'start' }}>
      {ticket.loading ? <div className="approvalHolder__noApprovals">Loading</div> : (
        <div className="ticketDetails-wrapper">
          <div className="ticketDetails-left">
            <TicketBasicDetails ticket={ticketDetails} ticketApprovers={ticketApprovers} />
          </div>
          <div className="ticketDetails-right">
            <div className="ticketDetails-top-bar">
              <div className="ticketDetails-approver">
                <p>Send mail to manager click here: <a href={ticketApprovers ? ticketApprovers.slice(1).map(approver => { return `mailto:${approver.email}` }) : null}><strong>{ticketApprovers ? ticketApprovers.slice(1).map(approver => <p className="ticketDetails-info-item-value">{approver.email}</p>) : null}</strong></a></p>
              </div>
              <div className="ticketDetails-actions" onClick={() => currentReply === 'email' ? setReplyType(null) : setReplyType('email')}>
                {isreplyLoading ?
                  <img src={giphy} height="100px" />
                  :
                  <>
                    <img title="Add Reply" className="image-reply" width="35px" src={orangeReply} alt="" />
                    <label>Add Reply</label>
                  </>
                }
              </div>
            </div>
            <div className="ticketDetails-origin">
              {currentReply && <Reply onSubmit={onSubmitHandler} onCancel={() => setReplyType(null)} type={currentReply} />}

              <div className="ticketDetails-origin-message">
                <h5>{ticketDetails.displayName} <span>Created on <DMFormatter timestamp={ticketDetails.creationTime} /></span></h5>
                <p>{ticketDetails.description ? ticketDetails.description : "No Ticket Description Found"}</p>
                {view === 'Pending' ? <>
                  <a className="btn-approve approval-btn" style={{ color: "white" }} onClick={(e) => setValues(e, rowDetails.approvalToken, rowDetails.approver, rowDetails.ticketId, "Approve")}> Approve </a>
                  <a className="btn-reject approval-btn" style={{ color: "white" }} onClick={(e) => setValues(e, rowDetails.rejectionToken, rowDetails.approver, rowDetails.ticketId, "Reject")}> Reject </a>
                </> : null}

                {conversations ?
                  <Replies displayName={ticketDetails.displayName} items={conversations} /> : null
                }
              </div>

            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export default ApprovalDetails