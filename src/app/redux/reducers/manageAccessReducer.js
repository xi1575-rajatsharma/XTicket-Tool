import * as types from "../actionTypes";

const initalState = {
  selectedUser: {},
  department: 0,
  getUsersFailure: false,
  loading: false,
  error: false,
  errorMessage: "",
  editAccess: {
    currentRole: "",
    user: "",
    allRoles: [],
    error: false,
    loading: false,
    errorMessage: "",
    success: false,
    successMessage: "",
  },
};

const manageAccessReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.SEARCH_USER:
      return {
        ...state,
        selectedUser: action.data.result.users[0] || {},
        getUsersFailure: false,
        loading: false,
        error: false,
      };

    case types.SET_USER_DEPARTMENT:
      return {
        ...state,
        department: action.data.result.departmentId || 0,
      };
    case types.UPDATE_DEPARTMENT:
      return {
        ...state,
        department: action.department,
      };
    case types.SEARCH_USER_FAILURE:
      return {
        ...state,
        loading: false,
        getUsersFailure: true,
      };
    case types.ASSIGN_DEPT_TO_USER:
      return {
        ...state,
        loading: false,
      };
    case types.SHOW_LOADER:
      if (action.data.label == "editAccess") {
        return {
          ...state,
          editAccess: {
            ...state.editAccess,
            loading: true,
            error: false,
            errorMessage: "",
            success: false,
          },
        };
      } else {
        return {
          ...state,
          loading: true,
          error: false,
          success: false,
          errorMessage: "",
          successMessage: "",
        };
      }

    case types.SHOW_ERROR:
      let errorMsg = "";
      if (action.error && action.error.response && action.error.response.data) {
        errorMsg = action.error.response.data.message;
      } else {
        errorMsg = "Something went wrong please try again";
      }
      return {
        ...state,
        loading: false,
        success: false,
        error: true,
        errorMessage: errorMsg,
        selectedUser: {},
      };
    case types.EDIT_ACCESS_ERROR:
      let errorMessage = "";
      if (action.error && action.error.response && action.error.response.data) {
        errorMessage = action.error.response.data.message;
      } else {
        errorMessage = "Something went wrong please try again";
      }
      return {
        ...state,
        editAccess: {
          ...state.editAccess,
          loading: false,
          error: true,
          success: false,
          errorMessage,
        },
      };
    case types.GET_USER_ROLE:
      let role = "";
      if (
        action.data.result &&
        action.data.result.authorities &&
        action.data.result.authorities.length
      ) {
        role = action.data.result.authorities[0].role;
      }
      return {
        ...state,
        editAccess: {
          ...state.editAccess,
          currentRole: role,
          loading: false,
          error: false,
          success: false,
        },
      };
    case types.CHANGE_USER_ROLE:
      return {
        ...state,
        editAccess: {
          ...state.editAccess,
          currentRole: action.data.role,
          loading: false,
          error: false,
          success: action.data.resp.code === 200 ? true : false,
          successMessage: action.data.resp.result,
        },
      };
    case types.UPDATE_ROLE:
      return {
        ...state,
        editAccess: {
          ...state.editAccess,
          currentRole: action.role,
        },
      };
    case types.UPDATE_USER:
      return {
        ...state,
        editAccess: {
          ...state.editAccess,
          user: action.user,
        },
      };
    case types.CLEAN_MANAGE_ACCESS:
      if (action.label === "addUser") {
        return {
          ...state,
          loading: false,
          error: false,
          success: false,
          department: 0,
          selectedUser: {},
        };
      } else {
        return {
          ...state,
          editAccess: {
            ...state.editAccess,
            loading: false,
            success: false,
            error: false,
            currentRole: "",
            user: "",
          },
        };
      }

    case types.GET_ALL_ROLES:
      return {
        ...state,
        editAccess: {
          ...state.editAccess,
          allRoles: action.data.result.authorities || [],
          loading: false,
        },
      };
    default:
      return { ...state };
  }
};

export default manageAccessReducer;
