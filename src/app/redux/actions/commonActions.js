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

// get All Admin Users

export const getAllAdminsInDept = (departmentId) => (dispatch) => {
  XenieApi.get(
    `${exportUrl + configs.getAllAdmins}?departmentId=${departmentId}`
  ).then(
    (response) => {
      dispatch({
        type: types.GET_ALL_ADMIN_USERS_SUCCESS,
        data: response.data,
      });
    },
    (error) => {
      dispatch({ type: types.GET_ALL_ADMIN_USERS_FAILURE, error });
    }
  );
};

export const getAllAdminUsers = () => (dispatch) => {
  let currentUserEmail = window.sessionStorage.getItem("userEmail");
  XenieApi.get(
    `${exportUrl + configs.getUserDepartment}?email=${currentUserEmail}`
  ).then(
    (resp) => {
      dispatch(getAllAdminsInDept(resp.data.result.departmentId));
    },
    (error) => {
      dispatch({ type: types.GET_ALL_ADMIN_USERS_FAILURE, error });
    }
  );
};

export const startAllAdminUsersLoader = () => (dispatch) => {
  dispatch({ type: types.GET_ALL_ADMIN_USERS_LOADING });
};

export const getAllDepartments = () => (dispatch) => {
  XenieApi.get(exportUrl + configs.getAllDepartments).then(
    (response) => {
      dispatch({
        type: types.GET_ALL_DEPARTMENTS_SUCCESS,
        data: response.data,
      });
    },
    (error) => {
      dispatch({ type: types.GET_ALL_ADMIN_USERS_FAILURE, error });
    }
  );
};
