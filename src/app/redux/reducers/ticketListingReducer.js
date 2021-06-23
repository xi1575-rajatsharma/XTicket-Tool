import * as types from "../actionTypes";

const initalState = {
  ticketList: [],
  ticketListFailure: false,
  ticketListLoading: false,
  changeAssigneeError: false,
  changeAssigneeLoading: false,
  changeAssigneeErrorMsg : '',
  currentTicket: 0
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
      console.log("I'm here");
      return {
        ...state,
        ticketList: action.data.result.tickets,
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
    case types.CHANGE_TICKET_ASSIGNEE:
      state.ticketList.map(ticket => {
        if(ticket.id === action.data.ticketId){
          ticket.assignedTo = action.data.assignee.label;
          ticket.assignedToEmailId = action.data.assignee.value;
        }
      })
      return {...state, changeAssigneeError: false, changeAssigneeLoading: false, currentTicket: 0};
    case types.CHANGE_ASSIGNEE_ERROR:
      return {...state, changeAssigneeError: true, 
        changeAssigneeLoading: false,
        currentTicket: action.data.ticketId, 
        changeAssigneeErrorMsg: action.data.error.message};
    case types.SHOW_CHANGE_ASSIGNEE_LOADER:
      return {...state, changeAssigneeLoading: true, currentTicket: action.data.ticketId};
    case types.CLOSE_ERROR_MODAL:
      return {...state, changeAssigneeError: false, changeAssigneeErrorMsg: '', currentTicket: 0};
    default:
      return { ...state };
  }
};

export default ticketListingReducer;
