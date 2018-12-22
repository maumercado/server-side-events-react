import React, { Component } from "react";
import NoEvents from "./NoEvents";
import MainPane from "./MainPane";

class Maugger extends Component {
    renderEvents() {
        const {
            events,
            searchTerm,
            handleSearch,
            selectedEvent,
            isPaused,
            onPlay,
            onPause,
            onEventSelect
        } = this.props;

        return (
            <div>
                <MainPane
                    searchTerm={searchTerm}
                    handleSearch={handleSearch}
                    onPlay={onPlay}
                    onPause={onPause}
                    isPaused={isPaused}
                    events={events}
                    selectedEvent={selectedEvent}
                    onEventSelect={onEventSelect}
                />
            </div>
        );
    }

    renderNoEvents() {
        return <NoEvents />;
    }

    render() {
        if (this.props.eventsCount > 0) {
            return this.renderEvents();
        } else {
            return this.renderNoEvents();
        }
    }
}

export default Maugger;
