import React, { Component } from 'react';
import TicketListNav from '../Views/sidebarView';
import AddTicket from '../Views/addTicket';
import { constants } from '../modules/constants';
import { fetch } from '../modules/httpServices';

class Tickets extends Component {
    constructor(props) {
        super(props)
        this.state = {
            all_locations: null,
            all_departments: null,
            all_classifications: null,
            selectedLocation: null,
            selectedDepartment: null,
            selectedClassification: null,
            selectedSubIssue: null,
            subject: "",
            description: ""
        }
    }
    componentDidMount() {
        fetch.get({
            url: constants.SERVICE_URLS.TICKET_MASTER_DATA + 'locations',
            callbackHandler: (response) => {
                this.setState({ all_locations: response.payload.data })
            }
        })

        fetch.get({
            url: constants.SERVICE_URLS.TICKET_MASTER_DATA + 'departments',
            callbackHandler: (response) => {
                this.setState({ all_departments: response.payload.result });
            }
        })

        fetch.get({
            url: constants.SERVICE_URLS.TICKET_MASTER_DATA + 'classifications',
            callbackHandler: (response) => {
                this.setState({ all_classifications: response.payload.data });
            }
        })

    }

    onChangeHandler = (e) => {
        this.setState({ [e.target.id]: e.target.value });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();
        const { selectedLocation, selectedDepartment, selectedClassification, selectedSubIssue, subject, description } = this.state
        fetch.post({
            url: constants.SERVICE_URLS.TICKET_ADD,
            requestBody: {
                "locationId": selectedLocation,
                "departmentId": selectedDepartment,
                "subIssueId": selectedSubIssue,
                "classificationId": selectedClassification,
                "subject": subject,
                "description": description
            },
            callbackHandler: (response) => {
                console.log(response)
                this.props.history.push('/ticketlist')
            }
        })
    }
    render() {
        return (
            <div className="add-tickets-wrapper">
                {/* <TicketListNav /> */}
                <AddTicket
                    {...{
                        ...this.state,
                        onChangeHandler: this.onChangeHandler,
                        onSubmitHandler: this.onSubmitHandler
                    }} />
            </div>

        )
    }
}

export default Tickets;