import React from 'react';
import { Link } from 'react-router-dom';



export const ticketListingView = (payload) => {

    const { listingData } = payload;

    return (
        <div className="ticket-container">

            <div className="ticket-container-nav">
                <div className="select-all-checkbox">
                    <input type="checkbox" />
                </div>
                <div className="headings-wrapper">
                    <div className="ticket-id-wrapper">
                        Ticket ID
                    </div>
                    <div className="subject-wrapper">
                        subject
                    </div>
                    <div className="contact-name-wrapper">
                        Contact Name
                    </div>
                    <div className="customer-responded-time-wrapper">
                        Customer Responded Time
                    </div>
                    <div className="Due-date-wrapper">
                        Due Date
                    </div>
                    <div className="Status-wrapper">
                        Status
                    </div>
                    <div className="Ticket-owner-wrapper">
                        Ticket Owner
                    </div>
                    <div className="Channel-wrapper">
                        Channel
                    </div>
                </div>
            </div>

            {

                listingData.map((list) => {
                    const creationTime = new Date(list.creationTime);
                    const dueOn = new Date(list.dueOn);
                    return (
                        <Link to={'/ticketlist/' + list.id}> <div className="ticket-table-info-wrapper" key={list.id}>
                            <div className="select-all-checkbox">
                                <input type="checkbox" />
                            </div>

                            <div className="ticket-id-wrapper">
                                {list.id}
                            </div>
                            <div className="subject-wrapper">
                                {list.subject}
                            </div>
                            <div className="contact-name-wrapper">
                                {list.displayName}
                            </div>
                            <div className="customer-responded-time-wrapper">
                                {creationTime.toLocaleString()}
                            </div>
                            <div className="Due-date-wrapper">
                                {dueOn.toLocaleString()}
                            </div>
                            <div className="Status-wrapper">
                                {list.status}
                            </div>
                            <div className="Ticket-owner-wrapper">
                                {list.assignedTo}
                            </div>
                            <div className="Channel-wrapper">
                                {list.channel}
                            </div>
                        </div>
                        </Link>
                    );

                })

            }

        </div >
    )
}

