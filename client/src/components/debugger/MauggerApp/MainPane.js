import React, { Component } from "react";
import { Pane } from "evergreen-ui/commonjs/layers";
import Toolbar from "./Toolbar";
import EventList from "./EventList";

class MainPane extends Component {
    render() {
        const { events, handleSearch } = this.props;

        return (
            <Pane>
                <Toolbar handleSearch={handleSearch} />
                <EventList events={events} />
            </Pane>
        );
    }
}

export default MainPane;
