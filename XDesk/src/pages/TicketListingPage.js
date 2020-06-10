import React from 'react';
import { cloneDeep } from 'lodash';
import { constants } from '../modules/constants';
import { fetch } from '../modules/httpServices';
import TestView from '../Views/TestView';
import { ticketListingView as TicketListingView } from '../Views/ticketListingView';
import { sidebarView } from '../Views/sidebarView'

export default class TicketListingPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            listingData: [],
            searchString: null
        }
    }

    componentDidMount() {
        this.getTicketData();
    }
    onSubmitHandler = (e) => {
        e.preventDefault();
        let filterListingDate = [...this.state.listingData]
        this.state.searchString ?
            filterListingDate = filterListingDate.filter(status => status.subject.toLowerCase().includes(this.state.searchString.toLowerCase())) :
            alert("Please add an input in the search field!")
        this.setState({ ...this.state, listingData: filterListingDate })
    }
    onChangeHandler = (change) => {
        this.setState({ ...this.state, ...change })
    }

    viewAllTickets = () => {
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

                } else {
                    _state.message = message;
                }
                this.setState(_state);

            }
        });
    }

    render() {
        return (
            <React.Fragment>

                {/* <TicketListingView
                    {...this.state}
                /> */}
                <TestView
                    {...this.state}
                    onChangeHandler={this.onChangeHandler}
                    onSubmitHandler={this.onSubmitHandler}
                    viewAllTickets={this.viewAllTickets}
                />
            </React.Fragment >
        );

    }

}