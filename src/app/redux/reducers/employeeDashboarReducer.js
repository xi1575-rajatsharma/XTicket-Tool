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
    default:
      return { ...state };
  }
};

export default employeeDashboardReducer;
