import {
    DEBUGGER_RECEIVED_EVENT,
    DEBUGGER_LOADED,
    DEBUGGER_INIT_ERROR,
    DEBUGGER_SEARCH,
    DEBUGGER_PAUSE,
    DEBUGGER_RESUME
} from "./types";

let sse = null;

export const debuggerInit = () => dispatch => {
    if (sse) {
        throw new Error("SSE connection already exists?");
    }

    sse = new EventSource("http://localhost:4000/v1/stream");

    sse.addEventListener("event", e => {
        dispatch({
            payload: e.data,
            type: DEBUGGER_RECEIVED_EVENT
        });
    });

    sse.addEventListener("loaded", e => {
        dispatch({
            type: DEBUGGER_LOADED
        });
    });

    sse.addEventListener("error", () => dispatch({ type: DEBUGGER_INIT_ERROR }));
};

export const debuggerSearch = query => dispatch => {
    dispatch({ type: DEBUGGER_SEARCH, payload: query });
};

export const debuggerPlay = () => dispatch => {
    dispatch({ type: DEBUGGER_RESUME });
};

export const debuggerPause = () => dispatch => {
    dispatch({ type: DEBUGGER_PAUSE });
};
