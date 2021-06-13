import XenieApi from "../../httpsRequests/api.js";
import { exportUrl } from "../../httpsRequests/ExportUrl.js";
import configs from "../../httpsRequests/configs.js";
import * as types from "../actionTypes";

export const getAllStatus = () => (dispatch) => {
  XenieApi.get(exportUrl + configs.getAllStatus).then(
    (response) => {
      dispatch({
        type: types.GET_ALL_TICKET_STATUSES_SUCCESS,
        data: response.data,
      });
    },
    (error) => dispatch({ type: types.GET_ALL_TICKETS_STATUSES_FAILURE })
  );
};

export const startTicketStatusLoader = () => (dispatch) => {
  dispatch({ type: types.GET_ALL_TICKET_STATUSES_LOADING });
};
