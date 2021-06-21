import * as types from "../actionTypes";

const initalState = {
  allStatusData: {
    allStatus: [],
    getAllStatusLoading: false,
    getAllStatusFailure: false,
  },
  allAdminData: {
    allAdminUsers: [],
    allAdminUsersLoading: false,
    allAdminUsersFailure: false,
  },
};

const commonReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_ALL_TICKET_STATUSES_LOADING:
      return {
        ...state,
        allStatusData: {
          ...state.allStatusData,
          getAllStatusFailure: false,
          getAllStatusLoading: true,
        },
      };
    case types.GET_ALL_TICKET_STATUSES_SUCCESS:
      return {
        ...state,
        allStatusData: {
          ...state.allStatusData,
          allStatus: action.data.data,
          getAllStatusFailure: false,
          getAllStatusLoading: false,
        },
      };
    case types.GET_ALL_TICKETS_STATUSES_FAILURE:
      return {
        ...state,
        allStatusData: {
          ...state.allStatusData,
          getAllStatusFailure: true,
          getAllStatusLoading: false,
        },
      };
    case types.GET_ALL_ADMIN_USERS_LOADING:
      return {
        ...state,
        allAdminData: {
          ...state.allAdminData,
          allAdminUsersLoading: true,
          allAdminUsersFailure: false,
        },
      };
    case types.GET_ALL_ADMIN_USERS_SUCCESS:
      return {
        ...state,
        allAdminData: {
          ...state.allAdminData,
          allAdminUsers: action.data.data,
          allAdminUsersLoading: false,
          allAdminUsersFailure: false,
        },
      };
    case types.GET_ALL_ADMIN_USERS_FAILURE:
      return {
        ...state,
        allAdminData: {
          ...state.allAdminData,
          allAdminUsersLoading: false,
          allAdminUsersFailure: true,
        },
      };
    default:
      return { ...state };
  }
};

export default commonReducer;
