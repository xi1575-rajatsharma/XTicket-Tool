import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import avatar from '../images/avatar.png';
import { constants } from '../modules/constants';

const TicketReplyBottomContainer = (payload) => {
    const { handleChange, handleSubmit, props, ticketData, replies, handleCommentReply } = payload;
    const [commentReply, isVisible] = useState('reply');

    const dueOn = new Date(ticketData.dueOn);
    const currentDate = new Date();

    const functionCall = () => {
        isVisible('reply');
        handleCommentReply(commentReply)
    }
    return (
        <div className="ticket-reply-bottom-container" >
            <div className="search-field-wrapper">
                <div className="search-field-text-wrapper">
                    <span>Tickets/Xebia</span>
                </div>

                <div className="input-field-wrapper">
                    <input type="text" id="search-tickets" name="search-tickets" />
                </div>
            </div>
            <div className="reply-flexbox">
                <div className="ticket-reply-bottom-container-left-side">
                    <div className="ticket-heading">
                        <h2>Test</h2>
                    </div>
                    <div className="left-side-second-container">
                        <div className="date-reply-comment-wrapper">

                            <div className="reply-wrapper-left-side">
                                <div className="date-time-wrapper">
                                    {currentDate.toDateString()}
                                </div>
                            </div>

                            <div className="reply-wrapper-right-side">

                                <div className="reply-child-left-side" onClick={() => functionCall()} >
                                    <i className="fa fa-reply"></i>
                                    <p>Reply</p>
                                </div>

                                <div className="reply-child-right-side" onClick={() => { isVisible('comment'); handleCommentReply(commentReply) }}>
                                    <i className="fa fa-comment" ></i>
                                    <p>Comment</p>
                                </div>
                            </div>
                        </div>
                        {
                            commentReply === 'reply' ?
                                <div className="comment-box-wrapper">
                                    <div className="sqaure-profile-identifier-wrapper"></div>
                                    <textarea form="reply-form" id="reply" cols="50" rows="8" onChange={(e) => { handleChange(e.target.value) }} placeholder="Please add a reply.Note: This will send an email to the user who raised the ticket"></textarea>
                                </div>
                                : null
                        }
                        {
                            commentReply === 'comment' ?
                                <div className="comment-box-wrapper">
                                    <div className="sqaure-profile-identifier-wrapper"></div>
                                    <textarea form="reply-form" id="reply" cols="50" rows="8" onChange={(e) => { handleChange(e.target.value) }} placeholder="Please add a comment.Note: This will not send an email to the user who raised the ticket"></textarea>
                                </div>
                                : null
                        }
                        <div className="ticket-reply-form-wrapper">
                            <form id="reply-form" onSubmit={(e) => { e.preventDefault(); handleSubmit(commentReply) }} >
                                <div className="attach-file-wrapper">
                                    <i className="material-icons">attachment</i>
                                    <p>Attach a File <span className="black-text">(Upto 20 MB)</span></p>
                                </div>
                                <div className="buttons-wrapper">
                                    <input type="submit" value="Send" />
                                    <button> Save Draft</button>

                                    <span className="cancel-wrapper">
                                        <button> Cancel </button>
                                    </span>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="ticket-replies-wrapper">
                        {
                            replies ? replies.map((reply) => {
                                const replyCreatedOn = new Date(reply.createdOn);

                                return (
                                    <div className="individual-reply-wrapper" key={reply.id}>
                                        <div className="reply-heading-wrapper">
                                            <div className="profile-wrapper"></div>
                                            <span className="reply-createdOn-wrapper"> {replyCreatedOn.getHours()} : {replyCreatedOn.getMinutes()} : {replyCreatedOn.getSeconds()} </span>
                                        </div>
                                        <div className="reply-text-wrapper">{reply.text}</div>
                                    </div>
                                )
                            })
                                : null
                        }
                    </div>
                </div>


                <div className="ticket-reply-bottom-container-right-side">

                    <div className="ticket-brief-information-wrapper">
                        <div className="add-ticket-button">
                            {/* {console.log(props)} */}
                            <Link to={'/ticket/' + props.match.params.ticket_id}> <button>Go To Ticket</button> </Link>
                        </div>

                        <div className="edit-ticket-properties-wrapper">
                            <p>Ticket Properties</p>
                            <a>Edit</a>
                        </div>
                        <div className="assigned-officer-wrapper">
                            <span>Assigned To</span>
                            <div className="profile-wrapper">
                                <div className="profile-picture-wrapper">
                                </div>
                                <span>{ticketData.assignedTo}</span>
                            </div>
                        </div>

                        <div className="status-wrapper">
                            <span>Status</span>
                            <span>{ticketData.status}</span>
                            <select defaultValue={ticketData.status}>
                                <option value="CLOSED">Closed</option>
                                <option value="OPEN">Open</option>
                            </select>
                            {/* <option value="CLOSED">Closed</option>
                                <option value="OPEN">Open</option>
                            </select> */}
                        </div>

                        <div className="closed-time-wrapper">
                            <span>Closed Time</span>
                            <span className="date-time-wrapper">
                                {dueOn.getDay() + ' ' + dueOn.toLocaleString('default', { month: 'long' })}
                            </span>
                        </div>

                        <div className="ticket-information-heading-wrapper">
                            <h4> Ticket Information</h4>
                        </div>

                        <div className="ticket-brief-location-wrapper">
                            <span className="red-text">Location</span>
                            <span className="city-text">{ticketData.location}</span>
                        </div>

                        <div className="ticket-brief-phone-wrapper">
                            <span>Phone</span>
                            <span className="phone-text">Phone No.</span>
                        </div>

                        <div className="ticket-brief-department-wrapper">
                            <span className="red-text">Department</span>
                            <span>{ticketData.department}</span>
                        </div>

                        <div className="ticket-brief-sub-issue-wrapper">
                            <span className="red-text">Sub Issue</span>
                            <span>{ticketData.subIssue}</span>
                        </div>

                        <div className="ticket-brief-classifications-wrapper">
                            <span>Classifications</span>
                            <span>{ticketData.classification}</span>
                        </div>

                        <div className="ticket-brief-priority-wrapper">
                            <span>Priority</span>
                            <span>-None-</span>
                        </div>

                        <div className="ticket-brief-product-name-wrapper">
                            <span>Product Name</span>
                        </div>
                    </div>
                </div>
            </div>
        </div >

    )
}

export default TicketReplyBottomContainer;