import React from 'react';
import { Link } from 'react-router-dom';


const TableView = (payload) => {
    const { listingData, onChangeHandler, onSubmitHandler, viewAllTickets } = payload;



    return (
        <React.Fragment>
            <div className="filter-wrapper">
                <form onSubmit={onSubmitHandler}>
                    <span className="search-text-wapper"> SEARCH</span>
                    <input type="date" />
                    <span> to </span>
                    <input type="date" />
                    <input type="text" placeholder="Search for tickets..." onChange={(e) => onChangeHandler({ searchString: e.currentTarget.value })} />
                    <input type="submit" value="Search" />
                    <button id="view-tickets" type="button" onClick={viewAllTickets}> View All Tickets</button>
                </form>
            </div>
            <table className="ticketListingTable">
                <tbody>
                    <tr id="header-row">
                        <th>id</th>
                        <th>subject</th>
                        <th>displayName</th>
                        <th>Customer Responded Time</th>
                        <th>Due Date</th>
                        <th>status</th>
                        <th>assignedTo</th>
                    </tr>
                    {
                        listingData.map((ticket) => {
                            const creationTime = new Date(ticket.creationTime);
                            const dueOn = new Date(ticket.dueOn);
                            return (
                                <React.Fragment >

                                    <tr key={ticket.id}>

                                        <td><Link to={'/ticketlist/' + ticket.id} >{ticket.id}</Link></td>
                                        <td><Link to={'/ticketlist/' + ticket.id} >{ticket.subject}</Link></td>
                                        <td><Link to={'/ticketlist/' + ticket.id} >{ticket.displayName}</Link></td>
                                        <td><Link to={'/ticketlist/' + ticket.id} >{creationTime.toLocaleString()}</Link></td>
                                        <td><Link to={'/ticketlist/' + ticket.id} >{dueOn.toLocaleString()}</Link></td>
                                        <td><Link to={'/ticketlist/' + ticket.id} >{ticket.status}</Link></td>
                                        <td><Link to={'/ticketlist/' + ticket.id} >{ticket.assignedTo}</Link></td>
                                    </tr>

                                </React.Fragment>
                            )
                        })
                    }
                </tbody>
            </table>

        </React.Fragment >

    )
}

export default TableView;