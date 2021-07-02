import React from "react";
import * as actionCreators from "../app/redux/actions/loginActions";
import { HeaderView as HeaderView } from "../Views/headerView";
import { sidebarView as SidebarView } from "../Views/sidebarView";

export const userHasLogin = (WrapperView) => {
  return class UserHasLogin extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        isTicketListLoading: false,
      };
    }

    setIsTicketLoading = (tickeList) => {
      if (tickeList) this.setState({ isTicketListLoading: false });
      else {
        const _listingData = window.localStorage.getItem("_listingData");
        if (_listingData) this.setState({ isTicketListLoading: false });
      }
    };

    onClickLogout = () => {
      window.localStorage.removeItem("xenieToken");
      window.localStorage.removeItem("_listingData");
      window.sessionStorage.removeItem("userId");
      window.sessionStorage.removeItem("userEmail");
      actionCreators.logout();
      this.props.history.push("/");
    };

    componentDidMount() {
      const token = window.localStorage.getItem("xenieToken");

      if (token == null) {
        this.props.history.push("/");
      }
    }

    render() {
      return (
        <>
          <HeaderView
            onClickLogout={this.onClickLogout}
            isTicketListLoading={this.state.isTicketListLoading}
          />

          <WrapperView
            {...this.props}
            setIsTicketLoading={this.setIsTicketLoading}
          />
        </>
      );
    }
  };
};
