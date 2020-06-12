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
            allStatus: null
        }
    }

    componentDidMount() {
        this.getTicketData();
    }
    filterTickets = (fromDate, toDate) => {
        // this.getTicketData();
        fetch.get({
            url: constants.SERVICE_URLS.TICKET_LISTING,
            requestParams: {
                page: 0,
                limit: 50
            },
            callbackHandler: (response) => {
                const { status, message, payload } = response;
                const _state = cloneDeep(this.state);
                _state.isLoading = false;

                if (status === constants.SUCCESS) {
                    _state.message = '';
                    _state.listingData = payload.result.tickets;
                    _state.listingData.sort((a, b) => a.id - b.id)
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
        fetch.get({
            url: constants.SERVICE_URLS.TICKET_LISTING,
            requestParams: {
                page: 0,
                limit: 50
            },
            callbackHandler: (response) => {
                const { status, message, payload } = response;
                const _state = cloneDeep(this.state);
                _state.isLoading = false;

                if (status === constants.SUCCESS) {
                    _state.message = '';
                    _state.listingData = payload.result.tickets;
                    _state.listingData.sort((a, b) => a.id - b.id)
                    // window.localStorage.setItem('_listingData', _state.listingData)
                    // _state.listingData = _state.listingData.filter(ticket => ticket.creationTime > fromDate && ticket.creationTime < toDate)
                    if (id === "Subject") {
                        _state.listingData = _state.listingData.filter(ticket => ticket.subject.toLowerCase().includes(filterString.toLowerCase()))
                    } if (id === "employeeName") {
                        _state.listingData = _state.listingData.filter(ticket => ticket.displayName === filterString)
                        // console.log(_state.listingData)
                    }
                } else {
                    _state.message = message;
                }

                this.setState(_state);

            }
        });

    }

    getTicketData = () => {
        fetch.get({
            url: constants.SERVICE_URLS.TICKET_LISTING,
            requestParams: {
                page: 0,
                limit: 50
            },
            callbackHandler: (response) => {
                const { status, message, payload } = response;
                const _state = cloneDeep(this.state);
                _state.isLoading = false;


                if (status === constants.SUCCESS) {
                    _state.message = '';
                    _state.listingData = payload.result.tickets;
                    _state.listingData.sort((a, b) => a.id - b.id)
                    // window.localStorage.setItem('_listingData', _state.listingData)

                } else {
                    _state.message = message;
                }

                this.setState(_state);

            }
        });

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

    render() {
        return (
            <React.Fragment>
                <TestView {...this.state}
                    filterTickets={this.filterTickets}
                    searchByFilter={this.searchByFilter} />
            </React.Fragment>
        );

    }

}