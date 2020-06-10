import React from 'react';
import { cloneDeep } from 'lodash';
import { constants } from '../modules/constants';
import { fetch } from '../modules/httpServices';
import { loginView as LoginView } from '../Views/loginView';
import { loginPages as LoginPages } from '../Views/loginPage';

export default class LoginPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoading: false,
            email: '',
            password: '',
            isValid: true
        };
    }

    componentDidMount() {
        this.redirectTicketList();
    }


    onInputChange = (payload) => {
        this.setState({ ...this.state, ...payload });
    }

    onSubmitHandler = (e) => {
        e.preventDefault();

        const { email, password } = this.state;

        this.setState({ isLoading: true }, () => {
            fetch.post({
                url: constants.SERVICE_URLS.LOGIN,
                requestBody: {
                    email,
                    password
                },
                callbackHandler: (response) => {
                    console.log(response)
                    const { status, message, payload } = response;
                    const _state = cloneDeep(this.state);

                    _state.isLoading = false;

                    if (status === constants.SUCCESS) {
                        _state.message = '';
                        _state.isValid = true;
                        window.localStorage.setItem('_token', payload.token);
                        window.localStorage.setItem('_userInfo', JSON.stringify(payload.result));
                    } else {
                        _state.message = message;
                        _state.isValid = false;
                        window.localStorage.removeItem('_token');
                    }

                    this.setState(_state, this.redirectTicketList);


                }
            });

        });
    }

    redirectTicketList = () => {
        const token = window.localStorage.getItem('_token');
        if (token != null) {
            this.props.history.push('/ticketlist');
        }
    }

    render() {
        return (
            // <LoginView
            //     {...{
            //         ...this.state,
            //         onInputChange: this.onInputChange,
            //         onSubmitHandler: this.onSubmitHandler
            //     }}
            // />
            <LoginPages {...{
                ...this.state,
                onInputChange: this.onInputChange,
                onSubmitHandler: this.onSubmitHandler
            }} />
        );
    }

}