import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import TicketView from '../Views/TikcetView';
import { fetch } from '../modules/httpServices'
import { constants } from '../modules/constants';
import axios from 'axios';
import FileSaver, { saveAs } from 'file-saver'

class TicketDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileSelects: null,
            img: null,
            ticketData: [],
            listingData: [],
            ticketReplies: [],
            allAdminUsers: [],
            ticketJourney: [],
            resolutionText: null,
            replyText: null,
            allStatus: [],
            isLoading: false,
            statusChangeLoading: false
        }
    }

    // componentWillUpdate(prevProps) {
    //     console.log(this.props)
    // }

    componentDidMount() {
        let id = this.props.match.params.ticket_id;
        this.getTicketInfo(id);
    }



    downloadFile = () => {

        axios({
            url: "http://3.7.115.94/ticket-tool/v1/tickets/preview?filepath=/home/ec2-user/helpdesk_deploy/UPLOAD/3/Screenshot from 2020-05-22 12-06-33.jpg_1590465234624",
            method: 'GET',
            responseType: "blob"
        }).then((response) => {
            console.log(response)
            FileSaver.saveAs(response.data, "hello.jpg");


        });
    }

    getTicketInfo = (id) => {



        this.setState({ isLoading: true }, () => {
            fetch.get({
                url: constants.SERVICE_URLS.TICKET_DETAILING + '/' + id,
                callbackHandler: (response) => {
                    const { status, message, payload } = response;
                    const _state = cloneDeep(this.state);

                    _state.isLoading = false;

                    if (status === constants.SUCCESS) {
                        _state.message = '';
                        _state.ticketData = payload.result.ticketDetails;
                    } else {
                        _state.message = message;
                    }
                    this.setState(_state);
                }
            })
        })

        this.setState({ isLoading: true }, () => {
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
            })
        })

        this.setState({ isLoading: true }, () => {
            fetch.get({
                url: constants.SERVICE_URLS.TICKET_REPLY + '/' + id + '/replies',
                callbackHandler: (response) => {

                    const { status, message, payload } = response;

                    const _state = cloneDeep(this.state);

                    if (status === constants.SUCCESS) {
                        _state.message = '';
                        _state.ticketReplies = payload.result.conversations;

                    } else {
                        _state.message = message;
                    }
                    this.setState({ ticketReplies: _state.ticketReplies });

                }
            })
        })

        this.setState({ isLoading: true }, () => {
            fetch.get({
                url: constants.SERVICE_URLS.TICKET_VIEW_ADMIN,
                callbackHandler: (response) => {
                    const { status, message, payload } = response;

                    const _state = cloneDeep(this.state);

                    if (status === constants.SUCCESS) {
                        _state.message = "";
                        _state.allAdminUsers = payload.data;

                    } else {
                        _state.message = message
                    }
                    this.setState({ allAdminUsers: _state.allAdminUsers })
                }
            })
        })

        this.setState({ isLoading: true }, () => {
            fetch.get({
                url: constants.SERVICE_URLS.TICKET_HISTORY + id + '/ticket-journey',
                callbackHandler: (response) => {
                    const { status, payload, message } = response;

                    const _state = cloneDeep(this.state);

                    if (status === constants.SUCCESS) {
                        _state.message = "";
                        _state.ticketJourney = payload.result.ticketJourneys;


                    } else {
                        _state.message = message;
                    }
                    this.setState({ ticketJourney: _state.ticketJourney })
                }
            })
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

    updateTicketData = (id) => {
        this.setState({ isLoading: true }, () => {
            fetch.get({
                url: constants.SERVICE_URLS.TICKET_DETAILING + '/' + id,
                callbackHandler: (response) => {
                    const { status, message, payload } = response;
                    const _state = cloneDeep(this.state);

                    _state.isLoading = false;

                    if (status === constants.SUCCESS) {
                        _state.message = '';
                        _state.ticketData = payload.result.ticketDetails;
                    } else {
                        _state.message = message;
                    }
                    this.setState(_state);
                }
            })
        })
    }

    changeSelectValue = (selectValue, ticketStatus) => {
        if (ticketStatus === "CLOSED") {
            alert('Cannot change assigned role the ticket is closed!');
        } else {

            const id = this.props.match.params.ticket_id;
            this.setState({ statusChangeLoading: true }, () => {
                fetch.put({
                    url: constants.SERVICE_URLS.TICKET_ASSIGN + '/' + id + '?emailId=' + selectValue,
                    callbackHandler: (response) => {
                        console.log(response);
                        fetch.get({
                            url: constants.SERVICE_URLS.TICKET_DETAILING + '/' + id,
                            callbackHandler: (response) => {
                                const { status, message, payload } = response;
                                const _state = cloneDeep(this.state);

                                this.setState({ statusChangeLoading: false })
                                if (status === constants.SUCCESS) {
                                    _state.message = '';
                                    _state.ticketData = payload.result.ticketDetails;
                                } else {
                                    _state.message = message;
                                }
                                this.setState({ ticketData: _state.ticketData });
                            }
                        })
                    }
                })
            })


        }

    }

    changeStatusValue = (statusValue) => {
        const id = this.props.match.params.ticket_id;

        this.setState({ statusChangeLoading: true }, () => {
            fetch.put({
                url: constants.SERVICE_URLS.TICKET_STATUS + id + '/change-status?status=' + statusValue,
                callbackHandler: (response) => {
                    // window.location.reload();
                    this.setState({ statusChangeLoading: false });
                    fetch.get({
                        url: constants.SERVICE_URLS.TICKET_DETAILING + '/' + id,
                        callbackHandler: (response) => {
                            const { status, message, payload } = response;
                            const _state = cloneDeep(this.state);

                            _state.isLoading = false;

                            if (status === constants.SUCCESS) {
                                _state.message = '';
                                _state.ticketData = payload.result.ticketDetails;
                            } else {
                                _state.message = message;
                            }
                            this.setState({ ticketData: _state.ticketData });
                        }
                    })

                    fetch.get({
                        url: constants.SERVICE_URLS.TICKET_HISTORY + id + '/ticket-journey',
                        callbackHandler: (response) => {
                            const { status, payload, message } = response;

                            const _state = cloneDeep(this.state);

                            if (status === constants.SUCCESS) {
                                _state.message = "";
                                _state.ticketJourney = payload.result.ticketJourneys;


                            } else {
                                _state.message = message;
                            }
                            this.setState({ ticketJourney: _state.ticketJourney })
                        }
                    })


                }
            })
        })


    }
    statusHandler = () => {

        const id = this.props.match.params.ticket_id;
        this.setState({ statusChangeLoading: true }, () => {
            fetch.put({
                url: constants.SERVICE_URLS.TICKET_STATUS + id + '/change-status?status=CLOSED',
                callbackHandler: (response) => {
                    // window.location.reload();
                    fetch.get({
                        url: constants.SERVICE_URLS.TICKET_DETAILING + '/' + id,
                        callbackHandler: (response) => {
                            const { status, message, payload } = response;
                            const _state = cloneDeep(this.state);

                            this.setState({ statusChangeLoading: false })
                            if (status === constants.SUCCESS) {
                                _state.message = '';
                                _state.ticketData = payload.result.ticketDetails;
                            } else {
                                _state.message = message;
                            }
                            this.setState({ ticketData: _state.ticketData });
                        }
                    })
                }
            })
        })

    }

    fileSelect = (e) => {
        let files = e.target.files;

        // let reader = new FileReader();
        // reader.readAsDataURL(files[0]);
        // reader.onload = (e) => {
        //     console.log(e.target.result)
        // }
        this.setState({ fileSelects: files[0] })


    }
    replyChangeHandler = (replyText) => {
        this.setState({ replyText: replyText });
    }


    replySubmitHandler = (replyOrComment) => {
        axios.interceptors.request.use(function (config) {
            const token = window.localStorage.getItem('_token');

            config.headers['x-access-channel'] = 'ANDROID';
            config.headers['Content-Type'] = 'application/json';

            if (token != null) {
                config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
        }, function (err) {

            return Promise.reject(err);

        });


        const id = this.props.match.params.ticket_id;
        const url = '/' + id + '/replies';
        const request = JSON.stringify({
            text: this.state.replyText,
            conversationType: "Reply",
            mailRecepients: this.state.ticketData.emailId
        });
        const bodyFOrmData = new FormData();


        bodyFOrmData.append('request', request);
        bodyFOrmData.append('file', this.state.fileSelects)
        // bodyFOrmData.set('conversationType', "Reply");
        // bodyFOrmData.set('mailRecepients', this.state.ticketData.emailId);
        if (replyOrComment === "reply") {
            this.setState({ statusChangeLoading: true }, () => {

                axios({
                    method: 'post',
                    url: constants.SERVICE_URLS.TICKET_REPLY + url,
                    data: bodyFOrmData
                })
                    .then((response) => {
                        console.log(response)
                        this.setState({ statusChangeLoading: false })
                    })
            })
        } else {
            this.setState(() => {
                fetch.post({
                    url: constants.SERVICE_URLS.TICKET_REPLY + url,
                    requestBody: {
                        text: this.state.replyText,
                        conversationType: "comment"
                    },
                    callbackHandler: (response) => {
                        console.log(response);
                        const { status, message, payload } = response;
                        const _state = cloneDeep(this.state);

                        if (status === constants.SUCCESS) {
                            _state.message = message;
                            window.location.reload();
                        }
                    }
                })
            })
        }
    }

    resolutionChangeHandler = (resolutionText) => {
        this.setState({ resolutionText: resolutionText })
    }

    resolutionSubmitHandler = (e) => {
        e.preventDefault();
        const id = this.props.match.params.ticket_id;
        if (this.state.resolutionText === null) {
            alert("Resolution can't be empty!")
        } else {
            this.setState({ statusChangeLoading: true }, () => {
                fetch.post({
                    url: constants.SERVICE_URLS.TICKET_RESOLUTION + id + '/resdfbnolution',
                    requestBody: {
                        text: this.state.resolutionText
                    },
                    callbackHandler: (response) => {
                        this.setState({ statusChangeLoading: false });
                        console.log(response);
                        fetch.get({
                            url: constants.SERVICE_URLS.TICKET_DETAILING + '/' + id,
                            callbackHandler: (response) => {
                                const { status, message, payload } = response;
                                const _state = cloneDeep(this.state);

                                _state.isLoading = false;

                                if (status === constants.SUCCESS) {
                                    _state.message = '';
                                    _state.ticketData = payload.result.ticketDetails;
                                } else {
                                    _state.message = message;
                                }
                                this.setState(_state);
                            }
                        })
                    }
                })
            })

        }
    }


    render() {
        return (
            <TicketView
                {...this.state}
                toggleReplyDisplay={this.toggleReplyDisplay}
                changeSelectValue={this.changeSelectValue}
                changeStatusValue={this.changeStatusValue}
                resolutionSubmitHandler={this.resolutionSubmitHandler}
                resolutionChangeHandler={this.resolutionChangeHandler}
                statusHandler={this.statusHandler}
                replyChangeHandler={this.replyChangeHandler}
                replySubmitHandler={this.replySubmitHandler}
                updateTicketData={this.updateTicketData}
                fileSelect={this.fileSelect}
                downloadFile={this.downloadFile}
            />

        )
    }
}

export default TicketDetails;


/*


                fetch.post({
                    url: constants.SERVICE_URLS.TICKET_REPLY + url,
                    requestBody: {
                        // file: this.state.fileSelects,
                        text: this.state.replyText,
                        conversationType: "Reply",
                        mailRecepients: this.state.ticketData.emailId
                    },
                    callbackHandler: (response) => {
                        this.setState({ statusChangeLoading: false })
                        const { status, message, payload } = response;
                        const _state = cloneDeep(this.state);
                        console.log(response)
                        if (status === constants.SUCCESS) {
                            _state.message = message;
                            // window.location.reload();
                            fetch.get({
                                url: constants.SERVICE_URLS.TICKET_REPLY + '/' + id + '/replies',
                                callbackHandler: (response) => {

                                    const { status, message, payload } = response;

                                    const _state = cloneDeep(this.state);

                                    if (status === constants.SUCCESS) {
                                        _state.message = '';
                                        _state.ticketReplies = payload.result.conversations;

                                    } else {
                                        _state.message = message;
                                    }
                                    this.setState({ ticketReplies: _state.ticketReplies });

                                }
                            })
                        }
                    }
                })*/