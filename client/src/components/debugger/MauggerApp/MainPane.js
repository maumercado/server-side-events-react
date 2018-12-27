import React, { Component } from "react";
import { Pane } from "evergreen-ui/commonjs/layers";
import Toolbar from "./Toolbar";
import EventList from "./EventList";
import EventDetail from "./EventDetail";

class MainPane extends Component {
    render() {
        const {
            onPlay,
            onPause,
            events,
            handleSearch,
            isPaused,
            onEventSelect,
            selectedEvent
        } = this.props;
        return (
            <Pane>
                <Toolbar
                    handleSearch={handleSearch}
                    onPause={onPause}
                    onPlay={onPlay}
                    isPaused={isPaused}
                />
                <Pane flex="1" display="flex" flexDirection="row" justifyContent="space-around">
                    <EventList events={events} onSelect={onEventSelect} />
                    <EventDetail selectedEvent={selectedEvent} />
                </Pane>
            </Pane>
        );
    }
}

export default MainPane;
