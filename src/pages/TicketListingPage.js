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
                <TestView {...this.state} />
            </React.Fragment>
        );

    }

}