import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import FilterView from './filterView';
import SelectedFilterView from './selectedFilterView';
import Xenie from '../images/Xenie.png'
import icon from '../images/newIcon.png'


export default class TestView extends Component {
    constructor(props) {
        super(props)
        this.state = {
            display: "none",
            fromDate: null,
            toDate: null,
            filterString: null,
            selectValue: "OPEN",
            xenieButton: "history-btn btn-regal-blue",
            zohoButton: "history-btn btn-white"
        }
    }
    onFromDateChange = (value) => {
        this.setState({ fromDate: (new Date(value)).getTime() })
    }
    onToDateChange = (value) => {
        this.setState({ toDate: (new Date(value)).getTime() })
    }
    onInputChange = (value) => {
        this.setState(value)
    }

    onDateSubmit = (e) => {
        e.preventDefault();
        this.props.filterTickets(this.state.fromDate, this.state.toDate)
    }
    onInputSubmit = (id) => {

        this.props.searchByFilter();
        this.props.searchByFilter(id, this.state.filterString)
    }

    render() {
        const allStatus = this.props.allStatus;
        let listingData = this.props.listingData;
        const resetPassword = this.props.resetPassword;

        return (
            <React.Fragment>
                {resetPassword === "false" ?
                    <div className="reset__popup">

                        <div className="reset__popup--info">
                            <span className="reset__popup--close" onClick={this.props.changeresetPasswordtoTrue}>X</span>
                            <div className="reset__popup--icon-wrapper">
                                <img src={icon} alt="Xenie Icon" className="reset__popup--icon" />
                            </div>
                            <p className="reset__popup--info-text">
                                We recommend you to change your existing password. You have logged in as admin and we want you to keep your account safe. Click Here to &rarr; <Link to='/reset-password'> 'change password'.</Link>
                            </p>
                        </div>
                    </div> : null
                }

                <div className="filters-wrapper">
                    <div className="filters-left-wrapper">
                        <select value={this.state.selectValue} className="filter-select" onChange={(e) => { this.props.statusFilter(e.target.value); this.setState({ display: e.currentTarget.value, selectValue: e.currentTarget.value }) }} >
                            <option value="All-tickets">ALL Tickets</option>
                            {allStatus ?
                                <FilterView allStatus={allStatus} />
                                : null
                            }
                            <optgroup label="Other Filters">
                                <option value="Date" >Filter Between Dates</option>
                                <option value="Subject">Filter By subject</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className="filters-right-wrapper">
                        <SelectedFilterView display={this.state.display} onFromDateChange={this.onFromDateChange} onToDateChange={this.onToDateChange} onDateSubmit={this.onDateSubmit} onInputSubmit={this.onInputSubmit} onInputChange={this.onInputChange} />

                        <a onClick={() => { this.props.getTicketData(); this.setState({ selectValue: "OPEN", xenieButton: "history-btn btn-regal-blue", zohoButton: "history-btn btn-white" }) }} className={this.state.xenieButton} href="#">Xenie Tickets</a>
                        <a onClick={() => { this.props.getZohoTicketData(); this.setState({ selectValue: "OPEN", xenieButton: "history-btn btn-white", zohoButton: "history-btn btn-regal-blue" }) }} className={this.state.zohoButton} href="#">Tickets From Zoho</a>
                    </div>
                    {/* <a className="history-btn btn-regal-blue" href="#">Tickets From Zoho</a> */}

                </div>
                <table className="ticketListingTable">
                    <thead>
                        <tr id="header-row">
                            <th>id</th>
                            <th>subject</th>
                            <th>Ticket Raiser</th>
                            <th>Created on</th>
                            <th>Due Date</th>
                            <th>status</th>
                            <th>assigned To</th>
                        </tr>
                    </thead>

                    <tbody>
                        {
                            this.props.view === "Xenie" ?
                                listingData ? listingData.length === 0 ? <tr className="no-updates-row"><td></td><td></td><td></td><td>--No tickets here--</td><td></td><td></td><td></td></tr> :
                                    listingData.map((ticket) => {
                                        const creationTime = new Date(ticket.creationTime);
                                        const dueOn = new Date(ticket.dueOn);
                                        return (
                                            <React.Fragment key={ticket.id} >
                                                <tr key={ticket.id}>
                                                    <td><Link to={'/ticketlist/' + ticket.id} >{ticket.id}</Link></td>
                                                    <td><Link to={'/ticketlist/' + ticket.id} >{ticket.subject}</Link></td>
                                                    <td><Link to={'/ticketlist/' + ticket.id} >{ticket.displayName}</Link></td>
                                                    <td><Link to={'/ticketlist/' + ticket.id} >{creationTime.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })}</Link></td>
                                                    <td><Link to={'/ticketlist/' + ticket.id} >{dueOn.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })}</Link></td>
                                                    <td><Link to={'/ticketlist/' + ticket.id} >{ticket.status}</Link></td>
                                                    <td><Link to={'/ticketlist/' + ticket.id} >{ticket.assignedTo}</Link></td>
                                                </tr>
                                            </React.Fragment>
                                        )
                                    }) : <p>NO tickets here</p> :
                                listingData ? listingData.length === 0 ? <tr className="no-updates-row"><td></td><td></td><td></td><td>--No tickets here--</td><td></td><td></td><td></td></tr> :
                                    listingData.map((ticket) => {
                                        const creationTime = new Date(ticket.creationTime);
                                        const dueOn = new Date(ticket.dueOn);
                                        return (
                                            <React.Fragment key={ticket.id} >
                                                <tr key={ticket.id}>
                                                    <td>{ticket.id}</td>
                                                    <td>{ticket.subject}</td>
                                                    <td>{ticket.displayName}</td>
                                                    <td>{creationTime.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                                                    <td>{dueOn.toLocaleString([], { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit', year: '2-digit' })}</td>
                                                    <td>{ticket.status}</td>
                                                    <td>{ticket.assignedTo}</td>

                                                </tr>

                                            </React.Fragment>
                                        )
                                    }) : <p>NO tickets here</p>
                        }
                    </tbody>
                </table>
            </React.Fragment >
        )
    }
}







// const TableView = (payload) => {
//     const { listingData, allStatus } = payload;
//     const [display, inputDispay] = useState('none')


//     return (


//     )
// }

