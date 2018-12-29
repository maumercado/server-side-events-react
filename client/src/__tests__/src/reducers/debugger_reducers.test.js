import debuggerReducer, { initialState } from "../../../reducers/debugger_reducer";
import {
    DEBUGGER_INIT_ERROR,
    DEBUGGER_LOADED,
    DEBUGGER_RECEIVED_EVENT,
    DEBUGGER_SEARCH,
    DEBUGGER_PAUSE,
    DEBUGGER_EVENT_SELECTED
} from "../../../actions/types";

describe("debugger reducer", () => {
    // set up a fake store for all our tests

    describe("Initial State", () => {
        describe("when sending an unexisting case", () => {
            it("should be the same initial state", () => {
                const action = { type: "dummy_action" };
                expect(debuggerReducer(undefined, action)).toEqual(initialState);
            });
        });
    });

    describe("debugger initialization reducers", () => {
        describe("when the debugger page loads", () => {
            describe("when event source emits", () => {
                it("on error should change isError state", () => {
                    const action = { type: DEBUGGER_INIT_ERROR };
                    const newState = debuggerReducer(undefined, action);
                    expect(newState.isError).toBeTruthy;
                });

                it("on load should change isLoading and isError", () => {
                    const action = { type: DEBUGGER_LOADED };
                    const newState = debuggerReducer(undefined, action);
                    expect(newState.isError).toBeFalsy;
                    expect(newState.isLoading).toBeFalsy;
                });

                it("on event should add an event to state", () => {
                    const action = {
                        type: DEBUGGER_RECEIVED_EVENT,
                        payload: JSON.stringify({ data: "test" })
                    };
                    const newState = debuggerReducer(undefined, action);
                    expect(newState.events).toHaveLength(1);
                });
            });
        });
    });

    describe("debugger search reducer", () => {
        describe("when a user searches", () => {
            it("should change searchTerm state property", () => {
                const action = { type: DEBUGGER_SEARCH, payload: "test" };
                const newState = debuggerReducer(undefined, action);
                expect(newState.searchTerm).toEqual("test");
            });
        });
    });

    describe("debugger play reducer", () => {
        describe("when events are received by the reducer", () => {
            it("should add the events to the state events property", () => {
                const action = {
                    type: DEBUGGER_RECEIVED_EVENT,
                    payload: JSON.stringify({ data: "test1" })
                };
                const action1 = {
                    type: DEBUGGER_RECEIVED_EVENT,
                    payload: JSON.stringify({ data: "test2" })
                };

                const firstState = debuggerReducer(initialState, action);
                const newState = debuggerReducer(firstState, action1);

                expect(newState.events).toHaveLength(2);
            });
        });
    });

    describe("debugger pause reducer", () => {
        describe("when events are received by the reducer", () => {
            it("should ignore the events and not add them to the events property", () => {
                const action = {
                    type: DEBUGGER_RECEIVED_EVENT,
                    payload: JSON.stringify({ data: "test1" })
                };

                const action1 = {
                    type: DEBUGGER_PAUSE
                };

                const action2 = {
                    type: DEBUGGER_RECEIVED_EVENT,
                    payload: JSON.stringify({ data: "test2" })
                };

                const firstState = debuggerReducer(initialState, action);
                const secondState = debuggerReducer(firstState, action1);
                const newState = debuggerReducer(secondState, action2);

                expect(newState.events).toHaveLength(1);
            });
        });
    });

    describe("debugger select event reducer", () => {
        describe("when an event is selected", () => {
            it("should be added to the selectedEvent property of the state", () => {
                const action = {
                    type: DEBUGGER_EVENT_SELECTED,
                    payload: JSON.stringify({ data: "test1" })
                };

                const newState = debuggerReducer(initialState, action);

                expect(newState.selectedEvent).toBe(action.payload);
            });
        });
    });
});
