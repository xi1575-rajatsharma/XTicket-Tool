import React, { Component } from 'react'
import { constants } from '../modules/constants'
import { fetch } from '../modules/httpServices';
import { cloneDeep } from 'lodash';

export default class TicketFilters extends Component {
    constructor(props) {
        super(props)
        this.state = {
            allTickets: [],
            statusData: {
                OPEN: 0,
                INPROGRESS: 0,
                AWAITING: 0,
                REVIEW: 0,
                ESCALATED: 0,
                REOPENED: 0,
                CLOSED: 0,
                RESOLVED: 0,
            },
        }
    }

    componentDidMount() {
        this.getTickets();
    }

    getTickets = () => {
        fetch.get({
            url: constants.SERVICE_URLS.TICKET_LISTING,
            requestParams: {
                page: 0,
                limit: 10000
            },
            callbackHandler: (response => {
                const { status, message, payload } = response;
                const _state = cloneDeep(this.state);

                _state.isLoading = false;
                if (status === constants.SUCCESS) {
                    _state.message = '';
                    _state.allTickets = cloneDeep(payload.result.tickets);
                }
                this.setState({ allTickets: _state.allTickets }, this.setStatus)
            }

            )
        })


    }
    setStatus = () => {
        this.state.allTickets ?
            this.state.allTickets.map((ticket) => {
                switch (ticket.status) {
                    case "OPEN":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.OPEN = statusData.OPEN + 1;
                            return { statusData };
                        });
                        break;
                    case "ASSIGNED":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.ASSIGNED = statusData.ASSIGNED + 1;
                            return { statusData };
                        });
                        break;
                    case "INPROGRESS":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.INPROGRESS = statusData.INPROGRESS + 1;
                            return { statusData };
                        });
                        break;
                    case "AWATING":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.AWATING = statusData.AWATING + 1;
                            return { statusData };
                        });
                        break;
                    case "REVIEW":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.REVIEW = statusData.REVIEW + 1;
                            return { statusData };
                        });
                        break;
                    case "ESCALATED":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.ESCALATED = statusData.ESCALATED + 1;
                            return { statusData };
                        });
                        break;
                    case "REOPENED":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.REOPENED = statusData.REOPENED + 1;
                            return { statusData };
                        });
                        break;
                    case "CLOSED":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.CLOSED = statusData.CLOSED + 1;
                            return { statusData };
                        });
                        break;
                    case "RESOLVED":
                        this.setState((prevState) => {
                            let statusData = Object.assign({}, prevState.statusData);
                            statusData.RESOLVED = statusData.RESOLVED + 1;
                            return { statusData };
                        });
                        break;
                    default:
                    // console.log("oops");
                }
            }) : this.setState({ ...this.state })
    }
    render() {
        return (
            <div className="ticketlistFilters">
                <>
                    <span className="ticketlistFilters--OPEN " onClick={() => { this.props.statusFilter("OPEN"); this.props.changeFilterSelectValue("OPEN") }}>Open:<span className="ticketlistFilters--value">{this.state.statusData.OPEN}</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
                    <span className="ticketlistFilters--INPROGRESS" onClick={() => { this.props.statusFilter("INPROGRESS"); this.props.changeFilterSelectValue("INPROGRESS") }}>Inprogress:<span className="ticketlistFilters--value">{this.state.statusData.INPROGRESS}</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <span className="ticketlistFilters--AWAITING" onClick={() => { this.props.statusFilter("AWAITING"); this.props.changeFilterSelectValue("AWAITING") }}>AWAITING:{console.log(this.state.statusData.AWAITING)}{this.state.statusData.AWAITING}</span>&nbsp;&nbsp; */}
                    {/* <span className="ticketlistFilters--REVIEW" onClick={() => { this.props.statusFilter("REVIEW"); this.props.changeFilterSelectValue("REVIEW") }}>REVIEW:{this.state.statusData.REVIEW}</span>&nbsp;&nbsp; */}
                    <span className="ticketlistFilters--ESCALATED" onClick={() => { this.props.statusFilter("ESCALATED"); this.props.changeFilterSelectValue("ESCALATED") }}>Escalated:<span className="ticketlistFilters--value">{this.state.statusData.ESCALATED}</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
                    {/* <span className="ticketlistFilters--CLOSED" onClick={() => { this.props.statusFilter("CLOSED"); this.props.changeFilterSelectValue("CLOSED") }}>CLOSED:{this.state.statusData.CLOSED}</span>&nbsp;&nbsp; */}
                    <span className="ticketlistFilters--REOPENED" onClick={() => { this.props.statusFilter("REOPENED"); this.props.changeFilterSelectValue("REOPENED") }}>Repoened:<span className="ticketlistFilters--value">{this.state.statusData.REOPENED}</span></span>&nbsp;&nbsp;&nbsp;
                    <span className="ticketlistFilters--RESOLVED" onClick={() => { this.props.statusFilter("RESOLVED"); this.props.changeFilterSelectValue("RESOLVED") }}>Resolved:<span className="ticketlistFilters--value">{this.state.statusData.RESOLVED}</span></span>&nbsp;&nbsp;&nbsp;&nbsp;
                </>
            </div>
        )
    }
}




// const TicketFilters = (payload) => {
//     const [ticketList, setTicketList] = useState([]);
//     const [OPEN, setOpenTickets] = useState(0);
//     const [INPROGRESS, setInprogressTickets] = useState(0);
//     const [AWAITING, setAwaitingTickets] = useState(0);
//     const [REVIEW, setReviewTickets] = useState(0);
//     const [ESCALATED, setEscalatedTickets] = useState(0);
//     const [CLOSED, setClosedTickets] = useState(0);
//     const [REOPENED, setReopenedTickets] = useState(0);
//     const [RESOLVED, setResolvedTickets] = useState(0);
//     useEffect(() => {
//         setTimeout(() => {
//             setTicketList(JSON.parse(window.localStorage.getItem('_listingData')));
//         }, 2000)

//     }, [])
//     return (
//         <div className="ticketlistFilters">
//             <>
//                 <span className="ticketlistFilters--OPEN">OPEN:10</span>&nbsp;&nbsp;
//                 <span className="ticketlistFilters--INPROGRESS">INPROGRESS:10</span>&nbsp;&nbsp;
//                 <span className="ticketlistFilters--AWAITING">AWAITING:10</span>&nbsp;&nbsp;
//                 <span className="ticketlistFilters--REVIEW">REVIEW:10</span>&nbsp;&nbsp;
//                 <span className="ticketlistFilters--ESCALATED">ESCALATED:10</span>&nbsp;&nbsp;
//                 <span className="ticketlistFilters--CLOSED">CLOSED:10</span>&nbsp;&nbsp;
//                 <span className="ticketlistFilters--REOPENED">REOPENED:10</span>&nbsp;&nbsp;
//                 <span className="ticketlistFilters--RESOLVED">RESOLVED:10</span>&nbsp;&nbsp;
//             </>
//         </div>
//     )
// }

// export default TicketFilters
