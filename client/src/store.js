import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const enhancers = [];
const middleware = [ thunk ];

const initialState = {};
const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

if (module.hot) {
    module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer);
    });
}

export default store;
