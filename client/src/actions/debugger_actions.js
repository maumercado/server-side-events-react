import { DEBUGGER_RECEIVED_EVENT, DEBUGGER_LOADED, DEBUGGER_INIT_ERROR } from "./types";

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
