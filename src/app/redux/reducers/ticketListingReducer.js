import * as types from "../actionTypes";

const initalState = {
  currentTicketStatus: null,
  ticketList: [],
  totalPages: 0,
  ticketListFailure: false,
  ticketListLoading: false,
  ticket: {
    currentTicket: 0,
    currentAssignee: {},
    loading: false,
    error: false,
    errorMessage: "",
    errorTitle: "",
  }
};

const ticketListingReducer = (state = initalState, action) => {
  switch (action.type) {
    case types.GET_ALL_TICKETS_BY_STATUS_LOADING: {
      return {
        ...state,
        ticketListFailure: false,
        ticketListLoading: true,
      };
    }
    case types.GET_ALL_TICKETS_BY_STATUS_SUCCESS: {
      let tickets = []
      if(action.data.result && action.data.result.tickets){
        tickets = action.data.result.tickets.map(ticket => (
          {...ticket, isLoading: false, isError: false, errorTitle: '', errorMsg: '' }
        ))
      }
      return {
        ...state,
        ticketList: tickets,
        totalPages: action.data.numberOfPages,
        currentTicketStatus: action.status,
        ticketListFailure: false,
        ticketListLoading: false,
      };
    }
    case types.GET_ALL_TICKETS_BY_STATUS_FAILURE: {
      return {
        ...state,
        ticketListFailure: true,
        ticketListLoading: false,
      };
    }
    case types.RESET_TICKETS_BY_STATUS: {
      return {
        ...state,
        ticketList: [],
        ticketListFailure: false,
        ticketListLoading: false,
      };
    }
    case types.CHANGE_TICKET_ASSIGNEE:{
      return {
        ...state,
        ticket: {
          ...state.ticket,
          loading: false,
          error: false,
          currentAssignee: {label: action.data.assignee.label, value: action.data.assignee.value}
        }

      }
    }
    case types.CHANGE_ASSIGNEE_ERROR:{
      return {
        ...state,
        ticket: {
          ...state.ticket,
          loading: false,
          error: true,
          errorMessage: action.data.error.result,
          errorTitle: action.data.error.message,
          currentAssignee: {}
        }
      }
    }
    case types.SHOW_CHANGE_ASSIGNEE_LOADER:{
      return {
          ...state,
          ticket: {
            ...state.ticket,
            loading: true,
            currentTicket: action.data.ticketId,
            currentAssignee: {}
          }
        };
    }
    case types.CLOSE_ERROR_MODAL:{
      
      return {
        ...state,
        ticket: {
          ...state.ticket,
          error: false,
          errorMessage: "",
          errorTitle: ""
        }
      }
    }
    default:
      return { ...state };
  }
};

export default ticketListingReducer;
