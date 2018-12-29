import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
    debuggerInit,
    debuggerSearch,
    debuggerPlay,
    debuggerPause,
    debuggerSelectEvent
} from "../../../actions";

const middlewares = [ thunk ];
const mockStore = configureMockStore(middlewares);

describe("debugger actions", () => {
    let store;
    // set up a fake store for all our tests

    beforeEach(() => {
        store = mockStore({
            debugger: {
                events: [],
                isPaused: false,
                isError: false,
                isLoading: true,
                searchTerm: "",
                selectedEvent: null
            }
        });
        window.sse = null;
        store.dispatch(debuggerInit());
    });

    describe("debugger init action", () => {
        describe("when the debugger page loads", () => {
            it("initiates EventSource stream", () => {
                expect(window.sse).toBeDefined();
            });

            it("adds function handling for error of EventSource", () => {
                expect(typeof window.sse._errorHandlers[0]).toBe("function");
            });

            it("adds function handling for events of EventSource", () => {
                expect(typeof window.sse._eventHandlers[0]).toBe("function");
            });

            it("adds function handling for events of EventSource", () => {
                expect(typeof window.sse._loadedHandlers[0]).toBe("function");
            });

            describe("when event source emits", () => {
                it("on error should dispatch DEBUGGER_INIT_ERROR", () => {
                    window.sse.dispatchEvent("error");
                    expect(store.getActions()[0].type).toBe("DEBUGGER INIT ERROR");
                });

                it("on load should dispatch DEBUGGER_LOADED", () => {
                    window.sse.dispatchEvent("loaded");
                    expect(store.getActions()[0].type).toBe("DEBUGGER LOADED");
                });

                it("on load should dispatch DEBUGGER_RECEIVED_EVENT", () => {
                    window.sse.dispatchEvent("event", { data: "test" });
                    expect(store.getActions()[0].type).toBe("DEBUGGER RECEIVED EVENT");
                });
            });
        });
    });

    describe("debuggerSearch", () => {
        beforeEach(() => {
            store.dispatch(debuggerSearch("test"));
        });

        it("should emit DEBUGGER_SEARCH action", () => {
            expect(store.getActions()[0].type).toBe("DEBUGGER SEARCH");
        });
    });

    describe("debuggerPlay", () => {
        beforeEach(() => {
            store.dispatch(debuggerPlay());
        });

        it("should emit DEBUGGER_PLAY action", () => {
            expect(store.getActions()[0].type).toBe("DEBUGGER RESUME");
        });
    });

    describe("debuggerPause", () => {
        beforeEach(() => {
            store.dispatch(debuggerPause());
        });

        it("should emit DEBUGGER_PAUSE action", () => {
            expect(store.getActions()[0].type).toBe("DEBUGGER PAUSE");
        });
    });

    describe("debuggerSelectEvent", () => {
        beforeEach(() => {
            store.dispatch(debuggerSelectEvent({ data: "test" }));
        });

        it("should emit DEBUGGER_SELECT_EVENT action", () => {
            expect(store.getActions()[0].type).toBe("DEBUGGER EVENT SELECTED");
        });
    });
});
