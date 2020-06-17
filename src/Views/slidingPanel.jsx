import React, { useState } from 'react';
import doubleLeft from '../images/double-right.png'

const SlidingPanel = (payload) => {
    const [sideBarClass, setSideBarClass] = useState(payload.sideBar)

    const closeHandler = (e) => {
        e.preventDefault();
        setSideBarClass("sidebar close");
        payload.close()
    }

    const replyClass = (replyCreatedBy) => {
        if (replyCreatedBy.includes(payload.displayName)) {
            return "individual-reply-wrapper-right"
        } else {
            return "individual-reply-wrapper-left"
        }
    }
    return (
        <div className={sideBarClass}>
            {console.log(payload.ticketReplies)}
            <div className="sideBar-heading-wrapper"  >
                <div>Replies <img onClick={closeHandler} src={doubleLeft} alt="back-arrow" height="20px" /></div>
                {/* <button onClick={closeHandler}>Close X</button> */}
            </div>
            <div className="ticket-replies-wrapper">
                {
                    payload.ticketReplies ? payload.ticketReplies.map((reply) => {
                        const replyCreatedOn = new Date(reply.createdOn);

                        return (
                            <div className={replyClass(reply.createdBy)} key={reply.id}>
                                <div className="reply-body-wrapper">
                                    <div className="message-username-seperator"></div>
                                    <div className="reply-heading-wrapper">
                                        <div className="createdBy-wrapper" >{reply.createdBy}</div>
                                        <span className="reply-createdOn-wrapper">{replyCreatedOn.getDate()} {replyCreatedOn.toLocaleString('default', { month: 'long' })} at {replyCreatedOn.toLocaleString('en-US', { hour: 'numeric', hour12: true })}</span> {/*{replyCreatedOn.getDate()}/{replyCreatedOn.getMonth()} ({replyCreatedOn.getHours()} : {replyCreatedOn.getMinutes()} */}
                                    </div>
                                    <div className="reply-text-wrapper">{reply.text}</div>
                                </div>
                            </div>
                        )
                    })
                        : <div className="ticket-replies-wrapper"> <p> NO activity here yet</p> </div>
                }
            </div>

        </div>
    )
}
export default SlidingPanel;