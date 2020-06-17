import React, { useState } from 'react';
import Loader from 'react-loader-spinner';
import arrow from '../images/arrow.png';
import rightArrow from '../images/right-arrow.png';
import clock from '../images/stopwatch.png';
import orangeChat from '../images/message.png';
import { Link } from 'react-router-dom';
import orangeReply from '../images/orange-reply.png';
import FeedBackView from './feedBackView';
import SlidingPanel from './slidingPanel';
import { constants } from '../modules/constants';
import attachment from '../images/attachment.png'




const TicketView = (payload) => {
    const [display, isVisible] = useState('id_conversation');
    const [ticketStatusPopup, shouldDisplay] = useState('no');
    const { ticketData, ticketReplies, changeSelectValue, changeStatusValue, resolutionChangeHandler, resolutionSubmitHandler, statusHandler, resolutionText, allAdminUsers, ticketJourney, replyChangeHandler, replySubmitHandler, allStatus, isLoading, statusChangeLoading, listingData, updateTicketData, fileSelect, downloadFile } = payload;
    const [displayreplybox, showreplybox] = useState(false);
    const [displaycommentbox, showcommentbox] = useState(false);
    const [sideBarOpen, setSideBarOpen] = useState(false)

    const openHandler = () => {
        if (!sideBarOpen) {
            setSideBarOpen(true)
        } else {
            setSideBarOpen(false)
        }
    }
    const sideBarCloseHandler = () => {
        setSideBarOpen(false)
    }
    const allOverPageCloseHandler = () => {
        if (sideBarOpen) {
            setSideBarOpen(false)
        }
    }


    let sidebar
    if (sideBarOpen) {
        sidebar = <SlidingPanel ticketReplies={ticketReplies} close={sideBarCloseHandler} displayName={ticketData.displayName} sideBar={"sideBar"} />
    }

    const creationTime = new Date(ticketData.creationTime);
    const dueOn = new Date(ticketData.dueOn)
    var month = new Array();
    month[0] = "January";
    month[1] = "February";
    month[2] = "March";
    month[3] = "April";
    month[4] = "May";
    month[5] = "June";
    month[6] = "July";
    month[7] = "August";
    month[8] = "September";
    month[9] = "October";
    month[10] = "November";
    month[11] = "December";
    var creationMonth = month[creationTime.getMonth()];
    var dueOnMonth = month[dueOn.getMonth()];



    const selectMapper = (mapValues) => {
        mapValues.map((option) => {
            return (
                <option key={option.departmentId} value={option.emailId}>{option.name}</option>
            )
        })
    }

    const switchChanges = (status) => {
        switch (status) {
            case "ASSIGNED":
                return (
                    <React.Fragment>
                        <div className="assigned-icon-wrapper"></div>
                        <div className="change-text-wrapper">Ticket Assigned to {ticketData.assignedTo} </div>
                    </React.Fragment>
                )
            case "OPEN":
                return (
                    <React.Fragment>
                        <div className="raised-icon-wrapper"></div>
                        <div className="change-text-wrapper">Ticket Raised</div>
                    </React.Fragment>
                )
            case "INPROGRESS":
                return (
                    <React.Fragment>
                        <div className="resolving-icon-wrapper"></div>
                        <div className="change-text-wrapper">Someone is working on resolution of your ticket </div>
                    </React.Fragment>
                )
            case "AWAITING":
                return (
                    <React.Fragment>
                        <div className="awaiting-icon-wrapper"></div>
                        <div className="change-text-wrapper">Awaiting for your response</div>
                    </React.Fragment>
                )
            case "REVIEW":
                return (
                    <React.Fragment>
                        <div className="review-icon-wrapper"></div>
                        <div className="change-text-wrapper">Ticket is under Review</div>
                    </React.Fragment>
                )

            case "ESCALATED":
                return (
                    <React.Fragment>
                        <div className="escalated-icon-wrapper"></div>
                        <div className="change-text-wrapper">Ticket has escalated</div>
                    </React.Fragment>
                )
            case "CLOSED":
                return (
                    <React.Fragment>
                        <div className="closed-icon-wrapper"></div>
                        <div className="change-text-wrapper">Ticket Closed</div>
                    </React.Fragment>
                )
            case "REOPENED":
                return (
                    <React.Fragment>
                        <div className="re-opened-icon-wrapper"></div>
                        <div className="change-text-wrapper">Ticket Re-opened</div>
                    </React.Fragment>
                )
            case "RESOLVED":
                return (
                    <React.Fragment>
                        <div className="resolved-icon-wrapper"></div>
                        <div className="change-text-wrapper">Ticket Resolved</div>
                    </React.Fragment>
                )

            default:
                console.log("nothing here")
        }
    }


    const showhidereplybox = () => showreplybox(!displayreplybox);
    const showhidecommentbox = () => showcommentbox(!displaycommentbox);

    const assignedFinder = (assignedPerson) => {
        switch (assignedPerson) {
            case "Rajat Rajiv Sharma":
                return "rajat.sharma@xebia.com"
            case "Anjali  Akansha":
                return "anjali.akansha@xebia.com"
            case "Shanila Suhail":
                return "shanila.suhail@xebia.com"
            case "Garima Mohan":
                return "gmohan@xebia.com"
            case "Karan Verma":
                return "karan.verma@xebia.com"
            case "Shambhavi Mishra":
                return "shambhavi.mishra@xebia.com"
            case "Sahil Bhatnagar":
                return "sahil.bhatnagar@xebia.com"
            case "Puneet Kohli":
                return "pkohli@xebia.com"
            case "Laghu Tiwari":
                return "ltiwari@xebia.com"
            case "Jayant Yadav":
                return "jayant@xebia.com"
            case "Gautam Jain":
                return "gautam.jain@xebia.com"
            case "Vikas Arora":
                return "vikas.arora@xebia.com"
            default:
                return "none@xebia.com"
        }
    }

    return (
        <React.Fragment>
            {isLoading || statusChangeLoading ?
                <div className="ticket-details-loader-wrapper" >
                    <div className="loader-icon">
                        <Loader
                            type="Oval"
                            color="#9D92B2"
                            height={100}
                            width={100}
                            timeout={7000}
                        /> </div>
                </div> :

                <div className="TicketDetails-container" >

                    {
                        ticketStatusPopup === 'yes' ?
                            <div className="popup-background-wrapper">
                                <FeedBackView shouldDisplay={shouldDisplay} onFeedBackSubmit={payload.onFeedBackSubmit} />
                            </div>
                            : null
                    }
                    {/* {ticketStatusPopup === 'yes' ?
                        <div className="popup-background-wrapper">
                            <div className="status-popup-wrapper">
                                <div className="close-wrapper">
                                    [X]yna
                         </div>
                                <p>Do you want to close the ticket?</p>
                                <div className="buttons-wrapper">
                                    <button type="submit" onClick={() => { statusHandler(); shouldDisplay('no') }}>Yes</button>
                                    <button type="submit" onClick={() => { shouldDisplay('no') }}>No</button>
                                </div>
                            </div>
                        </div>
                        : null} */}

                    <div className="ticket-details-bottom-container">
                        {sidebar}
                        <img className="all-tickets-show-wrapper" src={rightArrow} height="50px" width="30px" />
                        <div className="all-tickets-wrapper">

                            <div className="header-wrapper">
                                <div className="back-arrow-wrapper">
                                    <img src={arrow} alt="back arrow here" />
                                </div>
                                <div className="all-tickets-header-text-wrapper">
                                    All Tickets
                        </div>
                            </div>
                            <div className="ticket-snapshot-wrapper">
                                <div className="snapshot-name-wrapper">{ticketData.displayName}</div>
                                <div className="snapshot-time-globe-wrapper">
                                    <i className="fa fa-globe" />
                                    <span className="date-text">
                                        {creationTime.getDay() + ' ' + creationMonth}
                                    </span>
                                </div>
                                <div className="ticket-snapshot-information-wrapper">
                                    <p> <span className="ticket-id">#{ticketData.id}</span>  {ticketData.subject ? ticketData.subject : null}</p>
                                </div>
                            </div>
                            {
                                listingData.map((ticket) => {
                                    const dueOn = new Date(ticket.creationTime);
                                    let subject = ticket.subject;
                                    subject = subject.substring(0, Math.min(subject.length, 40));
                                    return (
                                        ticket.id === ticketData.id ? null :
                                            <Link key={ticket.id} to={'/ticketlist/' + ticket.id}>
                                                <div className="ticket-snapshot-wrapper" key={ticket.id} onClick={() => updateTicketData(ticket.id)}>
                                                    <div className="snapshot-name-wrapper">{ticket.displayName}</div>
                                                    <div className="snapshot-time-globe-wrapper">
                                                        <i className="fa fa-globe" />
                                                        <span className="date-text">
                                                            {dueOn.getDate() + ' ' + month[dueOn.getMonth()]}
                                                        </span>
                                                    </div>
                                                    <div className="ticket-snapshot-information-wrapper">
                                                        <p> <span className="ticket-id">#{ticket.id}</span>   {ticket.subject}</p>
                                                    </div>
                                                </div>
                                            </Link>
                                    )
                                })
                            }

                        </div>
                        <div className="ticket-brief-wrapper">
                            <div className="ticket-brief-heading-wrapper">
                                <div className="ticket-brief-heading-horizontal-line-wrapper"></div>
                                <h3> {ticketData.displayName}</h3>
                                <div className="email-wrapper">
                                    <span>{ticketData.emailId}</span>
                                </div>
                            </div>

                            <div className="ticket-brief-information-wrapper">
                                <div className="ticket-information-heading-wrapper">
                                    <h4> Ticket Information</h4>
                                </div>
                                <div className="assigned-officer-wrapper">
                                    <span>Assigned To</span>
                                    <div className="profile-wrapper">

                                        <select value={assignedFinder(ticketData.assignedTo)} onChange={(e) => { changeSelectValue(e.target.value, ticketData.status) }}>
                                            {allAdminUsers ?
                                                allAdminUsers.map((admin) => {
                                                    return (
                                                        <option key={admin.emailId} value={admin.emailId}>{admin.name}</option>
                                                    )
                                                })
                                                : null}
                                        </select>
                                        {/* <span>{ticketData.assignedTo}</span>     */}
                                    </div>
                                </div>

                                <div className="status-wrapper">
                                    <span>Status</span>
                                    <select className="ticket-brief-status-select" value={ticketData.status} onChange={(e) => { changeStatusValue(e.target.value) }}>

                                        {
                                            allStatus ?
                                                allStatus.map((status) => {
                                                    return (
                                                        status.id === 6 || status.id === 2 || status.id === 7 ? <option key={status.id} value={status.status} disabled>{status.status}</option> :
                                                            <option key={status.id} value={status.status}>{status.status}</option>

                                                    )
                                                }) : null
                                        }

                                        {/* <option value="OPEN">OPEN</option>
                                <option value="CLOSED">CLOSED</option> */}
                                    </select>
                                    {/* <span>{ticketData.status}</span> */}
                                </div>

                                <div className="closed-time-wrapper">
                                    <span class="red-text">Closed Time</span>
                                    <span className="date-time-wrapper">{dueOn.getUTCDate() + ' ' + dueOnMonth}</span>
                                </div>



                                <div className="ticket-brief-location-wrapper">
                                    <span className="red-text">Location</span>
                                    <span className="city-text">{ticketData.location}</span>
                                </div>



                                <div className="ticket-brief-department-wrapper">
                                    <span className="red-text">Department</span>
                                    <span >{ticketData.department}</span>
                                </div>

                                <div className="ticket-brief-sub-issue-wrapper">
                                    <span className="red-text">Sub Issue</span>
                                    <span>{ticketData.subIssue}</span>

                                </div>

                                <div className="ticket-brief-classifications-wrapper">
                                    <span class="red-text">Classifications</span>
                                    <span>{ticketData.classification}</span>
                                </div>

                                <div className="ticket-brief-priority-wrapper">
                                    <span class="red-text">Priority</span>
                                    <span>{ticketData.subIssue}</span>
                                </div>



                            </div>

                        </div>
                        <div className="selected-ticket-details-wrapper">
                            <div className="selected-ticket-header-wrapper">

                                <div className="selected-ticket-heading-wrapper">
                                    <div className="id-and-subject-wrapper">
                                        <div className="subject-left-side-wrapper">
                                            <p>{'#' + ticketData.id} {ticketData.subject}</p>
                                        </div>
                                        <div className="subject-right-side-wrapper">
                                            <img className="reply-image" src={orangeReply} title="Reply" alt="nothing here" width="30px" height="30px" tooltip="hey" onClick={() => { showhidereplybox(); showcommentbox(false) }} />
                                            {/* <Link to={'/ticketlist/' + ticketData.id}> */}
                                            <img className="chat-image" src={orangeChat} title="Comment" alt="nothing here" width="30px" height="30px" onClick={() => { showhidecommentbox(); showreplybox(false) }} />   {/**/}
                                            {/* </Link> */}
                                        </div>
                                    </div>
                                    <div className="time-wrapper">
                                        <img src={clock} alt="clock icon here" width="15px" height="15px" />
                                        <p>{dueOn.getDate() + ' ' + creationMonth}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="ticket-details-sub-nav-wrapper">
                                <div className="conversation-wrapper" onClick={() => isVisible('id_conversation')} style={display === 'id_conversation' ? { color: "#06A99C", fontSize: "11px", fontWeight: "bolder" } : null}> Conversation</div>

                                <div className="resolution-nav-wrapper" onClick={() => isVisible('id_resolution')} style={display === 'id_resolution' ? { color: '#06A99C', fontSize: "11px", fontWeight: "bolder" } : null}>resolution</div>

                                <div className="attachment-wrapper" onClick={() => isVisible('id_attachment')} > attachment</div>

                                {/* <div className="approval-wrapper">approval</div> */}
                                <div className="history-wrapper" onClick={() => isVisible('id_history')} style={display === 'id_history' ? { color: '#06A99C', fontSize: "11px", fontWeight: "bolder" } : null} > history</div>
                            </div>

                            {/* <form>
                            <textarea rows="10" cols="50"></textarea>
                            <button>submit</button>
                        </form> */}
                            {display === 'id_conversation' ? <React.Fragment>
                                <div className="total-ticket-details-wrapper">
                                    {displayreplybox === true ?
                                        <React.Fragment>
                                            <form id="reply-form" onSubmit={(e) => { e.preventDefault(); replySubmitHandler("reply"); showreplybox() }}>
                                                <div className="comment-box-wrapper">
                                                    <textarea form="reply-form" id="reply" onChange={(e) => { replyChangeHandler(e.target.value) }} cols="95" rows="8" placeholder="Please add a reply.Note: This will send an email to the user who raised the ticket"></textarea>

                                                </div>


                                                <div class="buttons-wrapper">
                                                    <span><input type="file" multiple onChange={(e) => fileSelect(e)} /></span>
                                                    <span> <input type="submit" id="reply-send" value="Send" />
                                                        <button id="cancel-reply" onClick={showreplybox}>Cancel</button></span>
                                                </div>
                                            </form>
                                        </React.Fragment> : null}
                                    {displaycommentbox === true ?
                                        <React.Fragment>
                                            <form id="comment-form" onSubmit={(e) => { e.preventDefault(); replySubmitHandler("comment"); showreplybox() }}>
                                                <div class="comment-box-wrapper">
                                                    <textarea form="comment-form" id="reply" onChange={(e) => { replyChangeHandler(e.target.value) }} cols="101" rows="15" placeholder="Please add a comment.Note: This will NOT send an email to the user who raised the ticket"></textarea>
                                                </div>
                                                <div class="comments-buttons-wrapper">
                                                    <input type="submit" value="Send" ></input>
                                                    <button id="cancel-reply" onClick={showcommentbox}>Cancel</button>
                                                </div>
                                            </form>
                                        </React.Fragment> : null}

                                    <div className="name-wrapper">

                                        <p className="username-wrapper">{ticketData.emailId} <span className="details-date-wrapper">{creationTime.getDay() + ' ' + creationMonth} {}</span></p> <br />
                                        <p className="ticket-description">{ticketData.description}</p>
                                    </div>
                                    <button onClick={openHandler}>View Replies</button>
                                    {/* <div className="ticket-replies-wrapper">
                                        {
                                            ticketReplies ? ticketReplies.map((reply) => {
                                                const replyCreatedOn = new Date(reply.createdOn);

                                                return (
                                                    <div className="individual-reply-wrapper" key={reply.id}>
                                                        <div className="reply-heading-wrapper">
                                                            <div className="profile-wrapper"></div>
                                                            <span className="reply-createdOn-wrapper"> {replyCreatedOn.getHours()} : {replyCreatedOn.getMinutes()} ,{replyCreatedOn.getDate()} </span>
                                                        </div>
                                                        <div className="reply-text-wrapper">{reply.text}</div>
                                                    </div>
                                                )
                                            })
                                                : <p> NO activity here yet</p>
                                        }
                                    </div> */}
                                </div>
                            </React.Fragment> : null}


                            {display === 'id_resolution' ? ticketData.resolution ? <React.Fragment>
                                <div className="resolution-text">
                                    <p>{ticketData.resolution}</p>
                                </div>
                            </React.Fragment> : <React.Fragment>
                                    <div className="resolution-wrapper">
                                        <form id="resolution-form" onSubmit={resolutionSubmitHandler}>
                                            <textarea form="resolution-form" rows="7" cols="88" placeholder="Enter the resolution here..." onChange={(e) => { resolutionChangeHandler(e.target.value) }}></textarea>
                                            <input type="submit" onClick={() => resolutionText ? shouldDisplay('yes') : null} value="Send" />
                                        </form>

                                    </div>
                                </React.Fragment> : null}
                            {
                                display === 'id_history' ?
                                    ticketJourney ?
                                        <React.Fragment>
                                            <div className="history-container">
                                                {ticketJourney.map(((change) => {
                                                    return (

                                                        <div className="individual-change-wrapper" key={change.id} >
                                                            <div className="top-right-corner-dot"></div >
                                                            {console.log(change)}
                                                            {

                                                                switchChanges(change.status)
                                                            }
                                                            <div className="change-connector"></div>
                                                        </div>
                                                    )
                                                }))}
                                            </div>
                                        </React.Fragment> : <p> NO history of the ticket found</p>
                                    : null
                            }
                            {console.log(ticketData)}
                            {
                                display === 'id_attachment' ?
                                    ticketData.fileName ?
                                        <a className="attachment-anchor" href={constants.SERVICE_URLS.DOWNLOAD_FILE + ticketData.fileName} download><div className="attachment-holder"> <img src={attachment} height="30px" width="30px" /> <div className="attachment-icon-holder"></div>{ticketData.fileName}</div></a> : <p>No Attachments</p>
                                    : null

                            }

                            {/* <div className="replies-wrapper">
                            <h1>Replies</h1>

                            {ticketReplies ?
                                ticketReplies.map((reply) => {

                                    return (
                                        <div className="reply-wrapper" key={reply.id}>
                                            {reply.text}
                                        </div>
                                    )
                                })
                                : console.log('nothing here')}
                        </div> */}

                        </div>

                    </div>
                </div >}
        </React.Fragment >
    )

}


export default TicketView;