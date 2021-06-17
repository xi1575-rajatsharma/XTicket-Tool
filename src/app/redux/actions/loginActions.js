import XenieApi from "../../httpsRequests/api.js";
import { exportUrl } from "../../httpsRequests/ExportUrl.js";
import configs from "../../httpsRequests/configs.js";
import * as types from "../actionTypes";
import { useHistory } from "react-router";


export const getLoginCreds = (params) => (dispatch) => {
  XenieApi.post(exportUrl + configs.getLoginCreds, null, null, params).then(
    (response) => {
      dispatch({ type: types.GET_LOGIN_CREDS_SUCCESS, data: response.data });
    },
    (error) => {
      dispatch({ type: types.GET_LOGIN_CREDS_FAILURE, error });
    }
  );
};

export const startLoginLoader = () => (dispatch) => {
  dispatch({ type: types.GET_LOGIN_CREDS_LOADING });
};

export const resetLoginCreds = () => (dispatch) => {
  dispatch({ type: types.RESET_LOGIN_CREDS });
};

export const logoutUser = () => (dispatch) => {
  const history = useHistory();
  dispatch({ type: types.LOGOUT_USER });
  // history.push({ pathname: "/" })
};
