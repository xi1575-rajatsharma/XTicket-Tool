import XenieApi from "../../httpsRequests/api.js";
import { exportUrl } from "../../httpsRequests/ExportUrl.js";
import configs from "../../httpsRequests/configs.js";
import * as types from "../actionTypes";

export const getAllReplies = (ticketId) => (dispatch) => {
  XenieApi.get(`${exportUrl + configs.getAllReplies}/${ticketId}`).then(
    (response) => {
      dispatch({ type: types.GET_ALL_REPLIES_SUCCESS, data: response.data });
    },
    (error) => {
      dispatch({ type: types.GET_ALL_REPLIES_FAILURE, error });
    }
  );
};

export const resetAllReplies = () => (dispatch) => {
  dispatch({ type: types.RESET_ALL_REPLIES });
};

export const startAllRepliesLoader = () => (dispatch) => {
  dispatch({ type: types.GET_ALL_REPLIES_LOADING });
};
