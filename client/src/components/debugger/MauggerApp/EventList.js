import React, { PureComponent } from "react";
import { Table, Pane } from "evergreen-ui";
import EventListItem from "./EventListItem";
class EventList extends PureComponent {
    render() {
        const { onSelect, events } = this.props;

        const eventResults = events.map((event, i) => {
            return <EventListItem key={event.id} event={event} onEventSelect={onSelect} />;
        });

        return (
            <Pane
                flexDirection="column"
                display="flex"
                flex="1"
                flexGrow={0}
                flexShrink={0}
                flexBasis={660}
                backgroundColor="#ffffff"
            >
                <Table>
                    <Table.Body height={660}>{eventResults}</Table.Body>
                </Table>
            </Pane>
        );
    }
}

export default EventList;
