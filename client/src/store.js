import { createLogger } from "redux-logger";
import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";

import rootReducer from "./reducers";

const logger = createLogger({
    duration: true,
    diff: true
});

const enhancers = [];
const middleware = [ thunk ];

if (process.env.NODE_ENV !== "production") {
    middleware.push(logger);
}

const initialState = {};
const composedEnhancers = composeWithDevTools(applyMiddleware(...middleware), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

if (module.hot) {
    module.hot.accept("./reducers", () => {
        store.replaceReducer(rootReducer);
    });
}

export default store;
