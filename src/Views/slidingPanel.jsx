import React, { useState } from 'react';
import doubleLeft from '../images/double-right.png'

const SlidingPanel = (payload) => {
    const [sideBarClass, setSideBarClass] = useState(payload.sideBar)

    const closeHandler = (e) => {
        e.preventDefault();
        setSideBarClass("sidebar close");
        payload.close()
    }


    return (
        <div className={sideBarClass}>
            <div className="sideBar-heading-wrapper"  >
                <div>Replies <img onClick={closeHandler} src={doubleLeft} alt="back-arrow" height="20px" /></div>
                {/* <button onClick={closeHandler}>Close X</button> */}
            </div>
            <div className="ticket-replies-wrapper">
                {
                    payload.ticketReplies ? payload.ticketReplies.map((reply) => {
                        const replyCreatedOn = new Date(reply.createdOn);

                        return (
                            <div className="individual-reply-wrapper" key={reply.id}>
                                <div className="reply-heading-wrapper">
                                    <div className="profile-wrapper"></div>
                                    <span className="reply-createdOn-wrapper">{replyCreatedOn.getDate()}/{replyCreatedOn.getMonth()} ({replyCreatedOn.getHours()} : {replyCreatedOn.getMinutes()}) </span>
                                </div>
                                <div className="reply-text-wrapper">{reply.text}</div>
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