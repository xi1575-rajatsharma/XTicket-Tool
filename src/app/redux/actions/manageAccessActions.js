import XenieApi from "../../httpsRequests/api.js";
import { exportUrl } from "../../httpsRequests/ExportUrl.js";
import configs from "../../httpsRequests/configs.js";
import * as types from "../actionTypes";
import { getAllAdminUsers } from "./commonActions.js";

export const searchUserAction = (label, value) => (dispatch) => {
  XenieApi.get(
    `${exportUrl + configs.searchUser}?label=${label}&value=${value}`
  )
    .then(
      (resp) => {
        if (
          resp.data.result &&
          resp.data.result.users &&
          resp.data.result.users.length
        ) {
          dispatch({
            type: types.SEARCH_USER,
            data: resp.data,
          });
          let email = resp.data.result.users[0].contactInfo.email;
          return XenieApi.get(
            `${exportUrl + configs.getUserDepartment}?email=${email}`
          );
        } else {
          dispatch({
            type: types.SHOW_ERROR,
            error: { response: { data: { message: "No match found" } } },
          });
        }
      },
      (error) => dispatch({ type: types.SHOW_ERROR, error })
    )
    .then(
      (response) => {
        if (response && response.data) {
          dispatch({
            type: types.SET_USER_DEPARTMENT,
            data: response.data,
          });
        }
      },
      (error) => dispatch({ type: types.SHOW_ERROR, error })
    );
};

export const assignDepttoUser = (emailId, departmentId) => (dispatch) => {
  XenieApi.post(
    `${
      exportUrl + configs.assignDepttoUser
    }?emailId=${emailId}&departmentId=${departmentId}`
  ).then(
    (response) => {
      dispatch({
        type: types.ASSIGN_DEPT_TO_USER,
        data: response.data,
      });
      dispatch(getAllAdminUsers());
    },
    (error) => dispatch({ type: types.SHOW_ERROR, error })
  );
};

export const showLoader = (label) => (dispatch) => {
  dispatch({ type: types.SHOW_LOADER, data: { label } });
};

export const getUserRole = (email) => (dispatch) => {
  XenieApi.get(`${exportUrl + configs.getUserRole}?email=${email}`).then(
    (response) => {
      dispatch({
        type: types.GET_USER_ROLE,
        data: response.data,
      });
    },
    (error) => dispatch({ type: types.EDIT_ACCESS_ERROR, error })
  );
};

export const changeUserRole = (email, role) => (dispatch) => {
  XenieApi.post(
    `${exportUrl + configs.changeUserRole}?emailId=${email}&role=${role}`
  ).then(
    (response) => {
      dispatch({
        type: types.CHANGE_USER_ROLE,
        data: { resp: response.data, role },
      });
    },
    (error) => dispatch({ type: types.EDIT_ACCESS_ERROR, error })
  );
};

export const cleanUpManageAccess = (label) => (dispatch) => {
  dispatch({ type: types.CLEAN_MANAGE_ACCESS, label });
};

export const updateDepartment = (department) => (dispatch) => {
  dispatch({ type: types.UPDATE_DEPARTMENT, department });
};
export const updateRole = (role) => (dispatch) => {
  dispatch({ type: types.UPDATE_ROLE, role });
};

export const updateUser = (user) => (dispatch) => {
  dispatch({ type: types.UPDATE_USER, user });
};

export const getAllRoles = () => (dispatch) => {
  XenieApi.get(`${exportUrl + configs.getAllRoles}`).then(
    (response) => {
      dispatch({
        type: types.GET_ALL_ROLES,
        data: response.data,
      });
    },
    (error) => dispatch({ type: types.EDIT_ACCESS_ERROR, error })
  );
};
