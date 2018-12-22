import {
    DEBUGGER_RECEIVED_EVENT,
    DEBUGGER_INIT,
    DEBUGGER_LOADED,
    DEBUGGER_PAUSE,
    DEBUGGER_INIT_ERROR,
    DEBUGGER_SEARCH,
    DEBUGGER_RESUME
} from "../actions/types";

const initialState = {
    events: [],
    isPaused: false,
    isError: false,
    isLoading: true,
    searchTerm: ""
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
        case DEBUGGER_PAUSE: {
            return {
                ...state,
                isPaused: true
            };
        }
        case DEBUGGER_RESUME: {
            return {
                ...state,
                isPaused: false
            };
        }
        case DEBUGGER_RECEIVED_EVENT: {
            const event = JSON.parse(action.payload);
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

        case DEBUGGER_SEARCH: {
            return {
                ...state,
                searchTerm: action.payload
            };
        }

        default: {
            return state;
        }
    }
};
