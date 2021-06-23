import XenieApi from "../../httpsRequests/api.js";
import { exportUrl } from "../../httpsRequests/ExportUrl.js";
import configs from "../../httpsRequests/configs.js";
import * as types from "../actionTypes";

//get ticket by Status
export const getTicketByStatus = (requestParams, status) => (dispatch) => {
  XenieApi.get(
    `${exportUrl + configs.getTicketsByStatus}/${status}`,
    null,
    requestParams
  ).then(
    (response) => {
      dispatch({
        type: types.GET_ALL_TICKETS_BY_STATUS_SUCCESS,
        data: response.data,
        status,
      });
    },
    (error) =>
      dispatch({ type: types.GET_ALL_TICKETS_BY_STATUS_FAILURE, error })
  );
};

export const startGetTicketByStatusLoader = () => (dispatch) => {
  dispatch({ type: types.GET_ALL_TICKETS_BY_STATUS_LOADING });
};

export const resetGetTicketByStatus = () => (dispatch) => {
  dispatch({ type: types.RESET_TICKETS_BY_STATUS });
};

export const changeTicketAssignee = (assignee, ticketId) => (dispatch) => {
  XenieApi.put(exportUrl + configs.changeTicketAssignee + `${ticketId}?emailId=${assignee.value}&reason=`).then(
    (response) => {
      dispatch({ type: types.CHANGE_TICKET_ASSIGNEE, data: {'resp': response.data} });
    },
    (error) => {
      // handle error here
    }
  );
};
