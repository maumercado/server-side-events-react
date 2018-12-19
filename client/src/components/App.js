import React from "react";
import { Provider } from "react-redux";
import Events from "../containers/Events";
import store from "../store";

const App = () => {
    return (
        <Provider store={store}>
            <div>
                <Events />
            </div>
        </Provider>
    );
};

export default App;
