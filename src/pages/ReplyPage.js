import React, { Component } from 'react';
import TicketReplyNav from '../Views/ticketReplyNav';
import TicketReplyBottomContainer from '../Views/ticketReplyBottomContainer';
import { fetch } from '../modules/httpServices';
import { constants } from '../modules/constants';
import { cloneDeep } from 'lodash';


class Reply extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            ticket_id: 0,
            replies: [],
            ticketData: [],
            commentReply: "reply"
        }
    }

    componentDidMount() {
        const id = this.props.match.params.ticket_id
        this.getTicketInfo(id);
    }


    getTicketInfo = (id) => {
        fetch.get({
            url: constants.SERVICE_URLS.TICKET_REPLY + '/' + id + '/replies',
            callbackHandler: (response) => {
                const { status, message, payload } = response;
                const _state = cloneDeep(this.state)
                if (status === constants.SUCCESS) {
                    _state.message = '';
                    _state.replies = payload.result.conversations;
                } else {
                    _state.message = message;
                }
                this.setState({ replies: _state.replies })
            }
        })

        fetch.get({
            url: constants.SERVICE_URLS.TICKET_DETAILING + '/' + id,
            callbackHandler: (response) => {
                const { status, message, payload } = response;
                const _state = cloneDeep(this.state);
                console.log(response)
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

    // timestampToDate = () => {
    //     const creationTime = new Date(this.state.ticketData.creationTime);
    //     const dueOn = new Date(this.state.ticketData.dueOn)

    //     var month = new Array();
    //     month[0] = "January";
    //     month[1] = "February";
    //     month[2] = "March";
    //     month[3] = "April";
    //     month[4] = "May";
    //     month[5] = "June";
    //     month[6] = "July";
    //     month[7] = "August";
    //     month[8] = "September";
    //     month[9] = "October";
    //     month[10] = "November";
    //     month[11] = "December";

    //     const creationMonth = month[creationTime.getMonth()];
    //     const dueOnMonth = month[dueOn.getMonth()];
    //     console.log(creationMonth)
    // }

    handleChange = (text) => {
        this.setState({ text: text });
    }


    handleCommentReply = (commentReply) => {
        this.setState({ commentReply: commentReply })
    }


    handleSubmit = (commentReply) => {

        console.log(commentReply);
        const ticket_id = this.props.match.params.ticket_id;
        const url = '/' + ticket_id + '/replies';
        this.setState({ ticket_id: ticket_id });
        const { text, ticketData } = this.state;
        commentReply === "reply" ?
            this.setState(() => {
                fetch.post({
                    url: constants.SERVICE_URLS.TICKET_REPLY + url,
                    requestBody: {
                        text: text,
                        conversationType: "Reply",
                        mailRecepients: ticketData.emailId
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
            }) :
            this.setState(() => {
                fetch.post({
                    url: constants.SERVICE_URLS.TICKET_REPLY + url,
                    requestBody: {
                        text: text,
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

    render() {
        return (
            <div className="Ticket-Reply-Container">
                <TicketReplyNav />
                <TicketReplyBottomContainer
                    handleChange={this.handleChange}
                    handleSubmit={this.handleSubmit}
                    {...this.state}
                    props={this.props}
                    handleCommentReply={this.handleCommentReply}
                />
            </div>

        )
    }
}

export default Reply;