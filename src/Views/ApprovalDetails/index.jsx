import React, { useState } from 'react'
import Sidebar from '../../Components/UI/Sidebar'
import orangeReply from '../../images/orange-reply.png';
import orangeChat from '../../images/message.png';
import Reply from './Reply';
import Replies from './Replies';
import TicketBasicDetails from './TicketBasicDetails';
import DMFormatter from '../../Components/UI/DMFormatter';

const ApprovalDetails = ({ onToggleSidebar, ticket }) => {


  const [currentReply, setReplyType] = useState(null)
  const [showReplies, setShowReplies] = useState(false)

  const onSubmitHandler = data => {
    /** API CALL TO SUBMIT REPLY */
  }

  const {conversations, ...ticketDetails} = ticket

  /** Temp */
  let conversations2 = [
    {
      id: 1,
      createdBy: 'Manvir',
      text: 'HELLO, Good Morning, Manvir Here',
      createdOn: 1600918663000
    },
    {
      id: 2,
      createdBy: 'John Doe',
      text: 'Hello Manvir, John Here, How are you doing ?',
      createdOn: 1600918763000
    },
    {
      id: 3,
      createdBy: 'Manvir',
      text: 'I am doing good John. Thanks for asking.',
      createdOn: 1600918763000
    }
  ]
  /** Temp */

  return (
    <Sidebar title={ticketDetails.description} onClose={() => onToggleSidebar(false)} classes={['approvalDetails']} styles={{ width: '60%', alignItems: 'start' }}>
      {ticket.loading ? <div className="approvalHolder__noApprovals">Loading</div> : (
        <div className="ticketDetails-wrapper">
          <div className="ticketDetails-left">
            <TicketBasicDetails ticket={ticketDetails} />
          </div>
          <div className="ticketDetails-right">
            <div className="ticketDetails-top-bar">
              <div className="ticketDetails-approver">
                <p>Send mail to: <a href="mailto:manvir.singh@xebia.com"><strong>manvir.singh@xebia.com</strong></a></p>
              </div>
              <div className="ticketDetails-actions">
                <img onClick={() => setReplyType('email')} title="Add Reply" className="image-reply" width="35px" src={orangeReply} alt="" />
              </div>
            </div>
            <div className="ticketDetails-origin">
              {currentReply && <Reply onSubmit={onSubmitHandler} onCancel={() => setReplyType(null)} type={currentReply} />}

              <div className="ticketDetails-origin-message">
                <h5>{ticketDetails.displayName} <span>Created on <DMFormatter timestamp={ticketDetails.creationTime} /></span></h5>
                <p>{ticketDetails.description}</p>
                <button onClick={() => setShowReplies(!showReplies)} className="view-replies-btn">{showReplies ? 'Hide' : 'Show'} Replies</button>
                {showReplies && <Replies displayName={ticketDetails.displayName} items={conversations} />}
              </div>

            </div>
          </div>
        </div>
      )}
    </Sidebar>
  )
}

export default ApprovalDetails