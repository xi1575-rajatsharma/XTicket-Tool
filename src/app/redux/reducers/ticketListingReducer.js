import * as types from "../actionTypes";

const initalState = {
  currentTicketStatus: null,
  ticketList: [],
  totalPages: 0,
  ticketListFailure: false,
  ticketListLoading: false
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
      let tickets = state.ticketList.map(ticket => {
        return (ticket.id ===action.data.ticketId) ? 
        {...ticket,
          assignedTo : action.data.assignee.label,
          assignedToEmailId: action.data.assignee.value,
          isLoading: false
        } : ticket 
      })
      return {
        ...state,
        ticketList: tickets
      };
    }
    case types.CHANGE_ASSIGNEE_ERROR:{
      let tickets = state.ticketList.map(ticket => {
        return (ticket.id ===action.data.ticketId) ? 
        {...ticket,
          isError : true,
          isLoading: false,
          errorTitle: action.data.error.error,
          errorMsg: action.data.error.message
        } : ticket 
      })
      return {
        ...state,
        ticketList: tickets
      };
    }
    case types.SHOW_CHANGE_ASSIGNEE_LOADER:{
      let tickets = state.ticketList.map(ticket => {
        return (ticket.id ===action.data.ticketId) ? {...ticket, isLoading : true} : ticket 
      })
      return {
        ...state,
        ticketList: tickets
      };
    }
    case types.CLOSE_ERROR_MODAL:{
      let tickets = state.ticketList.map(ticket => {
        return (ticket.id ===action.data.ticketId) ? 
        {...ticket, isError : false, errorMsg: "", errorTitle: ""} : ticket 
      })
      return {
        ...state,
        ticketList: tickets
      };
    }
    default:
      return { ...state };
  }
};

export default ticketListingReducer;
