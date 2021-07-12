import { converDatatoReportsData } from "utils/Constants";
import XenieApi from "../../httpsRequests/api.js";
import { exportUrl } from "../../httpsRequests/ExportUrl.js";
import configs from "../../httpsRequests/configs.js";
import * as types from "../actionTypes";

export const getEmployeeTicketStatusCount = (requestParams) => (dispatch) => {
  XenieApi.get(
    exportUrl + configs.getEmployeeTicketStatusCount,
    null,
    requestParams
  ).then(
    (response) => {
      dispatch({
        type: types.GET_EMPLOYEE_TICKET_STATUS_COUNT_SUCCESS,
        data:
          (response.data.data &&
            converDatatoReportsData(response.data.data, "status", "count")) ||
          [],
      });
    },
    (error) =>
      dispatch({ type: types.GET_EMPLOYEE_TICKET_STATUS_COUNT_FAILURE, error })
  );
};

const transformSlaData = (data) => {
  return [
    { name: "Missed", value: data.missed },
    { name: "Resolved", value: data.missed },
  ];
};

export const getEmployeeSlaInfo = (requestParams) => (dispatch) => {
  XenieApi.get(exportUrl + configs.getEmployeeSla, null, requestParams).then(
    (response) => {
      dispatch({
        type: types.GET_EMPLOYEE_SLA_INFO_SUCCESS,
        data: transformSlaData(response.data.result) || [],
      });
    },
    (error) => dispatch({ type: types.GET_EMPLOYEE_SLA_INFO_FAILURE, error })
  );
};

export const resetEmployeeTicketStatusCount = () => (dispatch) => {
  dispatch({ type: types.REST_EMPLOYEE_TICKET_STATUS_COUNT });
};

export const resetEmployeeSlaInfo = () => (dispatch) => {
  dispatch({ type: types.REST_EMPLOYEE_SLA_INFO });
};

export const startEmployeeTicketStatusCountLoader = () => (dispatch) => {
  dispatch({ type: types.GET_EMPLOYEE_TICKET_STATUS_COUNT_LOADING });
};

export const startEmployeeSlaInfoLoader = () => (dispatch) => {
  dispatch({ type: types.GET_EMPLOYEE_SLA_INFO_LOADING });
};

export const getUserTickets =
  (params) => (dispatch) => {
    XenieApi.get(`${exportUrl + configs.getUserTickets}`, null, params).then(
      (response) => {
        dispatch({
          type: types.GET_USER_TICKETS,
          data: response.data
        });
      },
      (error) => dispatch({ type: types.DASHBOARD_ERROR, error })
    );
  };

export const showLoader = () => (dispatch) => {
  dispatch({ type: types.SHOW_DASHBOARD_LOADER });
};

export const resetData = () => (dispatch) => {
  dispatch({ type: types.RESET_DASHBOARD });
};
