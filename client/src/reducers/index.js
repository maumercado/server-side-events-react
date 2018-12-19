import { combineReducers } from "redux";
import debuggerReducer from "./debugger_reducer";

const rootReducer = combineReducers({
    debugger: debuggerReducer
});

export default rootReducer;
