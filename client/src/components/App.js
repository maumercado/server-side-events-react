import React from "react";
import { Provider } from "react-redux";
import MauggerApp from "../containers/debugger/MauggerApp";
import store from "../store";
import "eventsource-polyfill";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <MauggerApp />
            </div>
        </Provider>
    );
};

export default App;
