import {
    DEBUGGER_RECEIVED_EVENT,
    DEBUGGER_INIT,
    DEBUGGER_LOADED,
    DEBUGGER_PAUSED,
    DEBUGGER_INIT_ERROR
} from "../actions/types";

const initialState = {
    events: [],
    isPaused: false,
    isError: false,
    isLoading: true
};

const MAX_EVENTS_TO_SHOW = 100;

export default (state = initialState, action) => {
    const { events, isPaused } = state;

    switch (action.type) {
        case DEBUGGER_INIT: {
            return {
                ...state,
                isLoading: true,
                isError: false
            };
        }
        case DEBUGGER_INIT_ERROR: {
            return {
                ...state,
                isError: true
            };
        }
        case DEBUGGER_LOADED: {
            return {
                ...state,
                isLoading: false,
                isError: false
            };
        }
        case DEBUGGER_PAUSED: {
            return {
                ...state,
                isPaused: true
            };
        }
        case DEBUGGER_RECEIVED_EVENT: {
            debugger;
            const event = action.payload;
            let eventsToShow = [];

            if (isPaused) {
                return state;
            }

            if (events.length >= MAX_EVENTS_TO_SHOW) {
                events.pop();
            }

            eventsToShow = eventsToShow.concat([ event, ...events ]);
            return {
                ...state,
                events: eventsToShow.slice(0, MAX_EVENTS_TO_SHOW)
            };
        }

        default: {
            return state;
        }
    }
};
