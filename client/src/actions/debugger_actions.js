import {
    DEBUGGER_RECEIVED_EVENT,
    DEBUGGER_LOADED,
    DEBUGGER_INIT_ERROR,
    DEBUGGER_SEARCH,
    DEBUGGER_PAUSE,
    DEBUGGER_RESUME,
    DEBUGGER_EVENT_SELECTED
} from "./types";

window.sse = null;

export const debuggerInit = () => dispatch => {
    if (window.sse) {
        throw new Error("SSE connection already exists?");
    }

    window.sse = new EventSource(`${window.config.server}/v1/stream`);

    window.sse.addEventListener("event", e => {
        dispatch({
            payload: e.data,
            type: DEBUGGER_RECEIVED_EVENT
        });
    });

    window.sse.addEventListener("loaded", e => {
        dispatch({
            type: DEBUGGER_LOADED
        });
    });

    window.sse.addEventListener("error", () => dispatch({ type: DEBUGGER_INIT_ERROR }));
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

export const debuggerSelectEvent = event => dispatch => {
    dispatch({
        type: DEBUGGER_EVENT_SELECTED,
        payload: event
    });
};
