import React, { useState, useEffect } from "react";
import { isEmpty, toString } from "lodash";
import Loader from "react-loader-spinner";
import * as actionCreators from "../../app/redux/actions/loginActions";
import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { mapChangesToState } from "utils/Constants";

export const LoginPages = (payload) => {
  const dispatch = useDispatch();
  const loginData = useSelector((state) => state.login);
  const history = useHistory();
  const [state, setState] = useState({ email: "", password: "" });

  useEffect(() => {
    dispatch(actionCreators.resetLoginCreds());
    if (loginData.isLoginSuccess) history.push({ pathname: "/ticketlist" });
  }, [history, loginData.isLoginSuccess, dispatch]);

  const isDisabledButton =
    isEmpty(toString(state.email)) || isEmpty(toString(state.password));

  const submitData = (e) => {
    e.preventDefault();
    const requestBody = {
      email: state.email,
      password: state.password,
    };
    dispatch(actionCreators.resetLoginCreds());
    dispatch(actionCreators.startLoginLoader());
    dispatch(actionCreators.getLoginCreds(requestBody));
  };

  return (
    <div className="login-container">
      <div className="logo-container"></div>
      <div className="login-text-container">Xenie Help Desk Login</div>
      <div className="login-form-container">
        <form onSubmit={submitData}>
          {/* {isValid ? null : (
            <div className="login-error">
              <p>Please Enter the Correct Credentials</p>
            </div>
          )} */}
          <input
            type="text"
            id="username"
            placeholder="Username"
            value={state.email}
            onChange={(e) =>
              mapChangesToState(
                state,
                { email: e.currentTarget.value },
                setState
              )
            }
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={state.password}
            onChange={(e) =>
              mapChangesToState(
                state,
                { password: e.currentTarget.value },
                setState
              )
            }
          />
          <button
            type="submit"
            id="submit"
            disabled={isDisabledButton || loginData.isLoginLoading}
          >
            {loginData.isLoginLoading ? "Loading..." : "Submit"}
          </button>
        </form>
      </div>
      {loginData.isLoginLoading ? (
        <div className="loader-wrapper">
          <div className="loader-icon">
            <Loader
              type="Puff"
              color="rgb(72, 28, 64)"
              height={100}
              width={100}
              timeout={3000} //3 secs
            />{" "}
          </div>
        </div>
      ) : null}
      <div className="footer-logo-container"></div>
      <div className="footer-text-container">
        Xebia Group © 2020. All rights reserved.
      </div>
    </div>
  );
};
