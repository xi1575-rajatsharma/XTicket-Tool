import { combineReducers } from "redux";
import loginReducer from "./loginReducer";
import commonReducer from "./commonReducers";
import ticketListingReducer from "./ticketListingReducer";

const rootReducer = combineReducers({
  login: loginReducer,
  common: commonReducer,
  ticketList: ticketListingReducer,
});

export default rootReducer;
