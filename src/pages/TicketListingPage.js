import React from 'react';
import { cloneDeep } from 'lodash';
import { constants } from '../modules/constants';
import { fetch } from '../modules/httpServices';
import TestView from '../Views/TestView';

export default class TicketListingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listingData: [],
            zohoTicketData: [],
            allStatus: null,
            view: "Xenie",
            resetPassword: "",
            viewResetPopup: true
        }
    }

    componentDidMount() {
        this.getTicketData();
        const _resetPassword = { resetPassword: window.localStorage.getItem('_resetPassword') }
        this.setState({ ...this.state, ..._resetPassword })
        // setTimeout(() => {
        //     if (resetPassword === "false") alert("We advice you to change your password")
        // }, 1000)

    }
    filterTickets = (fromDate, toDate) => {
        // this.getTicketData();
        fetch.get({
            url: constants.SERVICE_URLS.TICKET_LISTING,
            requestParams: {
                page: 1,
                limit: 50
            },
            callbackHandler: (response) => {
                const { status, message, payload } = response;
                const _state = cloneDeep(this.state);
                _state.isLoading = false;

                if (status === constants.SUCCESS) {
                    _state.message = '';
                    _state.listingData = payload.result.tickets;
                    // _state.listingData.sort((a, b) => a.id - b.id)
                    // window.localStorage.setItem('_listingData', _state.listingData)
                    _state.listingData = _state.listingData.filter(ticket => ticket.creationTime > fromDate && ticket.creationTime < toDate)

                } else {
                    _state.message = message;
                }

                this.setState(_state);

            }
        });

        // console.log(window.localStorage.getItem('_listingData'))
    }
    searchByFilter = (id, filterString) => {
        const _listingData = JSON.parse(window.localStorage.getItem('_listingData'))
        this.setState({ _listingData: _listingData });

        if (id === "Subject") {
            this.setState({ listingData: _listingData.filter(ticket => ticket.subject.toLowerCase().includes(filterString.toLowerCase())) })
        }
        else if (id === "employeeName") {
            if (filterString !== '') {
                this.setState({ listingData: _listingData.filter(ticket => ticket.displayName === filterString) })
            } else {
                this.setState({ listingData: _listingData })
            }
        }
    }
    statusFilter = (value) => {
        if (value !== "Date" && value !== "Subject" && value !== "Name") {
            const _listingData = JSON.parse(window.localStorage.getItem('_listingData'));

            if (value === "All-tickets") {
                this.setState({ listingData: _listingData })
            } else {
                this.setState({ listingData: _listingData ? _listingData.filter(ticket => ticket.status === value) : null })
            }
        }
    }
    getZohoTicketData = () => {
        this.setState({ listingData: this.state.zohoTicketData.filter(ticket => ticket.status === "OPEN"), view: "Zoho" })
        window.localStorage.setItem('_listingData', JSON.stringify(this.state.zohoTicketData))
    }
    getTicketData = () => {
        fetch.get({
            url: constants.SERVICE_URLS.TICKET_LISTING,
            requestParams: {
                page: 0,
                limit: 1000
            },
            callbackHandler: (response) => {
                const { status, message, payload } = response;
                const _state = cloneDeep(this.state);
                _state.isLoading = false;


                if (status === constants.SUCCESS) {
                    _state.message = '';
                    _state.listingData = cloneDeep(payload.result.tickets);
                    // _state.listingData.sort((a, b) => b.id - a.id)

                    window.localStorage.setItem('_listingData', JSON.stringify(_state.listingData))
                    _state.listingData = _state.listingData.filter(ticket => ticket.status === "OPEN")
                    _state.view = "Xenie"

                } else {
                    _state.message = message;
                }

                this.setState(_state);

            }
        });


        fetch.get({
            url: constants.SERVICE_URLS.ZOHO_TICKET_LISTING,
            requestParams: {
                page: 0,
                limit: 1000
            },
            callbackHandler: (response) => {
                const { message, status, payload } = response;

                if (status === constants.SUCCESS) {
                    payload.result.tickets = payload.result.tickets.sort((a, b) => b.id - a.id)
                    this.setState({ zohoTicketData: payload.result.tickets })

                }
            }
        })

        this.setState({ isLoading: true }, () => {
            fetch.get({
                url: constants.SERVICE_URLS.GET_TICKET_STATUS,
                callbackHandler: (response) => {
                    const { message, status, payload } = response;
                    const _state = cloneDeep(this.state);

                    if (status === constants.SUCCESS) {
                        _state.message = "";
                        _state.allStatus = payload.data;
                    } else {
                        _state.message = message;
                    }
                    this.setState({ allStatus: _state.allStatus })
                }
            })

        })
    }
    changeresetPasswordtoTrue = () => {
        this.setState({ resetPassword: "true" })
        window.localStorage.setItem('_resetPassword', true);
    }

    render() {
        return (
            <React.Fragment>
                <TestView {...this.state}
                    filterTickets={this.filterTickets}
                    searchByFilter={this.searchByFilter}
                    statusFilter={this.statusFilter}
                    getTicketData={this.getTicketData}
                    getZohoTicketData={this.getZohoTicketData}
                    changeresetPasswordtoTrue={this.changeresetPasswordtoTrue}
                />

            </React.Fragment>
        );

    }

}