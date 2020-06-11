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
            listingData: []
        }
    }

    componentDidMount() {
        this.getTicketData();
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
                console.log(response)

                if (status === constants.SUCCESS) {
                    _state.message = '';
                    _state.listingData = payload.result.tickets;
                    _state.listingData.sort((a, b) => a.id - b.id)
                    console.log(_state.listingData);
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
                <TestView {...this.state} />
            </React.Fragment>
        );

    }

}