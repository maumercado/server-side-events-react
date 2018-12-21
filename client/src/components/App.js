import React from "react";
import { Provider } from "react-redux";
import Events from "../containers/Events";
import SearchBar from "../containers/SearchBar";
import store from "../store";
import "eventsource-polyfill";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <SearchBar />
                <Events />
            </div>
        </Provider>
    );
};

export default App;
