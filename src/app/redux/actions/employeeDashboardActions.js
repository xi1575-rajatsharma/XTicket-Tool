import XenieApi from "../../httpsRequests/api.js";
import { exportUrl } from "../../httpsRequests/ExportUrl.js";
import configs from "../../httpsRequests/configs.js";
import * as types from "../actionTypes";


export const getUserTickets = (email, startDate, endDate='', status=[], page=0, limit=10) =>
 (dispatch) => {
    XenieApi.get(
      `${exportUrl + configs.getUserTickets}?page=${page}&limit=${limit}&email=${email}&startDate=${startDate}&endDate=${endDate}`      
    ).then(
      (response) => {
        dispatch({
          type: types.GET_USER_TICKETS,
          data: response.data,
          status
        });
      },
      (error) => dispatch({ type: types.DASHBOARD_ERROR, error})
    );
};

export const showLoader = () => (dispatch) => {
  dispatch({ type: types.SHOW_DASHBOARD_LOADER})
};

export const resetData = () => (dispatch) => {
  dispatch({ type: types.RESET_DASHBOARD})
};