import * as types from "../actionTypes";

const initalState = {
  allStatus: [],
  getAllStatusLoading: false,
  getAllStatusFailure: false,
};

const commonReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_ALL_TICKET_STATUSES_LOADING:
      return {
        ...state,
        getAllStatusFailure: false,
        getAllStatusLoading: true,
      };
    case types.GET_ALL_TICKET_STATUSES_SUCCESS:
      return {
        ...state,
        allStatus: action.data.data,
        getAllStatusFailure: false,
        getAllStatusLoading: false,
      };
    case types.GET_ALL_TICKETS_STATUSES_FAILURE:
      return {
        ...state,
        getAllStatusFailure: true,
        getAllStatusLoading: false,
      };
    default:
      return { ...state };
  }
};

export default commonReducer;
