import React, { Component } from "react";
import { Pane } from "evergreen-ui/commonjs/layers";
import Toolbar from "./Toolbar";
import EventList from "./EventList";

class MainPane extends Component {
    render() {
        const { onPlay, onPause, events, handleSearch, isPaused } = this.props;

        return (
            <Pane>
                <Toolbar
                    handleSearch={handleSearch}
                    onPause={onPause}
                    onPlay={onPlay}
                    isPaused={isPaused}
                />
                <EventList events={events} />
            </Pane>
        );
    }
}

export default MainPane;
