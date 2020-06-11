import React, { Component } from 'react';
import TicketListNav from '../views/headerView';
import TicketListColumn from '../views/sidebarView';
import TicketListView from '../views/ticketListingView';
import axios from 'axios';


class TicketList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            post: null
        }
    }

    componentDidMount() {
        // console.log(window.localStorage.getItem('Token'));
        const token = window.localStorage.getItem('Token');

        // console.log({token})
        const headers = {
            'Authorization': `Bearer ${token}`,
            'x-access-channel': 'WEB'
        }

        axios.get('https://xdesk.herokuapp.com/ticket-tool/v1/tickets?page=0&limit=2', { headers })
            .then(response => {
                console.log(response.data.result);
                this.setState({ post: response.data.result });

            })
            .catch(error => {
                console.log(error)
            })

    }

    individualTicketWrapper = () => {

        const posts = this.state;
        const postList = posts.length();
        console.log(postList);

    }

    render() {
        return (
            <TicketListView />
        )
    }
}

export default TicketList;