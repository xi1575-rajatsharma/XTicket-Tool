import * as types from "../actionTypes";

const initalState = {
  tickets: [],
  loading: false,
  error: false,
  errorMessage: '',
};

const employeeDashboardReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_USER_TICKETS:
      let tickets = action.data.result.tickets || [];
      if(action.status && action.status.length && action.data.result && action.data.result.tickets){
        tickets = action.data.result.tickets.filter(ticket =>
          action.status.some(status => status.label == ticket.status)
        )
      }
      return {
      ...state,
      tickets: tickets,
      loading: false,
      error: false
      };
    case types.DASHBOARD_ERROR:
      let errorMsg = "";
      if(action.error && action.error.response && action.error.response.data){
          errorMsg = action.error.response.data.message
      }else{
          errorMsg = "Something went wrong please try again";
      }
      return {
        ...state,
        loading: false,
        error: true,
        errorMessage: errorMsg
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
        tickets: []
      };
    default:
      return { ...state };
  }
};

export default employeeDashboardReducer;
