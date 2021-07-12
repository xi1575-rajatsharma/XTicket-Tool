import * as types from "app/redux/actionTypes";

const initalState = {
  employeeTicketStatusCount: {
    ticketStatusCount: [],
    ticketStatusCountLoading: false,
    ticketStatusCountFailure: false,
  },
  employeeSlaMissedVsAchived: {
    slaInfo: [],
    slaInfoLoading: false,
    slaInfoFailure: false,
    tickets: [],
    loading: false,
    error: false,
    errorMessage: "",
  },
};

const employeeDashboardReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_EMPLOYEE_TICKET_STATUS_COUNT_LOADING: {
      return {
        ...state,
        employeeTicketStatusCount: {
          ...state.employeeTicketStatusCount,
          ticketStatusCountLoading: true,
          ticketStatusCountFailure: false,
        },
      };
    }
    case types.GET_EMPLOYEE_TICKET_STATUS_COUNT_SUCCESS: {
      return {
        ...state,
        employeeTicketStatusCount: {
          ...state.employeeTicketStatusCount,
          ticketStatusCount: action.data,
          ticketStatusCountLoading: false,
          ticketStatusCountFailure: false,
        },
      };
    }
    case types.GET_EMPLOYEE_TICKET_STATUS_COUNT_FAILURE: {
      return {
        ...state,
        employeeTicketStatusCount: {
          ...state.employeeTicketStatusCount,
          ticketStatusCountLoading: false,
          ticketStatusCountFailure: true,
        },
      };
    }
    case types.REST_EMPLOYEE_TICKET_STATUS_COUNT: {
      return {
        ...state,
        employeeTicketStatusCount: {
          ...state.employeeTicketStatusCount,
          ticketStatusCount: [],
          ticketStatusCountLoading: false,
          ticketStatusCountFailure: false,
        },
      };
    }
    case types.GET_EMPLOYEE_SLA_INFO_LOADING: {
      return {
        ...state,
        employeeSlaMissedVsAchived: {
          ...state.employeeSlaMissedVsAchived,
          slaInfoLoading: true,
          slaInfoFailure: false,
        },
      };
    }
    case types.GET_EMPLOYEE_SLA_INFO_SUCCESS: {
      return {
        ...state,
        employeeSlaMissedVsAchived: {
          ...state.employeeSlaMissedVsAchived,
          slaInfo: action.data,
          slaInfoLoading: false,
          slaInfoFailure: false,
        },
      };
    }
    case types.GET_EMPLOYEE_SLA_INFO_FAILURE: {
      return {
        ...state,
        employeeSlaMissedVsAchived: {
          ...state.employeeSlaMissedVsAchived,
          slaInfoLoading: false,
          slaInfoFailure: true,
        },
      };
    }
    case types.REST_EMPLOYEE_SLA_INFO: {
      return {
        ...state,
        employeeSlaMissedVsAchived: {
          ...state.employeeSlaMissedVsAchived,
          slaInfo: [],
          slaInfoLoading: false,
          slaInfoFailure: true,
        },
      };
    }
    case types.GET_USER_TICKETS:
      return {
        ...state,
        tickets: action.data.result.tickets || [],
        loading: false,
        error: false,
      };
    case types.DASHBOARD_ERROR:
      let errorMsg = "";
      if (action.error && action.error.response && action.error.response.data) {
        errorMsg = action.error.response.data.message;
      } else {
        errorMsg = "Something went wrong please try again";
      }
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: errorMsg,
      };
    case types.SHOW_DASHBOARD_LOADER:
      return {
        ...state,
        loading: true,
        error: false,
      };
    case types.RESET_DASHBOARD:
      return {
        ...state,
        loading: false,
        error: false,
        tickets: [],
      };
    default:
      return { ...state };
  }
};

export default employeeDashboardReducer;
