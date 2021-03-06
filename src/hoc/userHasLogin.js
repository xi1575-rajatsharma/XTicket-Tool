import React from 'react';
import { HeaderView as HeaderView } from '../Views/headerView';
import { sidebarView as SidebarView } from '../Views/sidebarView';

export const userHasLogin = (WrapperView) => {
    return class UserHasLogin extends React.Component {

        constructor(props) {
            super(props);
            this.state = {
                isTicketListLoading: true
            }
        }

        setIsTicketLoading = (tickeList) => {
            if (tickeList) this.setState({ isTicketListLoading: false });
            else {
                const _listingData = window.localStorage.getItem('_listingData');
                if (_listingData) this.setState({ isTicketListLoading: false });
            }
        }

        onClickLogout = () => {
            window.localStorage.removeItem('_token');
            window.localStorage.removeItem('_listingData')
            this.props.history.push('/');
        }

        componentDidMount() {
            const token = window.localStorage.getItem('_token');

            if (token == null) {
                this.props.history.push('/');
            }
        }

        render() {
            return (
                <div className="TicketListContainer">
                    <HeaderView
                        onClickLogout={this.onClickLogout}
                        isTicketListLoading={this.state.isTicketListLoading}
                    />
                    <div className="bottom-container">

                        <WrapperView {...this.props}
                            setIsTicketLoading={this.setIsTicketLoading}
                        />
                    </div>
                </div>
            );
        }

    }
}