import React, { Component } from 'react';
import { cloneDeep } from 'lodash';
import TicketView from '../Views/TikcetView';
import { fetch } from '../modules/httpServices'
import { constants } from '../modules/constants';
import CommentModel from '../Views/addCommentModel';
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
            showModal: false,
            allTicketDetails: [],
            comment: '',
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





    getTicketInfo = (id) => {

        this.setState({ isLoading: true }, () => {
            fetch.get({
                url: constants.SERVICE_URLS.TICKET_DETAILING,
                callbackHandler: (response) => {

                    const { status, message, payload } = response;
                    const _state = cloneDeep(this.state);
                    _state.isLoading = false;

                    if (status === constants.SUCCESS) {
                        _state.message = '';
                        _state.allTicketDetails = payload;
                    } else {
                        _state.message = message;
                    }
                    this.setState(_state);
                }
            })
        })

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
                url: constants.SERVICE_URLS.TICKET_REPLY + id,
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
                url: constants.SERVICE_URLS.TICKET_HISTORY + id,
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
                    this.getTicketInfo(id)
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
    toggleCommentModal = () => {
        this.setState((prevState) => ({ showModal: !prevState.showModal, comment: '' }))
    }
    handleCommentChange = ({ target: { value } }) => {
        this.setState({ comment: value })
    }
    changeSelectValue = (selectValue, ticketStatus) => {
        this.toggleCommentModal();
        this.setState({
            selectValue: selectValue,
            ticketStatus: ticketStatus
        })
    }
    handleAddComment = () => {
        const { selectValue = null, ticketStatus = null } = this.state;
        if (ticketStatus !== "OPEN" && ticketStatus !== "REOPEND") {
            alert('You cannot changed assigned role at this status!');
        }
        else {
            const id = this.props.match.params.ticket_id;
            this.setState({ statusChangeLoading: true }, () => {
                fetch.put({
                    url: constants.SERVICE_URLS.TICKET_ASSIGN + id + '?emailId=' + selectValue,
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
                });
                this.toggleCommentModal();
            })
        }

    }
    changeStatusValue = (statusValue) => {
        const id = this.props.match.params.ticket_id;

        this.setState({ statusChangeLoading: true }, () => {
            fetch.put({
                url: constants.SERVICE_URLS.TICKET_STATUS + id + '?status=' + statusValue,
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
                        url: constants.SERVICE_URLS.TICKET_HISTORY + id,
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
                url: constants.SERVICE_URLS.TICKET_STATUS + id + '?status=CLOSED',
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
        if (this.state.replyText === null) {
            alert("Reply field can't be empty!")
        } else {
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
                        url: constants.SERVICE_URLS.TICKET_REPLY + id,
                        data: bodyFOrmData
                    })
                        .then((response) => {
                            console.log(response)
                            this.setState({ statusChangeLoading: false })
                            this.setState({ isLoading: true }, () => {
                                fetch.get({
                                    url: constants.SERVICE_URLS.TICKET_REPLY + id,
                                    callbackHandler: (response) => {
                                        this.setState({ isLoading: false })
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
                        })
                })
            } else {
                const bodyFOrmData = new FormData();
                const request = JSON.stringify({
                    text: this.state.replyText,
                    conversationType: "Comment"
                })
                bodyFOrmData.append('request', request)
                axios({
                    method: 'post',
                    url: constants.SERVICE_URLS.TICKET_REPLY + id,
                    data: bodyFOrmData
                })
                    .then((response) => {
                        console.log(response)
                        this.setState({ statusChangeLoading: false })
                        this.setState({ isLoading: true }, () => {
                            fetch.get({
                                url: constants.SERVICE_URLS.TICKET_REPLY + id,
                                callbackHandler: (response) => {
                                    this.setState({ isLoading: false })
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
                    })

            }
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
                    url: constants.SERVICE_URLS.TICKET_RESOLUTION + id,
                    requestBody: {
                        text: this.state.resolutionText
                    },
                    callbackHandler: (response) => {
                        this.setState({ statusChangeLoading: false });

                        fetch.put({
                            url: constants.SERVICE_URLS.TICKET_STATUS + id + "?status=RESOLVED",
                            callbackHandler: (resonse) => {
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
                                    url: constants.SERVICE_URLS.TICKET_HISTORY + id,
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

                    }
                })
            })

        }
    }
    onFeedBackSubmit = (starRating, feedBackDescription) => {
        const id = this.props.match.params.ticket_id;
        if (feedBackDescription === '') {
            alert('Please add a description')
        } else {
            fetch.post({
                url: constants.SERVICE_URLS.GIVE_FEEDBACK + id,
                requestBody: {
                    body: feedBackDescription,
                    rating: starRating
                },
                callbackHandler: (response) => {
                    console.log(response)
                }
            })
        }

    }


    render() {
        const { showModal, comment } = this.state;
        return (
            <>
                <CommentModel
                    showModal={showModal}
                    toggleModal={this.toggleCommentModal}
                    handleChange={this.handleCommentChange}
                    comment={comment}
                    handleAddComment={this.handleAddComment} />
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
                    onFeedBackSubmit={this.onFeedBackSubmit}
                />

            </>
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
                })

                this.setState(() => {
                fetch.post({
                    url: constants.SERVICE_URLS.TICKET_REPLY + id,
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



                */