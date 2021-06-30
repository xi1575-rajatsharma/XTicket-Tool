import * as types from "app/redux/actionTypes";

const initialState = {
  conversations: {
    allReplies: [],
    getAllRepliesLoading: false,
    getAllRepliesFailure: false,
  },
};

const ticketDetailsReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_ALL_REPLIES_LOADING: {
      return {
        ...state,
        conversations: {
          getAllRepliesLoading: true,
          getAllRepliesFailure: false,
        },
      };
    }
    case types.GET_ALL_REPLIES_SUCCESS: {
      return {
        ...state,
        conversations: {
          allReplies: action.data.result.conversations || [],
          getAllRepliesLoading: false,
          getAllRepliesFailure: false,
        },
      };
    }
    case types.GET_ALL_REPLIES_FAILURE: {
      return {
        ...state,
        conversations: {
          getAllRepliesLoading: false,
          getAllRepliesFailure: true,
        },
      };
    }
    case types.RESET_ALL_REPLIES: {
      return {
        ...state,
        conversations: {
          allReplies: [],
          getAllRepliesLoading: false,
          getAllRepliesFailure: false,
        },
      };
    }
    default: {
      return { ...state };
    }
  }
};

export default ticketDetailsReducer;
