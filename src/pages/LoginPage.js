import React from "react";
import { cloneDeep } from "lodash";
import { constants } from "../modules/constants";
import { fetch } from "../modules/httpServices";
import { loginView as LoginView } from "../Views/loginView";
import { LoginPages } from "../core/LoginPage/loginPage";

export default class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: false,
      email: "",
      password: "",
      redirectTo: "",
      isValid: true,
    };
  }

  componentDidMount() {
    const id = this.props.location.search.split("=")[1];
    // console.log(id)
    id ? this.setState({ redirectTo: id }) : this.setState({ ...this.state });
    this.redirectTicketList();
  }

  onInputChange = (payload) => {
    this.setState({ ...this.state, ...payload });
  };

  onSubmitHandler = (e) => {
    e.preventDefault();

    const { email, password } = this.state;

    this.setState({ isLoading: true }, () => {
      fetch.post({
        url: constants.SERVICE_URLS.LOGIN,
        requestBody: {
          email,
          password,
        },
        callbackHandler: (response) => {
          console.log(response);
          const { status, message, payload } = response;
          const _state = cloneDeep(this.state);

          _state.isLoading = false;

          if (status === constants.SUCCESS) {
            _state.message = "";
            _state.isValid = true;
            window.localStorage.setItem("_token", payload.token);
            window.localStorage.setItem(
              "_userInfo",
              JSON.stringify(payload.result)
            );
            window.localStorage.setItem(
              "_resetPassword",
              payload.result.resetPassword
            );
          } else {
            _state.message = message;
            _state.isValid = false;
            window.localStorage.removeItem("_token");
          }

          this.setState(_state, this.redirectTicketList);
        },
      });
    });
  };

  redirectTicketList = () => {
    const token = window.localStorage.getItem("_token");
    const id = this.props.location.search.split("=")[1];
    const redirectTo = this.props;
    console.log(redirectTo);
    if (token != null) {
      id
        ? this.props.history.push(`${id}`)
        : this.props.history.push("/ticketlist");
    }
  };

  render() {
    return (
      // <LoginView
      //     {...{
      //         ...this.state,
      //         onInputChange: this.onInputChange,
      //         onSubmitHandler: this.onSubmitHandler
      //     }}
      // />
      <LoginPages
        {...{
          ...this.state,
          onInputChange: this.onInputChange,
          onSubmitHandler: this.onSubmitHandler,
        }}
      />
    );
  }
}
