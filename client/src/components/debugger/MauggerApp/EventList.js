import React, { PureComponent } from "react";
import { Table } from "evergreen-ui";
import EventListItem from "./EventListItem";
class List extends PureComponent {
    render() {
        const eventResults = this.props.events.map((event, i) => {
            return <EventListItem key={event.id} event={event} />;
        });

        return (
            <Table>
                <Table.Body height={640}>{eventResults}</Table.Body>
            </Table>
        );
    }
}

export default List;
